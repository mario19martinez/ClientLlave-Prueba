import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function AddUserGrupo({ nivelId, grupoId, closeModalAndReload }) {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [hasPaid, setHasPaid] = useState({});
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  const handleBuscar = async () => {
    try {
      setLoading(true);
      setError(null);
      setUserNotFound(false);

      const query = busqueda?.trim().toLowerCase() || ""; // Asegura que query sea una cadena vacía si es undefined

      if (!query) {
        setResultados([]);
        return;
      }

      const response = await axios.get(`/search`, {
        params: {
          nivelId: nivelId,
          query, // Cambiado de name a query para coincidir con la API
        },
      });

      console.log("Respuesta de búsqueda:", response.data); // Depuración para verificar datos recibidos

      const { usuarios } = response.data;

      if (usuarios.length === 0) {
        setUserNotFound(true);
        setResultados([]);
      } else {
        const usuariosSub = usuarios.map((usuario) => ({
          ...usuario,
          userSub: usuario.sub,
          grupoName: usuario.grupo ? usuario.grupo.name : null,
        }));
        setResultados(usuariosSub);
        setCurrentPage(1); // Reset to the first page when new results are fetched
      }
    } catch (error) {
      console.error("Error al buscar usuarios:", error.message);
      setError(error.response?.data?.error || "Ocurrió un error en la búsqueda.");
    } finally {
      setLoading(false);
    }
  };

  const memoizedResultados = useMemo(() => resultados, [resultados]);

  const handleSubmit = async (e, userSub) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/add-user-grupo`, {
        userSub,
        grupoId,
        nivelId,
        hasPaid: hasPaid[userSub],
      });
      setMessage(response.data.message);
      toast.success("Usuario agregado con éxito!", {
        position: "top-center",
        autoClose: 1200,
        closeOnClick: true,
        theme: "light",
      });
      setTimeout(() => {
        closeModalAndReload();
      }, 1500);
      setHasPaid((prevHasPaid) => ({ ...prevHasPaid, [userSub]: false }));
    } catch (error) {
      setError(error.response?.data?.error || "Ocurrió un error al agregar el usuario.");
      toast.warning("El usuario ya está inscrito en un Grupo!", {
        position: "top-center",
        autoClose: 1800,
        closeOnClick: true,
        theme: "light",
      });
    }
  };

  const handlePaidChange = (userSub, value) => {
    setHasPaid((prevHasPaid) => ({
      ...prevHasPaid,
      [userSub]: value,
    }));
  };

  // Paginate results
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = memoizedResultados.slice(indexOfFirstResult, indexOfLastResult);

  // Pagination controls
  const totalPages = Math.ceil(memoizedResultados.length / resultsPerPage);

  return (
    <div className="mx-auto w-full max-w-6xl p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agregar Usuario</h2>
      <div className="mb-6">
        <label htmlFor="userSearch" className="block text-sm font-medium text-gray-700">
          Buscar Usuario (Nombre, Apellido, Teléfono, Correo):
        </label>
        <div className="flex mt-2">
          <input
            id="userSearch"
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onBlur={handleBuscar}
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingrese un criterio de búsqueda"
          />
          <button
            onClick={handleBuscar}
            className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Buscar
          </button>
        </div>
        {loading && <p className="text-gray-500 mt-2">Buscando usuarios...</p>}
        {error && <p className="text-red-600 mt-2">Error: {error}</p>}
        {userNotFound && <p className="text-red-600 mt-2">El Usuario no está en la plataforma.</p>}
        {memoizedResultados.length > 0 && (
          <>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">¿Pagó?</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentResults.map((user) => (
                    <tr key={user.userSub}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name} {user.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.telefono}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <input
                          type="checkbox"
                          checked={!!hasPaid[user.userSub]}
                          onChange={(e) => handlePaidChange(user.userSub, e.target.checked)}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={(e) => handleSubmit(e, user.userSub)}
                          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        >
                          Agregar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Anterior
              </button>
              <span className="text-gray-700">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
      {message && <p className="text-green-600 mt-2">{message}</p>}
      <ToastContainer />
    </div>
  );
}

AddUserGrupo.propTypes = {
  nivelId: PropTypes.string.isRequired,
  grupoId: PropTypes.string.isRequired,
  closeModalAndReload: PropTypes.func.isRequired,
};

export default AddUserGrupo;