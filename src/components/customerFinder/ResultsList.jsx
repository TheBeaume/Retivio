import React from "react";
import ResultCard from "./ResultCard";

function ResultsList({
  results,
  currentPage,
  pageSize,
  onSave,
}) {
  if (!results.length) {
    return (
      <div className="bg-white rounded-2xl shadow border p-12 text-center">

        <div className="text-6xl">📍</div>

        <h2 className="text-2xl font-bold mt-5">
          Ready to Discover Opportunities
        </h2>

        <p className="text-gray-500 mt-3">
          Search nearby businesses and save potential leads directly into Retivio.
        </p>

      </div>
    );
  }

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const pageResults = results.slice(start, end);

  return (
    <div className="space-y-4">

      {pageResults.map((business) => (
        <ResultCard
          key={business.id}
          business={business}
          onSave={onSave}
        />
      ))}

    </div>
  );
}

export default ResultsList;
