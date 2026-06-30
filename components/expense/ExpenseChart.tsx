import { motion } from 'motion/react';
import { CategoryTransaction } from 'types';
import { useState } from 'react';

interface ExpenseChartProps {
  categoryTransactions: CategoryTransaction[];
}

const INCOME_COLORS: Record<string, { bg: string; bgHover: string; bgLight: string; bgLighter: string; border: string; text: string; textDark: string; dot: string }> = {
  emerald:  { bg: 'bg-emerald-500',  bgHover: 'bg-emerald-600',  bgLight: 'bg-emerald-100',  bgLighter: 'from-emerald-50',  border: 'border-emerald-200',  text: 'text-emerald-500',  textDark: 'text-emerald-900',  dot: 'bg-emerald-500' },
  teal:     { bg: 'bg-teal-500',     bgHover: 'bg-teal-600',     bgLight: 'bg-teal-100',     bgLighter: 'from-teal-50',     border: 'border-teal-200',     text: 'text-teal-500',     textDark: 'text-teal-900',     dot: 'bg-teal-500' },
  cyan:     { bg: 'bg-cyan-500',     bgHover: 'bg-cyan-600',     bgLight: 'bg-cyan-100',     bgLighter: 'from-cyan-50',     border: 'border-cyan-200',     text: 'text-cyan-500',     textDark: 'text-cyan-900',     dot: 'bg-cyan-500' },
  lime:     { bg: 'bg-lime-500',     bgHover: 'bg-lime-600',     bgLight: 'bg-lime-100',     bgLighter: 'from-lime-50',     border: 'border-lime-200',     text: 'text-lime-500',     textDark: 'text-lime-900',     dot: 'bg-lime-500' },
  sky:      { bg: 'bg-sky-500',      bgHover: 'bg-sky-600',      bgLight: 'bg-sky-100',      bgLighter: 'from-sky-50',      border: 'border-sky-200',      text: 'text-sky-500',      textDark: 'text-sky-900',      dot: 'bg-sky-500' },
};

const EXPENSE_COLORS: Record<string, { bg: string; bgHover: string; bgLight: string; bgLighter: string; border: string; text: string; textDark: string; dot: string }> = {
  rose:     { bg: 'bg-rose-500',     bgHover: 'bg-rose-600',     bgLight: 'bg-rose-100',     bgLighter: 'from-rose-50',     border: 'border-rose-200',     text: 'text-rose-500',     textDark: 'text-rose-900',     dot: 'bg-rose-500' },
  amber:    { bg: 'bg-amber-500',    bgHover: 'bg-amber-600',    bgLight: 'bg-amber-100',    bgLighter: 'from-amber-50',    border: 'border-amber-200',    text: 'text-amber-500',    textDark: 'text-amber-900',    dot: 'bg-amber-500' },
  orange:   { bg: 'bg-orange-500',   bgHover: 'bg-orange-600',   bgLight: 'bg-orange-100',   bgLighter: 'from-orange-50',   border: 'border-orange-200',   text: 'text-orange-500',   textDark: 'text-orange-900',   dot: 'bg-orange-500' },
  blue:     { bg: 'bg-blue-500',     bgHover: 'bg-blue-600',     bgLight: 'bg-blue-100',     bgLighter: 'from-blue-50',     border: 'border-blue-200',     text: 'text-blue-500',     textDark: 'text-blue-900',     dot: 'bg-blue-500' },
  pink:     { bg: 'bg-pink-500',     bgHover: 'bg-pink-600',     bgLight: 'bg-pink-100',     bgLighter: 'from-pink-50',     border: 'border-pink-200',     text: 'text-pink-500',     textDark: 'text-pink-900',     dot: 'bg-pink-500' },
};

const INCOME_KEYS = Object.keys(INCOME_COLORS);
const EXPENSE_KEYS = Object.keys(EXPENSE_COLORS);

