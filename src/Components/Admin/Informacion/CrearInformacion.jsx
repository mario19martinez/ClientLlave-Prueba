import { useState } from "react";
import axios from "axios";

const CrearInformacion = () => {
  const [titulo, setTitulo] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
       await axios.post("/informacion", { titulo, content });
      // Limpiar el formulario después de crear la información
      setTitulo("");
      setContent("");
    } catch (error) {
      console.error("Error al crear la información:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mx-auto mt-8 p-4 bg-blue-400 h-96 min-w-xl w-3/5 translate-y-0 rounded">
      <h1 className="text-2xl font-bold mb-4 text-gray-100 ml-6">Crear Nueva Información</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-gray-100 font-bold mb-2 ml-6">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2 w-11/12 ml-6"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-100 font-bold mb-2 ml-6">Contenido:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2 w-11/12 ml-6"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed font-bold ml-6"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear"}
        </button>
      </form>
    </div>
  );
};

export default CrearInformacion;
