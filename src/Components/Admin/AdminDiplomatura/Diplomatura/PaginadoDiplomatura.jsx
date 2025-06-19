import PropTypes from "prop-types";

export default function PaginadoDiplomatura({ currentPage, totalPages, onPageChange }) {
  const maxButtons = 5; // máximo de páginas visibles en rango medio

  const createPageNumbers = () => {
    let pages = [];

    if (totalPages <= maxButtons + 2) {
      // caso simple
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // caso con omisiones
      const left = Math.max(2, currentPage - 1);
      const right = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);

      if (left > 2) pages.push("...");
      for (let i = left; i <= right; i++) pages.push(i);
      if (right < totalPages - 1) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-8 space-x-1 text-sm">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-lg font-medium ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        «
      </button>

      {createPageNumbers().map((num, index) =>
        num === "..." ? (
          <span key={index} className="px-3 py-1 text-gray-500">...</span>
        ) : (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-3 py-1 rounded-lg font-medium ${
              num === currentPage
                ? "bg-blue-700 text-white"
                : "bg-gray-100 hover:bg-blue-100 text-gray-700"
            }`}
          >
            {num}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-lg font-medium ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        »
      </button>
    </div>
  );
}

PaginadoDiplomatura.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
