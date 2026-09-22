export default function TodoInput({field, title, value, type="text", onChange, placeholder=""}) {
  return (
    <div key={field}>
      <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
        {title}
      </label>
      <input
        id={field}
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        placeholder={placeholder}
        required
      />
    </div>
  )
}