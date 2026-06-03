import { Knowledge } from 'types';

interface KnowledgeViewModalProps {
  knowledge: Knowledge | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function KnowledgeViewModal({
  knowledge,
  isOpen,
  onClose,
}: KnowledgeViewModalProps) {
  if (!isOpen || !knowledge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl ring-1 ring-black/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{knowledge.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full cursor-pointer bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Definition</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{knowledge.definition}</p>
          </div>

          {knowledge.categories && knowledge.categories.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {knowledge.categories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md cursor-pointer border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
