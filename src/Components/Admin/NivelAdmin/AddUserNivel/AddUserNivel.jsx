import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function AddUserNivel({ nivelId }) {
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuscar = async () => {
    try {
      setLoading(true);
      setError(null);
  
      if (!busqueda.trim()) {
        setResultados([]);
        return;
      }
  
      const response = await axios.get(`/user?name=${busqueda}`);
      setResultados(response.data);
    } catch (error) {
      console.error("Error al buscar usuarios:", error.message);
      setError("Error al buscar usuarios. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleAgregarUsuario = async (usuario) => {
    try {
      setLoading(true);
      setError(null);

      if (!usuario || !usuario.sub) {
        console.error("Error: Usuario no seleccionado o ID no disponible.");
        setError("Selecciona un usuario válido.");
        return;
      }

      await axios.post(`/nivel/${nivelId}/usuario/${usuario.sub}`);
      console.log("Usuario agregado con éxito al nivel.");
    } catch (error) {
      console.error("Error al agregar usuario al nivel:", error.message);
      setError(
        "Error al agregar usuario al nivel. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-screen-md mx-auto bg-white rounded-md shadow-md">
        <div className="p-6">
          <label className="block mb-2">
            Buscar Usuario:
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="border border-gray-300 px-4 py-2 w-full rounded-md"
            />
          </label>
          <button
            onClick={handleBuscar}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Buscar
          </button>
        </div>

        {loading && <p className="text-center text-gray-500">Cargando Usuarios...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {resultados.length > 0 ? (
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">Resultados de la búsqueda:</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2">Apellido</th>
                  <th className="border border-gray-300 px-4 py-2">Correo</th>
                  <th className="border border-gray-300 px-4 py-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((usuario, index) => (
                  <tr key={`${usuario.id}-${index}`} className="mb-2">
                    <td className="border border-gray-300 px-4 py-2">{usuario.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{usuario.last_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{usuario.email}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => setUserSelected(usuario)}
                        className="bg-green-500 text-white px-2 py-1 rounded-md"
                        disabled={loading}
                      >
                        Agregar al Nivel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-6 text-center">No se encontraron resultados.</p>
        )}

        {userSelected && (
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-2">Usuario Seleccionado:</h2>
            <p className="mb-2">{userSelected.name}</p>
            <button
              onClick={() => handleAgregarUsuario(userSelected)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              Agregar al Nivel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

AddUserNivel.propTypes = {
  nivelId: PropTypes.string.isRequired,
};

export default AddUserNivel;