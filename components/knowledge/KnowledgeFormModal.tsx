import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Knowledge } from 'types';

interface KnowledgeFormModalProps {
  isOpen: boolean;
  editingKnowledge: Knowledge | null;
  formData: {
    title: string;
    definition: string;
    categories: string;
  };
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (data: { title?: string; definition?: string; categories?: string }) => void;
}

export default function KnowledgeFormModal({
  isOpen,
  editingKnowledge,
  formData,
  onClose,
  onSubmit,
  onChange,
}: KnowledgeFormModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => titleRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const parsedCategories = formData.categories
    ? formData.categories.split(',').map((c) => c.trim()).filter(Boolean)
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header stripe */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-500" />

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {editingKnowledge ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      )}
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 leading-tight">
                      {editingKnowledge ? 'Edit Knowledge' : 'Add New Knowledge'}
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {editingKnowledge ? 'Update the entry below.' : 'Fill in the details to save a new entry.'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-4 flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={titleRef}
                    type="text"
                    value={formData.title}
                    onChange={(e) => onChange({ title: e.target.value })}
                    placeholder="e.g. Closure in JavaScript"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                    required
                  />
                </div>

                {/* Definition */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Definition <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.definition}
                    onChange={(e) => onChange({ definition: e.target.value })}
                    rows={5}
                    placeholder="Explain the concept clearly..."
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all resize-none"
                    required
                  />
                  <p className="text-xs text-gray-400 text-right">{formData.definition.length} characters</p>
                </div>

                {/* Categories */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700">Categories</label>
                  <input
                    type="text"
                    value={formData.categories}
                    onChange={(e) => onChange({ categories: e.target.value })}
                    placeholder="Programming, JavaScript, Web Development"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                  />
                  <p className="text-xs text-gray-400">Separate with commas</p>
                  {parsedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {parsedCategories.map((cat, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-4 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto cursor-pointer rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto cursor-pointer rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
                  >
                    {editingKnowledge ? 'Save Changes' : 'Add Knowledge'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
