import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "../../../UploadWidget/UploadWidget";

export default function EditLanding({ campeinId, landingId }) {
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
    const fetchLanding = async () => {
      try {
        const response = await axios.get(
          `/campein/${campeinId}/landingcampein/${landingId}`
        );
        const {
          titulo,
          subtitulo,
          contenido,
          template,
          contenido2,
          img,
          formulario,
        } = response.data;
        setTitulo(titulo);
        setSubtitulo(subtitulo);
        setContenido(contenido);
        setTemplate(template);
        setContenido2(contenido2);
        setImg(img);
        setFormulario(formulario);
      } catch (error) {
        console.error("Error al obtener la landing:", error);
        setError("Error al obtener la landing. Por favor, inténtalo de nuevo.");
      }
    };

    fetchLanding();
  }, [campeinId, landingId]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `/campein/${campeinId}/landingcampein/${landingId}`,
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
      console.log("Landing actualizada:", response.data);
      alert("La landing ha sido actualizada con éxito.");
      navigate("/admin/campain");
    } catch (error) {
      console.error("Error al actualizar la landing:", error);
      setError("Error al actualizar la landing. Por favor, inténtalo de nuevo.");
    }
  };

  const handleImageUpload = (url) => {
    setImg(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Editar Landing Page</h1>
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
          <UploadWidget onUpload={handleImageUpload} />
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
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
        >
          Actualizar Landing
        </button>
      </div>
    </div>
  );
}

EditLanding.propTypes = {
  campeinId: PropTypes.string.isRequired,
  landingId: PropTypes.string.isRequired,
};