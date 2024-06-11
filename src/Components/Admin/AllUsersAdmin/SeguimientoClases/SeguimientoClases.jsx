import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function SeguimientoClases() {
  const [seguimientos, setSeguimientos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCurso, setSelectedCurso] = useState('');
  const [cursos, setCursos] = useState([])
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
        const response = await axios.get('/cursos');
        setCursos(response.data);
      } catch (error) {
        setError(error.message)
        console.error('Error al obtener los cursos:', error);
      }
    }

    fetchSeguimiento();
    fetchCursos();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCursoChange = (e) => {
    setSelectedCurso(e.target.value);
  }

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
  const currentSeguimientos = filteredSeguimientos.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSeguimientos.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const goBack = () => {
    navigate(-1);
  };

  if (error) {
    return <div className="text-center text-red-500 mt-4">Error: {error}</div>;
  }

  if (seguimientos.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-xl font-semibold text-blue-600">
          Cargando...
        </span>
      </div>
    );
  }

  return (
    <div className="py-5 px-10 ">
      <button
        onClick={goBack}
        className="bg-blue-500 text-white w-20 h-10 mb-8 font-semibold py-0 px-4 rounded hover:bg-gray-400 transition-transform ease-in-out duration-300 hover:translate-y-1"
      >
        <KeyboardBackspaceIcon fontSize="large" />
      </button>
      <h1 className="text-xl font-bold mb-6 text-gray-700">
        Seguimiento de Clases
      </h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border-2 border-gray-400 p-2 focus:border-blue-800 focus:outline-none rounded-lg"
        />
        <select
          value={selectedCurso}
          onChange={handleCursoChange}
          className="border-2 border-gray-400 p-2 focus:border-blue-800 focus:outline-none rounded-lg"
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
          <tbody className="text-gray-700 text-sm font-mono divide-y divide-gray-200">
            {currentSeguimientos.map((seguimiento) => (
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
                  {seguimiento.clase.name}
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(seguimiento.inicio).toLocaleString()}
                </td>
                <td
                  className={`py-3 px-6 text-left font-semibold w-0 ${seguimiento.progreso >= 80 ? 'bg-green-500 text-white' : 'bg-yellow-300 text-black'}`}
                >
                  {seguimiento.progreso.toFixed(1)}%
                </td>
                {/* <td className="py-3 px-6 text-left">
                  {seguimiento.progreso.toFixed(1)}%
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="mt-4" aria-label="Pagination">
        <ul className="flex justify-center">
          <li>
            <button
            onClick={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1
              ? "bg-gray-200 text-gray-600"
              : "bg-white hover:bg-gray-50"
            } px-3 py-1 border border-gray-300 rounded-l-md font-medium text-sm focus:outline-none`}
            >
              &lt;
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {pageNumbers.map((pageNumber) => (
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
            onClick={() => setCurrentPage(currentPage === pageNumbers.length ? pageNumbers.length : currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className={`${
              currentPage === pageNumbers.length
              ? "bg-gray-200 text-gray-600"
              : "bg-white hover:bg-gray-50"
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