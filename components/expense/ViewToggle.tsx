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
        className={`relative px-4 py-2 rounded-md text-sm cursor-pointer transition-all ${
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
        <span className="relative z-10 capitalize">
          {view}
        </span>
      </button>
      )}
    </div>
  );
}
