import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Tooltip from "@mui/material/Tooltip";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CircularProgress from '@mui/material/CircularProgress';

function SeguimientoClases() {
  const [seguimientos, setSeguimientos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCurso, setSelectedCurso] = useState("");
  const [cursos, setCursos] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeguimiento = async () => {
      try {
        const response = await axios.get("/seguimiento-clases");
        setSeguimientos(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error al ver los seguimientos:", error);
      }
    };

    const fetchCursos = async () => {
      try {
        const response = await axios.get("/cursos");
        setCursos(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error al obtener los cursos:", error);
      }
    };

    fetchSeguimiento();
    fetchCursos();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCursoChange = (e) => {
    setSelectedCurso(e.target.value);
  };

  const filteredSeguimientos = seguimientos.filter((seguimiento) => {
    const userMatch =
      (seguimiento.user?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        seguimiento.user?.last_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())) ??
      false;
    const cursoMatch =
      seguimiento.curso?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ?? false;
    const claseMatch =
      typeof seguimiento.clase === "string" &&
      seguimiento.clase.toLowerCase().includes(searchTerm.toLowerCase());

    const selectedCursoMatch = selectedCurso
      ? seguimiento.cursoId === parseInt(selectedCurso)
      : true;

    return (userMatch || cursoMatch || claseMatch) && selectedCursoMatch;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentSeguimientos = filteredSeguimientos.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredSeguimientos.length / usersPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const getPaginationGroup = () => {
    const totalNumbers = 10;
    const totalPages = pageNumbers.length;

    let start = Math.floor((currentPage - 1) / totalNumbers) * totalNumbers;
    return new Array(totalNumbers)
      .fill()
      .map((_, idx) => start + idx + 1)
      .filter((number) => number <= totalPages);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (error) {
    return <div className="text-center text-red-500 mt-4">Error: {error}</div>;
  }

  if (seguimientos.length === 0) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
        <span className="text-gray-500 mb-4 font-semibold">
          Cargando...
        </span>
        <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="py-5 px-4 sm:px-10">
      <Tooltip
        title="Volver"
        arrow
        placement="bottom"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -6],
                },
              },
            ],
          },
        }}
      >
        <button
          onClick={goBack}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-transform ease-in-out duration-300"
        >
          <KeyboardBackspaceIcon fontSize="large" />
          <span className="ml-2">Volver</span>
        </button>
      </Tooltip>
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Seguimiento de Clases
      </h1>
      <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 border-2 border-gray-400 p-2 focus:border-blue-800 focus:outline-none rounded-lg"
        />
        <select
          value={selectedCurso}
          onChange={handleCursoChange}
          className="flex-1 border-2 border-gray-400 p-2 focus:border-blue-800 focus:outline-none rounded-lg"
        >
          <option value="">Todos los cursos</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.name}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto border border-gray-400 rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-blue-200 border-b border-gray-300">
            <tr className="bg-blue-100 text-gray-700 uppercase text-xs leading-normal">
              <th className="py-3 px-6 text-left">Usuario</th>
              <th className="py-3 px-6 text-left">Curso</th>
              <th className="py-3 px-6 text-left">Clase</th>
              <th className="py-3 px-6 text-left">Inicio</th>
              <th className="py-3 px-6 text-left">Progreso</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
            {currentSeguimientos.map((seguimiento) => {
              const isTaller = seguimiento.clase?.name?.toLowerCase().includes("taller");
              const isDownloaded = isTaller && seguimiento.progreso === 0.0;

              return (
                <tr
                  key={seguimiento.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {seguimiento.user?.name} {seguimiento.user?.last_name}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {seguimiento.curso?.name}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {seguimiento.clase?.name ?? "Clase no disponible"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(seguimiento.inicio).toLocaleString()}
                  </td>
                  <td
                    className={`py-3 px-6 text-left font-semibold ${
                      isDownloaded
                        ? "text-white bg-blue-400"
                        : seguimiento.progreso >= 80
                        ? "bg-green-500 text-white"
                        : "bg-yellow-300 text-black"
                    }`}
                  >
                    {isDownloaded ? (
                      <span className="flex items-center">
                        <PictureAsPdfIcon className="h-5 w-5 mr-1 text-white" />
                        Descargado
                      </span>
                    ) : (
                      `${seguimiento.progreso.toFixed(1)}%`
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav className="mt-4 flex justify-center" aria-label="Pagination">
        <ul className="flex items-center space-x-2">
          <li>
            <button
              onClick={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1 ? "bg-gray-200 text-gray-600" : "bg-white hover:bg-gray-50"
              } px-3 py-1 border border-gray-300 rounded-l-md font-medium text-sm focus:outline-none`}
            >
              &lt;
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {currentPage > 10 && (
            <li>
              <button
                onClick={() => paginate(1)}
                className="bg-white hover:bg-gray-50 px-3 py-1 border border-gray-300 font-medium text-sm focus:outline-none"
              >
                1
              </button>
            </li>
          )}
          {currentPage > 11 && <li className="px-2 py-1">...</li>}
          {getPaginationGroup().map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => paginate(pageNumber)}
                className={`${
                  pageNumber === currentPage ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-50"
                } px-3 py-1 border border-gray-300 font-medium text-sm focus:outline-none`}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          {currentPage < pageNumbers.length - 10 && <li className="px-2 py-1">...</li>}
          {currentPage < pageNumbers.length - 9 && (
            <li>
              <button
                onClick={() => paginate(pageNumbers.length)}
                className="bg-white hover:bg-gray-50 px-3 py-1 border border-gray-300 font-medium text-sm focus:outline-none"
              >
                {pageNumbers.length}
              </button>
            </li>
          )}
          <li>
            <button
              onClick={() => setCurrentPage(currentPage === pageNumbers.length ? pageNumbers.length : currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
              className={`${
                currentPage === pageNumbers.length ? "bg-gray-200 text-gray-600" : "bg-white hover:bg-gray-50"
              } px-3 py-1 border border-gray-300 rounded-r-md font-medium text-sm focus:outline-none`}
            >
              &gt;
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SeguimientoClases;
