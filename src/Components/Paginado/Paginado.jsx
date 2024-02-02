import { useState } from "react";

function Paginado() {
  // Numero de resultados por pagina
  const resultsPerPage = 10;

  // Estado para almacenar el numero de pagina actual
  const [currentPage, setCurrentPage] = useState(1);

  // Simulacion de datos de resultados (reemplaza con tus propios datos)
  const totalResults = 97;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // Funcion para avanzar a la siguiente pagina
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Funcion para retroceder a la pagina anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className=" flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={prevPage}
            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
              currentPage === 1 ? "cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                currentPage === index + 1
                  ? "bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focuz:z-20 focus:outline-offset-0 ${
              currentPage === totalPages ? "cursor-not-allowed" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Paginado;
