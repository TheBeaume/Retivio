import React from "react";
import { ChevronDown, Search } from "lucide-react";

function SearchableSelect({
  value,
  options,
  onChange,
  placeholder,
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const containerRef = React.useRef(null);

  const selectedOption = options.find(
    (option) => option.value === value
  );

  const filteredOptions = options
    .filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 100);

  React.useEffect(() => {
    const handleOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () =>
      document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="w-full bg-gray-950 border border-white/10 text-left text-white rounded-xl px-4 py-3 outline-none focus:border-purple-500 transition flex items-center justify-between gap-3"
      >
        <span
          className={
            selectedOption ? "truncate" : "text-gray-500 truncate"
          }
        >
          {selectedOption?.label || placeholder}
        </span>

        <ChevronDown size={18} className="text-gray-500 shrink-0" />
      </button>

      {open && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-gray-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-3 border-b border-white/10">
            <div className="flex items-center gap-2 bg-gray-900 border border-white/10 rounded-lg px-3">
              <Search size={17} className="text-gray-500" />

              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${placeholder.toLowerCase()}`}
                className="w-full bg-transparent text-white placeholder:text-gray-500 py-3 outline-none"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  type="button"
                  key={option.key || option.value}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition ${
                    option.value === value
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  {option.label}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500 px-4 py-5">
                No results found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchPanel({
  keyword,
  setKeyword,
  country,
  setCountry,
  countries,
  city,
  setCity,
  cities,
  category,
  setCategory,
  loading,
  onSearch,
}) {
  const fieldClass =
    "w-full bg-gray-950 border border-white/10 text-white placeholder:text-gray-500 rounded-xl px-4 py-3 outline-none focus:border-purple-500 transition";

  const countryOptions = countries.map((item) => ({
    key: item.isoCode,
    value: item.isoCode,
    label: item.name,
  }));

  const cityOptions = cities.map((item, index) => ({
    key: `${item.name}-${item.stateCode}-${index}`,
    value: item.name,
    label: item.name,
  }));

  return (
    <div className="bg-gray-900 border border-white/10 rounded-2xl p-5 md:p-6">
      <h2 className="text-xl font-bold">
        Search Global Markets
      </h2>

      <p className="text-sm text-gray-400 mt-1 mb-5">
        Discover business opportunities across countries and cities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchableSelect
          value={country}
          options={countryOptions}
          onChange={setCountry}
          placeholder="Country"
        />

        <SearchableSelect
          value={city}
          options={cityOptions}
          onChange={setCity}
          placeholder="City"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={fieldClass}
        >
          <option>Salon</option>
          <option>Spa</option>
          <option>Barber</option>
          <option>Beauty Parlour</option>
          <option>Hair Studio</option>
          <option>Nail Studio</option>
          <option>Gym</option>
          <option>Yoga Studio</option>
          <option>Hotel</option>
          <option>Cafe</option>
          <option>Restaurant</option>
          <option>Boutique</option>
        </select>

        <input
          type="text"
          placeholder="Business name keyword (Optional)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className={fieldClass}
        />
      </div>

      <button
        onClick={onSearch}
        disabled={loading}
        className="mt-5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition"
      >
        {loading ? "Searching Market..." : "Find Leads"}
      </button>
    </div>
  );
}

export default SearchPanel;
