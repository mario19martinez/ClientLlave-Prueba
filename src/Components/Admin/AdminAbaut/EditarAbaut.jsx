// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const EditarAbout = ({ id }) => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchAboutById = async () => {
      try {
        const response = await axios.get(`/about/${id}`);
        const { titulo, content } = response.data;
        setTitulo(titulo);
        setContent(content);
      } catch (error) {
        console.error("Error fetching About content by ID:", error);
      }
    };

    fetchAboutById();
  }, [id]);

  const handleUpdateAbout = async () => {
    try {
      await axios.put(`/about/${id}`, { titulo, content });
      console.log("Contenido 'About' actualizado correctamente");
      navigate("/Admin/Nosotros");
    } catch (error) {
      console.error("Error updating About content:", error);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/Admin/Nosotros")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Atrás
      </button>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Editar Contenido</h2>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título"
          className="border rounded p-2 mb-4"
        />
        <ReactQuill
          value={content}
          onChange={(value) => setContent(value)}
          placeholder="Escribe tu contenido aquí"
          className="border rounded mb-4"
        />
        <button
          onClick={handleUpdateAbout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Actualizar
        </button>
      </div>
    </div>
  );
};

EditarAbout.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default EditarAbout;