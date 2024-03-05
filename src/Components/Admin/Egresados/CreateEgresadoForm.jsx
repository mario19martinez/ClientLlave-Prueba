// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateEgresadoForm = () => {
  const navegate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    content: "",
    media: "",
    template: "1",
  });

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleContentChange = (value) => {
    handleChange("content", value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/egresados", formData);
      console.log("Egresado creado:", response.data);
      // Limpiar el formulario después de un envío exitoso
      setFormData({
        name: "",
        content: "",
        media: "",
        template: "1",
      });
      // Mostrar alerta de éxito
      alert("Egresado creado con éxito");
    } catch (error) {
      console.error("Error al crear el egresado:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <div className="justify-start py-3">
        <button
          onClick={() => navegate("/admin/Egresados")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Atras
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Crear Egresado</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-gray-700">
            Contenido:
          </label>
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={handleContentChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="media" className="block text-gray-700">
            Media:
          </label>
          <input
            type="text"
            id="media"
            name="media"
            value={formData.media}
            onChange={(e) => handleChange("media", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="template" className="block text-gray-700">
            Template:
          </label>
          <select
            id="template"
            name="template"
            value={formData.template}
            onChange={(e) => handleChange("template", e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="1">Template 1</option>
            <option value="2">Template 2</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Crear Egresado
        </button>
      </form>
    </div>
  );
};

export default CreateEgresadoForm;