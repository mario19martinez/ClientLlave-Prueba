import { useState, useEffect } from "react";
import axios from "axios";

function GrupoEdit({ nivelId, grupoId }) {
  const [grupoData, setGrupoData] = useState({});
  const [formData, setFormData] = useState({ name: "", descripcion: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchGrupo = async () => {
      try {
        const response = await axios.get(
          `/niveles/${nivelId}/grupos/${grupoId}`
        );
        setGrupoData(response.data);
        setFormData({ 
          name: response.data.name,
          descripcion: response.data.descripcion
        })
        setLoading(false);
      } catch (error) {
        console.error("Error al traer la informacion del grupo:", error);
        setError("Error al cargar el grupo.");
        setLoading(false);
      }
    };
    fetchGrupo();
  }, [nivelId, grupoId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/nivel/${nivelId}/grupo/${grupoId}`, formData);
      setSuccessMessage("Grupo actualizado con exito.");
    } catch (error) {
      setError("Error al modificar el grupo.");
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-full mx-auto mt-8 bg-gray-100 p-8 rounded-lg shadow-lg translate-y-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Modificar Grupo</h2>
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 pt-6">
          <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-1">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full h-10 border-blue-500 border-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4 pt-6">
          <label htmlFor="descripcion" className="block text-base font-medium text-gray-700 mb-1">Descripcion:</label>
          <input
            type="text"
            name="descripcion"
            id="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            className="w-full h-10 border-blue-500 border-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >Guardar</button>
      </form>
    </div>
  );
}

export default GrupoEdit;
