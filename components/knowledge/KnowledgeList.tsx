import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import KnowledgeCard from './KnowledgeCard';
import { Knowledge } from 'types';

interface KnowledgeListProps {
  knowledges: Knowledge[];
  isLoggedIn: boolean;
  onEdit: (knowledge: Knowledge) => void;
  onDelete: (id: string) => void;
  onClick: (knowledge: Knowledge) => void;
}

export default function KnowledgeList({
  knowledges,
  isLoggedIn,
  onEdit,
  onDelete,
  onClick,
}: KnowledgeListProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allCategories = useMemo(() => {
    const set = new Set<string>();
    knowledges.forEach((k) => k.categories?.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, [knowledges]);

  const filtered = useMemo(() => {
    return knowledges.filter((k) => {
      const matchesSearch =
        !search ||
        k.title.toLowerCase().includes(search.toLowerCase()) ||
        k.definition?.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        !activeCategory || k.categories?.includes(activeCategory);
      return matchesSearch && matchesCategory;
    });
  }, [knowledges, search, activeCategory]);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search knowledge..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Count badge */}
        <div className="flex items-center gap-2 text-sm text-gray-500 flex-shrink-0">
          <span className="font-medium text-gray-900">{filtered.length}</span>
          <span>of {knowledges.length}</span>
        </div>
      </div>

      {/* Category filter pills */}
      {allCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-xs px-3 py-1 rounded-full font-medium border transition-all cursor-pointer ${
              activeCategory === null
                ? 'bg-primary text-white border-slate-900 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            All
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`text-xs px-3 py-1 rounded-full font-medium border transition-all cursor-pointer capitalize ${
                activeCategory === cat
                  ? 'bg-primary text-white border-slate-900 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((knowledge, index) => (
              <KnowledgeCard
                key={knowledge._id}
                knowledge={knowledge}
                isLoggedIn={isLoggedIn}
                onEdit={onEdit}
                onDelete={onDelete}
                onClick={onClick}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <svg
              className="w-12 h-12 text-gray-300 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <p className="text-gray-500 font-medium">No knowledge found</p>
            <p className="text-sm text-gray-400 mt-1">
              {search || activeCategory ? 'Try adjusting your filters' : 'Add your first knowledge entry'}
            </p>
            {(search || activeCategory) && (
              <button
                onClick={() => { setSearch(''); setActiveCategory(null); }}
                className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Clear filters
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
