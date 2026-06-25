import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by Name or Mobile"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border p-2 w-full mb-4 rounded"
    />
  );
}

export default SearchBar;
