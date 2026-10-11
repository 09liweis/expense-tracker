import { ExpenseResponse } from 'types';

interface ExpenseHeaderProps {
  expenseResponse: ExpenseResponse;
}

const CARD_CONFIG = [
  {
    key: 'incomes',
    title: 'Incomes',
    valueKey: 'incomes',
    bg: 'from-green-50 to-green-100',
    border: 'border-green-200',
    titleColor: 'text-green-700',
    valueColor: 'text-green-600',
    iconColor: 'text-green-200',
  },
  {
    key: 'total',
    title: 'Balance',
    valueKey: 'total',
    bg: 'from-blue-50 to-blue-100',
    border: 'border-blue-200',
    titleColor: 'text-blue-700',
    valueColor: 'text-blue-600',
    iconColor: 'text-blue-200',
  },
  {
    key: 'expenses',
    title: 'Expenses',
    valueKey: 'expenses',
    bg: 'from-red-50 to-red-100',
    border: 'border-red-200',
    titleColor: 'text-red-700',
    valueColor: 'text-red-600',
    iconColor: 'text-red-200',
  },
] as const;

export default function ExpenseHeader({ expenseResponse }: ExpenseHeaderProps) {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
      {CARD_CONFIG.map((card) => (
        <div
          key={card.key}
          className={`bg-gradient-to-br ${card.bg} rounded-xl border-2 ${card.border} p-3 md:p-6 shadow-lg`}
        >
          <p className={`text-sm font-medium ${card.titleColor} mb-1`}>{card.title}</p>
          <p className={`text-lg md:text-2xl font-bold ${card.valueColor}`}>
            {String(expenseResponse[card.valueKey as keyof ExpenseResponse])}
          </p>
        </div>
      ))}
    </div>
  );
}