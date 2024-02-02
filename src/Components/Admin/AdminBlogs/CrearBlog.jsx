// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
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
      window.location.reload();
    } catch (error) {
      console.error("Hubo un error al crear el blog:", error);
    }
    navigate("/admin/blogs");
    window.location.reload();
  };

  const goBack = () => {
    navigate("/admin/blogs");
  };

  return (
    <div className="bg-gradient-to-br from-blue-300 to-blue-200 p-8 rounded-lg shadow-md max-w-3xl mx-auto">
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
      <form onSubmit={handleSubmit} className="space-y-6">
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
            className="bg-white text-gray-800 border rounded-md focus:outline-none focus:border-blue-400 p-4"
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
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Crear Blog
        </button>
      </form>
    </div>
  );
};

export default CrearBlog;
