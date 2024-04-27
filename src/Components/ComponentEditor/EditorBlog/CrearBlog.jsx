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
    estado: "borrador", 
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
      navigate("/Editor/Blogs");
    } catch (error) {
      console.error("Hubo un error al crear el blog:", error);
    }
  };

  const goBack = () => {
    navigate("/Editor/Blogs");
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <button
        onClick={goBack}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Volver
      </button>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Crear nuevo blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-800">
            Título:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800">Contenido:</label>
          <ReactQuill
            value={formData.content}
            onChange={(value) => handleChange("content", value)}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                [
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "blockquote",
                ],
                [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                ["link", "image", "video"],
                ["clean"],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
              ],
            }}
            style={{ minHeight: "200px" }}
            required
            className="mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-800">
            URL de la imagen:
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <div>
          <label htmlFor="embeddedElement" className="block text-sm font-semibold text-gray-800">
            Elemento incrustado de Soundcloud:
          </label>
          <textarea
            id="embeddedElement"
            name="embeddedElement"
            value={formData.embeddedElement}
            onChange={(e) => handleChange("embeddedElement", e.target.value)}
            rows="4"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CrearBlog;