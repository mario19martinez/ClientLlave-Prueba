import { useState, useEffect } from "react";
import axios from "axios";

function AddModulo({ nivelId, grupoId }) {
  const [modulos, setModulos] = useState([]);
  const [moduloId, setModuloId] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl mb-4">Agregar Modulo a Grupo</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label htmlFor="modulo" className="block text-sm font-medium text-gray-700">
            Seleccionar Módulo:
          </label>
          <select
            id="modulo"
            value={moduloId}
            onChange={handleModuloChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Seleccione un módulo</option>
            {modulos.map((modulo) => (
              <option key={modulo.id} value={modulo.id}>
                {modulo.titulo}
              </option>
            ))}
          </select>
        </div>
        <button
        type="submit"
        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >Agregar Modulo</button>
      </form>
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
    </div>
  );
}

export default AddModulo;
