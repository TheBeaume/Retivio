import React from "react";

function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">

      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-40"
      >
        ⬅ Previous
      </button>

      <span className="font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-purple-700 text-white disabled:opacity-40"
      >
        Next ➡
      </button>

    </div>
  );
}

export default Pagination;
