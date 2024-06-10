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
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Crear Nueva Información</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-white font-bold mb-2">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-white font-bold mb-2">Contenido:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed font-bold"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear"}
        </button>
      </form>
    </div>
  );
};

export default CrearInformacion;
