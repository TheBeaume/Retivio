import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="mb-10">
      <div className="relative max-w-2xl mx-auto">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Search articles..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

      </div>
    </div>
  );
}
