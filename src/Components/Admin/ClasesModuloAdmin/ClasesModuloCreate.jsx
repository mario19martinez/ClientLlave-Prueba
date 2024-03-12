import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

function ClaseModuloCreate({ moduloId, updateClassList }) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    pdfURL: "",
    texto: "",
    resumen: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`/modulo/${moduloId}/clase`, formData);
      console.log("Clase creada con exito");
      setFormData({
        name: "",
        url: "",
        pdfURL: "",
        texto: "",
        resumen: "",
      });
      updateClassList();
      // navigate('')
    } catch (error) {
      console.error("Error al crear la clase:", error);
      setError("Hubo un error al crear la clase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-2 ">
      <h2 className="text-2xl font-bold mb-2 text-white translate-x-4">Agregar Clase</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 rounded-lg shadow-lg"
      >
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block text-white text-sm font-bold mb-2"
          >
            Nombre:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-2" >
          <label
            htmlFor="url"
            className="block text-white text-sm font-bold mb-2"
          >
            URL:
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="pdfURL"
            className="block text-white text-sm font-bold mb-2"
          >
            URL del PDF:
          </label>
          <input
            type="text"
            id="pdfURL"
            name="pdfURL"
            value={formData.pdfURL}
            onChange={handleChange}
            className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="texto"
            className="block text-white text-sm font-bold mb-2"
          >
            Texto:
          </label>
          <textarea
            id="texto"
            name="texto"
            value={formData.texto}
            onChange={handleChange}
            className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div className="mb-2">
          <label
            htmlFor="resumen"
            className="block text-white text-sm font-bold mb-2"
          >
            Resumen:
          </label>
          <textarea
            id="resumen"
            name="resumen"
            value={formData.resumen}
            onChange={handleChange}
            className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loading ? "Creando..." : "Crear Clase"}
        </button>
      </form>
    </div>
  );
}

export default ClaseModuloCreate;
