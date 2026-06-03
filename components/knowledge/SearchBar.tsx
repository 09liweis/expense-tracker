interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export default function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search knowledge..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        />
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}