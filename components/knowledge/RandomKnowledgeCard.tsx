import { Knowledge } from 'types';
import { motion } from 'motion/react';
import { useState } from 'react';

interface RandomKnowledgeCardProps {
  knowledge: Knowledge;
  isLoggedIn: boolean;
  onEdit: (knowledge: Knowledge) => void;
  onDelete: (id: string) => void;
  onNext: () => void;
}

export default function RandomKnowledgeCard({
  knowledge,
  isLoggedIn,
  onEdit,
  onDelete,
  onNext,
}: RandomKnowledgeCardProps) {
  const [revealed, setRevealed] = useState(false);

  const handleNext = () => {
    setRevealed(false);
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-xl"
    >
      {/* Top accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-500" />

      <div className="p-8 md:p-10">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Knowledge Card</p>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">{knowledge.title}</h2>
            </div>
          </div>

          {isLoggedIn && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => onEdit(knowledge)}
                className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                title="Edit"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => knowledge._id && onDelete(knowledge._id)}
                className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                title="Delete"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Definition with reveal */}
        <div className="relative mb-6">
          <motion.div
            animate={{ filter: revealed ? 'blur(0px)' : 'blur(6px)' }}
            transition={{ duration: 0.3 }}
            className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap select-none"
          >
            {knowledge.definition}
          </motion.div>

          {!revealed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setRevealed(true)}
                className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl shadow-lg hover:bg-gray-800 active:scale-95 transition-all"
              >
                Reveal Definition
              </button>
            </div>
          )}
        </div>

        {/* Categories */}
        {knowledge.categories && knowledge.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {knowledge.categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full border border-gray-200"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Random pick
          </div>

          <motion.button
            type="button"
            onClick={handleNext}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-gray-800 transition-all"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
