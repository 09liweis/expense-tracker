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
    iconPath:
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z',
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
    iconPath:
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z',
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
    iconPath:
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z',
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
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${card.titleColor} mb-1`}>{card.title}</p>
              <p className={`text-lg md:text-2xl font-bold ${card.valueColor}`}>
                {String(expenseResponse[card.valueKey as keyof ExpenseResponse])}
              </p>
            </div>
            <svg className={`w-10 h-10 ${card.iconColor}`} fill="currentColor" viewBox="0 0 24 24">
              <path d={card.iconPath} />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}