import { ExpenseResponse } from 'types';

interface ExpenseDatePickerProps {
  expenseResponse: ExpenseResponse;
  onDateChange: (date: string, field: string) => void;
}

function DateField({ label, type, value, onChange }: {
  label: string; type: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-white border-2 border-gray-200 text-gray-900 font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
      />
    </div>
  );
}

export default function ExpenseDatePicker({ expenseResponse, onDateChange }: ExpenseDatePickerProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Select Date Range
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <DateField
          label="Start Date"
          type="month"
          value={expenseResponse.date}
          onChange={(v) => onDateChange(v, 'date')}
        />
        <DateField
          label="End Date"
          type="date"
          value={expenseResponse.endDate || ''}
          onChange={(v) => onDateChange(v, 'endDate')}
        />
      </div>
    </div>
  );
}
