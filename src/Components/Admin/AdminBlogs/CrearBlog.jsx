import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CrearBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    embeddedElement: "",
    estado: "",
    autor: "", // Nuevo campo de autor
    Lectura: "", // Nuevo campo de lectura
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/blogs", formData);
      console.log("Blog creado:", response.data);
      window.alert("¡El blog ha sido creado con éxito!");
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Hubo un error al crear el blog:", error);
    }
  };

  const goBack = () => {
    navigate("/admin/blogs");
  };

  return (
    <div className="bg-gradient-to-br from-green-100 to-blue-200 p-8 rounded-lg shadow-md max-w-3xl mx-auto w-screen">
      <button
        onClick={goBack}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Atrás
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Crear nuevo blog
      </h2>
      <div className="mb-4"></div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-800 mb-1">Título:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-400 bg-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-800 mb-1">Contenido:</label>
          <ReactQuill
            value={formData.content}
            onChange={(value) => handleChange("content", value)}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["clean"],
                [{ align: [] }],
                [{ color: [] }, { background: [] }], // Cambio de color de texto y fondo
              ],
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 bg-white"
            style={{ minHeight: "200px" }}
            required
          />
        </div>
        <div>
          <label className="block text-gray-800 mb-1">URL de la imagen:</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-400 bg-white"
          />
        </div>
        <div>
          <label className="block text-gray-800 mb-1">
            Elemento incrustado de Soundcloud:
          </label>
          <textarea
            name="embeddedElement"
            value={formData.embeddedElement}
            onChange={(e) => handleChange("embeddedElement", e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-400 bg-white"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-gray-800 mb-1">Autor:</label>
          <select
            name="autor"
            value={formData.autor}
            onChange={(e) => handleChange("autor", e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-400 bg-white"
            required
          >
            <option value="">Selecciona un autor</option>
            <option value="Profeta Petra Montecino">Profeta Petra Montecino </option>
            <option value="Apóstol Diego Rullier">Apóstol Diego Rullier</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-800 mb-1">Tempo de lectura:</label>
          <input
            type="text"
            name="Lectura"
            value={formData.Lectura}
            onChange={(e) => handleChange("Lectura", e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-400 bg-white"
            required
          />
        </div>

        <div className="flex py-4">
          <button
            type="button"
            className="bg-gray-500 text-white py-3 px-6 rounded-md mr-4 hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            onClick={(e) => {
              e.preventDefault(); 
              setFormData({ ...formData, estado: "borrador" });
              handleSubmit(e); 
            }}
          >
            Guardar Borrador
          </button>
          <button
            type="button"
            className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={(e) => {
              e.preventDefault(); 
              setFormData({ ...formData, estado: "publicado" });
              handleSubmit(e); 
            }}
          >
            Publicar Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearBlog;