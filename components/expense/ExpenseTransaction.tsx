import { motion } from 'motion/react';
import { Transaction } from 'types';

interface ExpenseTransactionProps {
  transaction: Transaction;
  onClick: () => void;
}

export default function ExpenseTransaction({ transaction, onClick }: ExpenseTransactionProps) {
  const { formatedPrice, date, place, title, income } = transaction;
  const label = place?.name || title || 'Untitled';

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-pointer p-3 flex items-center gap-3"
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${income ? 'bg-green-50' : 'bg-red-50'}`}>
        <svg className={`w-5 h-5 ${income ? 'text-green-500' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {income ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m0-16l-4 4m4-4l4 4" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20V4m0 16l4-4m-4 4l-4-4" />
          )}
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate capitalize">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{date}</p>
      </div>

      <span className={`text-sm font-bold tabular-nums ${income ? 'text-green-600' : 'text-red-600'}`}>
        {formatedPrice}
      </span>
    </motion.div>
  );
}
