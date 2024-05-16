import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function AddUserGrupo({ nivelId, grupoId }) {
  const [setUserSub] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBuscar = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!busqueda.trim()) {
        setResultados([]);
        return;
      }

      const response = await axios.get(`/user?name=${busqueda}`);
      const usuariosSub = response.data.map(usuario => ({
        ...usuario,
        userSub: usuario.id
      }))
      setResultados(usuariosSub);
    } catch (error) {
      console.error("Error al buscar usuarios:", error.message);
      setError("Error al buscar usuarios. por favor, intentalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const memoizedResultados = useMemo(() => resultados, [resultados]);

  const handleSubmit = async (e, userSub) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/nivel/${nivelId}/grupo/${grupoId}/usuario`,
        {
          userSub: userSub,
        }
      );
      setMessage(response.data.message);
      setUserSub("");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Agregar Usuario</h2>
      <div className="mb-4">
        <label
          htmlFor="userSearch"
          className="block text-sm font-medium text-gray-700"
        >
          Buscar Usuario por Nombre:
        </label>
        <div className="flex">
          <input
            id="userSearch"
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onBlur={handleBuscar}
            className="mt-1 p-2 flex-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleBuscar}
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Buscar
          </button>
        </div>
        {loading && (
          <p className="text-gray-500 mt-2">Buscando usuarios...</p>
        )}
        {error && <p className="text-red-600 mt-2">Error: {error}</p>}
        {memoizedResultados.length > 0 && (
          <ul className="mt-1 border border-gray-200 rounded-md divide-y divide-gray-200">
            {memoizedResultados.map((user, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
              >
                <span>{user.name}</span>
                <button
                  onClick={(e) => handleSubmit(e, user.sub)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Agregar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {message && <p className="text-green-600 mt-2">{message}</p>}
    </div>
  );
}

AddUserGrupo.propTypes = {
  nivelId: PropTypes.string.isRequired,
  grupoId: PropTypes.string.isRequired,
};

export default AddUserGrupo;
