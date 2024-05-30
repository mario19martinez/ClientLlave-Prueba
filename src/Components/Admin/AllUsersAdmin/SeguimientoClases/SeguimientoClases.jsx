import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function SeguimientoClases() {
  const [seguimientos, setSeguimientos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, /*setPageSize*/] = useState(10); // Tamaño de la página
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
    fetchSeguimiento();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Aplicar filtros directamente en la petición
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

    return userMatch || cursoMatch || claseMatch;
  });

  // Paginación
  const indexOfLastSeguimiento = currentPage * pageSize;
  const indexOfFirstSeguimiento = indexOfLastSeguimiento - pageSize;
  const currentSeguimientos = filteredSeguimientos.slice(
    indexOfFirstSeguimiento,
    indexOfLastSeguimiento
  );

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
    <div className="px-3 py-3">
      <button
        onClick={goBack}
        className="bg-blue-500 text-white w-20 h-10 mb-8 font-semibold py-0 px-4 rounded hover:bg-gray-400 transition-transform ease-in-out duration-300 hover:translate-y-1"
      >
        <KeyboardBackspaceIcon fontSize="large" />
      </button>
      <h1 className="text-xl font-bold mb-6 text-gray-700">
        Seguimiento de Clases
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border-2  border-gray-400 p-2 focus:border-blue-800 focus:outline-none rounded-lg"
        />
      </div>
      <div className="overflow-x-auto border border-gray-400 rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-blue-200 border-b border-gray-300">
            <tr className="bg-blue-100 text-gray-700 uppercase text-xs leading-normal">
              <th className="py-3 px-6 text-left">Usuario</th>
              <th className="py-3 px-6 text-left">Curso</th>
              <th className="py-3 px-6 text-left">Clase</th>
              <th className="py-3 px-6 text-left">Inicio</th>
              <th>Fin</th>
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
                <td className="py-3 px-6 text-left">{seguimiento.clase.name}</td>
                <td className="py-3 px-6 text-left">
                  {new Date(seguimiento.inicio).toLocaleString()}
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(seguimiento.fin).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Paginación */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredSeguimientos.length / pageSize) }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`mx-1 px-3 py-1 rounded-lg ${
              currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SeguimientoClases;