import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "../../../UploadWidget/UploadWidget";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CreateLanding({ campeinId, templateProp }) {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [template, setTemplate] = useState("");
  const [contenido2, setContenido2] = useState("");
  const [img, setImg] = useState("");
  const [formulario, setFormulario] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setTemplate(templateProp);
  }, [templateProp]);

  const handleSubmit = async () => {
    try {
      console.log("Enviando datos:", {
        titulo,
        subtitulo,
        contenido,
        template,
        contenido2,
        img,
        formulario,
      });
      const response = await axios.post(
        `/campein/${campeinId}/landingcampein`,
        {
          titulo,
          subtitulo,
          contenido,
          template,
          contenido2,
          img,
          formulario,
        }
      );
      console.log("Landing creada:", response.data);
      alert("La landing ha sido creada con éxito.");
      navigate("/admin/campain");
    } catch (error) {
      console.error("Error al crear la landing:", error);
      setError("Error al crear la landing. Por favor, inténtalo de nuevo.");
    }
  };

  const handleImageUpload = (url) => {
    console.log("URL de la imagen recibida:", url);
    setImg(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Crear Landing Page</h1>
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
        >
          Volver
        </Button>
      </div>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="space-y-6">
        <div>
          <label htmlFor="titulo" className="block font-semibold mb-2">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label htmlFor="contenido" className="block font-semibold mb-2">Contenido:</label>
          <ReactQuill
            value={contenido}
            onChange={setContenido}
            className="border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label htmlFor="subtitulo" className="block font-semibold mb-2">Subtítulo:</label>
          <input
            type="text"
            id="subtitulo"
            value={subtitulo}
            onChange={(e) => setSubtitulo(e.target.value)}
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label htmlFor="contenido2" className="block font-semibold mb-2">Contenido 2 (Subtítulo):</label>
          <ReactQuill
            value={contenido2}
            onChange={setContenido2}
            className="border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label htmlFor="img" className="block font-semibold mb-2">Imagen:</label>
          <UploadWidget onImageUpload={handleImageUpload} />
          {img && (
            <div className="mt-4">
              <img src={img} alt="Vista previa" className="max-w-full h-auto rounded-md" />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="formulario" className="block font-semibold mb-2">Formulario:</label>
          <select
            id="formulario"
            value={formulario}
            onChange={(e) => setFormulario(e.target.value)}
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-400"
          >
            <option value="" disabled>Seleccionar formulario</option>
            <option value="sencillo">Formulario sencillo</option>
            <option value="completo">Formulario completo</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
        >
          Crear Landing
        </button>
      </div>
    </div>
  );
}

CreateLanding.propTypes = {
  campeinId: PropTypes.string.isRequired,
  templateProp: PropTypes.string.isRequired,
};