const STAT_COLOR_MAP: Record<string, { bg: string; bgLight: string; bgLighter: string; border: string; text: string; textDark: string }> = {
  green:  { bg: 'bg-green-500', bgLight: 'bg-green-100', bgLighter: 'from-green-50', border: 'border-green-200', text: 'text-green-500', textDark: 'text-green-900' },
  blue:   { bg: 'bg-blue-500',  bgLight: 'bg-blue-100',  bgLighter: 'from-blue-50',  border: 'border-blue-200',  text: 'text-blue-500',  textDark: 'text-blue-900' },
  red:    { bg: 'bg-red-500',   bgLight: 'bg-red-100',   bgLighter: 'from-red-50',   border: 'border-red-200',   text: 'text-red-500',   textDark: 'text-red-900' },
  amber:  { bg: 'bg-amber-500', bgLight: 'bg-amber-100', bgLighter: 'from-amber-50', border: 'border-amber-200', text: 'text-amber-500', textDark: 'text-amber-900' },
};

function parseAmount(total: string) {
  return parseFloat(total.replace(/[$,]/g, ''));
}

function StatCard({ color, label, value }: { color: string; label: string; value: string }) {
  const c = STAT_COLOR_MAP[color];
  return (
    <div className={`bg-gradient-to-br ${c.bgLighter} ${c.bgLight} rounded-lg p-2 md:p-4 ${c.border}`}>
      <p className={`text-xs font-medium ${c.textDark} uppercase tracking-wide mb-1`}>{label}</p>
      <p className={`text-xl font-bold text-center ${c.textDark}`}>{value}</p>
    </div>
  );
}

