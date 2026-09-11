import { ExpenseResponse } from 'types';
import SectionTitle from "@/components/expense/SectionTitle";

interface ExpenseDatePickerProps {
  expenseResponse: ExpenseResponse;
  onDateChange: (date: string, field: string) => void;
}

function DateField({ label, type, value, onChange }: {
  label: string; type: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium p-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded bg-white border-2 border-gray-200 font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
      />
    </div>
  );
}

export default function ExpenseDatePicker({ expenseResponse, onDateChange }: ExpenseDatePickerProps) {
  return (
    <div className="mb-6">
      <SectionTitle>
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Select Date Range
      </SectionTitle>
      <div className="grid grid-cols-2 gap-2">
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
