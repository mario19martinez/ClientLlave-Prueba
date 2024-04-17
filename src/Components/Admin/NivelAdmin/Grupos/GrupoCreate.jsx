import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function GrupoCreate() {
  const [name, setName] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/nivel/${id}/grupo`, {
        name,
        descripcion,
      });
      console.log("Grupo creado:", response.data);
    } catch (error) {
      setError(error.response.data.error);
      console.error("ha ocurrido un error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Crear Grupo</h2>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descripcion" className="block font-medium mb-2">
            Descripcion (Opcional):
          </label>
          <textarea
            id="descripcion"
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Crear Grupo
        </button>
      </form>
    </div>
  );
}

export default GrupoCreate;
