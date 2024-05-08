import { useState, useEffect } from "react";
import axios from "axios";

function AddModulo({ nivelId, grupoId }) {
  const [modulos, setModulos] = useState([]);
  const [moduloId, setModuloId] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [modulosEnGrupo, setModulosEnGrupo] = useState([]);

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get(`/niveles/${nivelId}/modulos`);
        setModulos(response.data);
      } catch (error) {
        setError("Error al obtener los modulos");
      }
    };
    fetchModulos();
  }, [nivelId]);

  useEffect(() => {
    const fetchModulosEnGrupo = async () => {
      try {
        const response = await axios.get(`/grupo/${grupoId}/modulos`);
        console.log('response:', response)
        setModulosEnGrupo(response.data.modulos);
      } catch (error) {
        setError("Error al obtener los modulos del grupo");
      }
    };
    fetchModulosEnGrupo();
  }, [grupoId]);

  const handleModuloChange = (e) => {
    setModuloId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/nivel/${nivelId}/grupo/${grupoId}/add-modulo`,
        {
          moduloId: moduloId,
        }
      );
      setSuccessMessage(response.data.message);
      setError(null);
    } catch (error) {
      console.error("Error al agregar el Modulo:", error);
      setError(error.response.data.error);
      setSuccessMessage("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl mb-6 font-semibold text-center text-gray-700">Agregar Módulo a Grupo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="modulo" className="block text-sm font-medium text-gray-700">
            Seleccionar Módulo:
          </label>
          <select
            id="modulo"
            value={moduloId}
            onChange={handleModuloChange}
            className="mt-1 block w-full p-2 border-2 border-blue-500 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-600"
          >
            <option value="">Seleccione un módulo</option>
            {modulos
              .filter((modulo) => !modulosEnGrupo.some((mod) => mod.id === modulo.id))
              .map((modulo) => (
                <option key={modulo.id} value={modulo.id}>
                  {modulo.titulo}
                </option>
              ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition duration-300 ease-in-out"
        >
          Agregar Módulo
        </button>
      </form>
      {error && <p className="text-red-500 font-bold mt-4">Error: {error}</p>}
      {successMessage && <p className="text-green-500 font-bold mt-4">{successMessage}</p>}
    </div>
  );
}

export default AddModulo;
