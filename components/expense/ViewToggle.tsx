import { motion } from 'motion/react';

interface ViewToggleProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center justify-end gap-2 w-auto mb-3">
      {['overview','detail'].map((view)=>
      <button
        key={view}
        onClick={() => onViewChange(view)}
        className={`relative px-4 py-2 rounded-md text-sm cursor-pointer font-medium transition-all ${
          currentView === view
            ? 'text-white'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {currentView === view && (
          <motion.div
            layoutId="activeView"
            className="absolute inset-0 bg-primary rounded-md"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2 capitalize">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          {view}
        </span>
      </button>
      )}
    </div>
  );
}
