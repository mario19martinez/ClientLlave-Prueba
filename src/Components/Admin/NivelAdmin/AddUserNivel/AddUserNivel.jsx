import { useState } from "react";
import axios from "axios";

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
  
        const response = await axios.get(`/usuarios?name=${busqueda}`);
        setResultados(response.data);
      } catch (error) {
        console.error("Error al buscar usuarios:", error.message);
        setError("Error al buscar usuarios. Por favor, inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };
  
    const handleAgregarUsuario = async () => {
      try {
        setLoading(true);
        setError(null);
  
        if (!userSelected || !userSelected.sub) {
          console.error("Error: Usuario no seleccionado o ID no disponible.");
          setError("Selecciona un usuario válido.");
          return;
        }
  
        await axios.post(`/nivel/${nivelId}/usuario/${userSelected.sub}`);
        console.log("Usuario agregado con éxito al nivel.");
      } catch (error) {
        console.error("Error al agregar usuario al nivel:", error.message);
        setError("Error al agregar usuario al nivel. Por favor, inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
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
          disabled={loading}
        >
          Buscar
        </button>
  
        {loading && <p className="mt-4 text-gray-500">Cargando Usuarios...</p>}
  
        {error && <p className="mt-4 text-red-500">{error}</p>}
  
        {resultados.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">
              Resultados de la búsqueda:
            </h2>
            <ul>
              {resultados.map((usuario, index) => (
                <li key={`${usuario.id}-${index}`} className="mb-2">
                  <span className="mr-2">
                    {usuario.name} - {usuario.email}
                  </span>
                  <button
                    onClick={() => setUserSelected(usuario)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md"
                    disabled={loading}
                  >
                    Agregar al Nivel
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
  
        {userSelected && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Usuario Seleccionado:</h2>
            <p className="mb-2">{userSelected.name}</p>
            <button
              onClick={handleAgregarUsuario}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              Agregar al Nivel
            </button>
          </div>
        )}
      </div>
    );
  }

export default AddUserNivel;
