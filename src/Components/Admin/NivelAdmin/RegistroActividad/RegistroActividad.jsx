import { useEffect, useState } from "react";
import axios from "axios";

function RegistroActividad() {
  const [registros, setRegistros] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await axios.get("/registros-actividad");
        setRegistros(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error al traer los registros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistros();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRegistros = registros.filter((registro) => {
    const userMatch =
      (registro.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        registro.user?.last_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())) ??
      false;
    const grupoMatch =
      registro.modulo?.grupos[0]?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ?? false;
    const moduloMatch =
      registro.modulo?.titulo
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ?? false;
    const claseMatch =
      registro.nivelclase?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ?? false;

    return userMatch || grupoMatch || moduloMatch || claseMatch;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentRegistros = filteredRegistros.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredRegistros.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-xl font-semibold text-blue-600">
          Cargando...
        </span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-5 px-10 p-8 ">
      <h1 className="text-xl font-bold mb-6 text-gray-700">
        Registros de Actividad
      </h1>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border-2 border-gray-400 p-2 mb-4 focus:border-blue-800 focus:outline-none rounded-lg"
      />
      {currentRegistros.length === 0 ? (
        <p>No hay registros disponibles.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-400 rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-blue-200 border-b border-gray-300">
              <tr className="bg-blue-100 text-gray-700 uppercase text-xs leading-normal">
                <th className="py-3 px-6 text-left">Usuario</th>
                <th className="py-3 px-6 text-left">Grupo</th>
                <th className="py-3 px-6 text-left">Modulo</th>
                <th className="py-3 px-6 text-left">Clase</th>
                <th className="py-3 px-6 text-left">Inicio</th>
                <th className="py-3 px-6 text-left">Progreso</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-mono divide-y divide-gray-200">
              {registros.map((registro) => (
                <tr
                  key={registro.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {registro.user
                      ? `${registro.user.name} ${registro.user.last_name}`
                      : ""}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {registro.modulo &&
                    registro.modulo.grupos &&
                    registro.modulo.grupos[0]
                      ? registro.modulo.grupos[0].name
                      : ""}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {registro.modulo ? registro.modulo.titulo : ""}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {registro.nivelclase ? registro.nivelclase.name : ""}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {registro.inicio
                      ? new Date(registro.inicio).toLocaleDateString()
                      : ""}
                  </td>
                  <td
                    className={`py-3 px-6 text-left font-semibold w-0 ${
                      registro.progreso >= 80
                        ? "bg-green-500 text-white"
                        : "bg-yellow-300 text-black"
                    }`}
                  >
                    {registro.progreso.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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

export default RegistroActividad;
