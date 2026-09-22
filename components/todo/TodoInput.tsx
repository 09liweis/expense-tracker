interface InputProps {
  field: string;
  value: string;
  title: string;
  tp?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function TodoInput({field, title, value, tp="text", onChange, placeholder=""}:InputProps) {
  return (
    <div key={field}>
      <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
        {title}
      </label>
      <input
        id={field}
        type={tp}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        placeholder={placeholder}
        required
      />
    </div>
  )
}