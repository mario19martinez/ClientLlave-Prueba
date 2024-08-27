import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import CircularProgress from '@mui/material/CircularProgress';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function UserHistoryDetail({ userSub }) {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`/user-history/${userSub}`);
        const sortedHistory = response.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setHistory(sortedHistory);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userSub]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(history.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

  if (loading){
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600 mt-4 font-semibold">Cargando Registros...</p>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 mt-4 font-semibold">Error: {error}</p>
          <p className="text-red-500 mt-4 font-semibold">Oops! Algo salió mal. Vuelve a intentarlo en un momento.</p>
          <p className="text-red-500 mt-4 font-semibold">
          <SentimentVeryDissatisfiedIcon fontSize="large" />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 right-36 mt-28 w-4/5 ml-96 p-4 -translate-y-40">
    <h1 className="text-2xl font-bold mb-4 text-gray-700">
      Historial de Usuario
    </h1>
    <table className="min-w-full border-collaps border rounded-lg border-gray-400 overflow-hidden">
      <thead className="bg-blue-200 border-b border-gray-300">
        <tr className=" text-xs text-gray-700 uppercase">
          <th className="px-6 py-3">
            Usuario
          </th>
          <th className="px-6 py-3">
            Curso
          </th>
          <th className="px-6 py-3">
            Grupo
          </th>
          <th className="px-6 py-3">
            Certificado Curso
          </th>
          <th className="px-6 py-3">
            Certificado
          </th>
          <th className="px-6 py-3">Certificado Módulo</th>
          <th className="px-6 py-3">
            Tipo de Accion
          </th>
          <th className="px-6 py-3">
            Fecha
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm font-mono divide-y divide-gray-200 bg-white">
        {currentItems.length === 0 ? (
          <tr>
            <td
              colSpan="7"
              className="px-6 py-4 text-center text-sm font-medium text-gray-700"
            >
              Este usuario no tiene historial aún.
            </td>
          </tr>
        ) : (
          currentItems.map((item) => (
            <tr key={item.id}
            className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150">
              <td className="px-6 py-3 whitespace-nowrap">
                {item.user
                  ? `${item.user.name} ${item.user.last_name}`
                  : "N/A"}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.curso?.name || "N/A"}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.grupo?.name || "N/A"}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.certificadoCurso?.numero_certificado || "N/A"}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.certificado?.numero_certificado || "N/A"}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                  {item.certificadoModulo?.numero_certificado || "N/A"}
                </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {item.actionType || "N/A"}
              </td>
              <td className="px-6 py-3 whitespace-nowrap">
                {new Date(item.timestamp).toLocaleString()}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
    <nav className="mt-2" aria-label="Pagination">
      <ul className="flex justify-center">
        <li>
          <button
            onClick={() =>
              setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)
            }
            disabled={currentPage === 1}
            className={`${
              currentPage === 1
                ? "bg-gray-200 text-gray-600"
                : "bg-white hover:bg-gray-50"
            } px-3 py-1 border border-gray-300 rounded-l-md font-medium text-sm focus:outline-none`}
          >
            <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </button>
        </li>
        {pageNumbers
          .slice(Math.max(currentPage - 5, 0), currentPage + 5)
          .map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => paginate(pageNumber)}
                className={`${
                  pageNumber === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-50"
                } px-3 py-1 border border-gray-300 font-medium text-sm focus:outline-none`}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        <li>
          <button
            onClick={() =>
              setCurrentPage(
                currentPage === pageNumbers.length
                  ? pageNumbers.length
                  : currentPage + 1
              )
            }
            disabled={currentPage === pageNumbers.length}
            className={`${
              currentPage === pageNumbers.length
                ? "bg-gray-200 text-gray-600"
                : "bg-white hover:bg-gray-50"
            } px-3 py-1 border border-gray-300 rounded-r-md font-medium text-sm focus:outline-none`}
          >
            <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </button>
        </li>
      </ul>
    </nav>
    </div>
  );
}

UserHistoryDetail.propTypes = {
  userSub: PropTypes.string.isRequired,
};

export default UserHistoryDetail;
