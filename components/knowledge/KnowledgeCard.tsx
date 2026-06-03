import { motion } from 'motion/react';
import { Knowledge } from 'types';

interface KnowledgeCardProps {
  knowledge: Knowledge;
  isLoggedIn: boolean;
  onEdit?: (knowledge: Knowledge) => void;
  onDelete?: (id: string) => void;
  onClick?: (knowledge: Knowledge) => void;
}

export default function KnowledgeCard({ knowledge, isLoggedIn, onEdit, onDelete, onClick }: KnowledgeCardProps) {
  const preview = knowledge.definition
    ? knowledge.definition.slice(0, 100) + (knowledge.definition.length > 100 ? '...' : '')
    : '';

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => onClick?.(knowledge)}
      className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer overflow-hidden flex flex-col"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
            {knowledge.title}
          </h3>

          {isLoggedIn && (
            <div
              className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {onEdit && (
                <button
                  onClick={() => onEdit(knowledge)}
                  className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  title="Edit"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
              {onDelete && knowledge?._id && (
                <button
                  onClick={() => onDelete(knowledge._id!)}
                  className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        {preview && (
          <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{preview}</p>
        )}

        {knowledge.categories && knowledge.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {knowledge.categories.map((category, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-md font-medium group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