function CategoryRow({ category, amount, percentage, isIncome, colorMap, colorKey, isHovered, onHover, index }: {
  category: string; amount: string; percentage: number; isIncome: boolean;
  colorMap: Record<string, any>; colorKey: string;
  isHovered: boolean; onHover: (v: string | null) => void; index: number;
}) {
  const c = colorMap[colorKey];
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`p-2 md:p-4 rounded-lg border-2 transition-all cursor-pointer ${
        isHovered ? 'border-gray-300 bg-gray-50 shadow-md scale-102' : 'border-gray-100 bg-white hover:border-gray-200'
      }`}
      onMouseEnter={() => onHover(category)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-4 h-4 rounded-full ${c.dot} flex-shrink-0 shadow-sm`} />
          <span className="font-semibold text-gray-900 capitalize">{category}</span>
          {isIncome && <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-medium">Income</span>}
        </div>
        <div className="text-right">
          <div className={`font-bold ${isIncome ? 'text-emerald-600' : 'text-gray-900'}`}>{amount}</div>
          <div className={`text-sm font-medium ${c.text}`}>{percentage.toFixed(1)}%</div>
        </div>
      </div>
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: index * 0.05 + 0.5 }}
          className={`absolute top-0 left-0 h-full ${c.bg} rounded-full shadow-sm`}
        />
      </div>
    </motion.div>
  );
}

function StackedBar({ items, total, colorMap, colorKeys, hoveredCategory, setHoveredCategory, label }: {
  items: CategoryTransaction[]; total: number;
  colorMap: Record<string, any>; colorKeys: string[];
  hoveredCategory: string | null; setHoveredCategory: (v: string | null) => void;
  label: string;
}) {
  if (items.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-500 mb-2">{label}</h3>
        <div className="h-16 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 text-sm">
          No data
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{label}</h3>
      <div className="flex items-center h-16 rounded-xl overflow-hidden shadow-sm border border-gray-200">
        {items.map((cat, i) => {
          const pct = total > 0 ? (parseAmount(cat.total) / total) * 100 : 0;
          const color = colorKeys[i % colorKeys.length];
          const c = colorMap[color];
          const isHovered = hoveredCategory === cat.category;

          return (
            <motion.div
              key={cat.category}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
              className={`h-full cursor-pointer relative group ${c.bg} ${c.bgHover}`}
              onMouseEnter={() => setHoveredCategory(cat.category)}
              onMouseLeave={() => setHoveredCategory(null)}
              style={{
                filter: hoveredCategory && !isHovered ? 'brightness(0.7)' : 'brightness(1)',
                transition: 'filter 0.2s ease',
              }}
            >
              {pct > 5 && (
                <div className="h-full flex flex-col items-center justify-center text-white text-xs font-bold px-2 text-center">
                  <span className="capitalize truncate max-w-full">{cat.category}</span>
                  <span className="text-[10px] opacity-90">{pct.toFixed(1)}%</span>
                </div>
              )}
              {isHovered && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-gray-900 text-white text-xs py-3 px-4 rounded-lg shadow-xl whitespace-nowrap z-20 pointer-events-none">
                  <div className="font-semibold capitalize mb-1">{cat.category}</div>
                  <div className="text-green-400 font-bold">{cat.total}</div>
                  <div className="text-gray-300">{pct.toFixed(1)}% of {label.toLowerCase()}</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-900" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function ExpenseChart({ categoryTransactions }: ExpenseChartProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  if (categoryTransactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-gray-500 font-medium">No data to display</p>
        <p className="text-gray-400 text-sm mt-1">Add some transactions to see your breakdown</p>
      </div>
    );
  }

  const incomeCategories = categoryTransactions.filter((cat) => cat.income);
  const expenseCategories = categoryTransactions.filter((cat) => !cat.income);

  const totalIncome = incomeCategories.reduce((sum, cat) => sum + parseAmount(cat.total), 0);
  const totalExpense = expenseCategories.reduce((sum, cat) => sum + parseAmount(cat.total), 0);
  const balance = totalIncome - totalExpense;

  const sortedIncome = [...incomeCategories].sort((a, b) => parseAmount(b.total) - parseAmount(a.total));
  const sortedExpense = [...expenseCategories].sort((a, b) => parseAmount(b.total) - parseAmount(a.total));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 md:p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Financial Overview</h2>
        <div className="text-right">
          <p className="text-sm text-gray-500">Balance (Income - Expense)</p>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {balance >= 0 ? '+' : ''}{balance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Income stacked bar */}
      <StackedBar
        items={sortedIncome}
        total={totalIncome}
        colorMap={INCOME_COLORS}
        colorKeys={INCOME_KEYS}
        hoveredCategory={hoveredCategory}
        setHoveredCategory={setHoveredCategory}
        label="Income"
      />

      {/* Expense stacked bar */}
      <StackedBar
        items={sortedExpense}
        total={totalExpense}
        colorMap={EXPENSE_COLORS}
        colorKeys={EXPENSE_KEYS}
        hoveredCategory={hoveredCategory}
        setHoveredCategory={setHoveredCategory}
        label="Expenses"
      />

      {/* Income categories breakdown */}
      {sortedIncome.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-emerald-600 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Income Breakdown
          </h3>
          <div className="space-y-3">
            {sortedIncome.map((cat, i) => (
              <CategoryRow
                key={cat.category}
                category={cat.category}
                amount={cat.total}
                percentage={totalIncome > 0 ? (parseAmount(cat.total) / totalIncome) * 100 : 0}
                isIncome={true}
                colorMap={INCOME_COLORS}
                colorKey={INCOME_KEYS[i % INCOME_KEYS.length]}
                isHovered={hoveredCategory === cat.category}
                onHover={setHoveredCategory}
                index={i}
              />
            ))}
          </div>
        </div>
      )}

      {/* Expense categories breakdown */}
      {sortedExpense.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-rose-600 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
            Expense Breakdown
          </h3>
          <div className="space-y-3">
            {sortedExpense.map((cat, i) => (
              <CategoryRow
                key={cat.category}
                category={cat.category}
                amount={cat.total}
                percentage={totalExpense > 0 ? (parseAmount(cat.total) / totalExpense) * 100 : 0}
                isIncome={false}
                colorMap={EXPENSE_COLORS}
                colorKey={EXPENSE_KEYS[i % EXPENSE_KEYS.length]}
                isHovered={hoveredCategory === cat.category}
                onHover={setHoveredCategory}
                index={i}
              />
            ))}
          </div>
        </div>
      )}

      {/* Summary stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard color="green" label="Income" value={`$${totalIncome.toFixed(2)}`} />
        <StatCard color="red" label="Expenses" value={`$${totalExpense.toFixed(2)}`} />
        <StatCard color="blue" label="Balance" value={`${balance >= 0 ? '+' : ''}$${balance.toFixed(2)}`} />
        <StatCard color="amber" label="Categories" value={String(categoryTransactions.length)} />
      </div>
    </div>
  );
}
