import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function CreateLandingCursos({ campeinId }) {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [template, setTemplate] = useState("");
  const [contenido2, setContenido2] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [resumen, setResumen] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/campein/${campeinId}/landingcampein`,
        {
          titulo,
          subtitulo,
          contenido,
          template,
          contenido2, 
          img,
          video,
          resumen,
        }
      );
      console.log("Landing creada:", response.data);
    } catch (error) {
      console.error("Error al crear la landing:", error);
      setError("Error al crear la landing. Por favor, inténtalo de nuevo.");
    }
  };

  return (
      <div className="w-full px-20 py-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Crear Landing Page</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="titulo" className="block font-semibold">Título:</label>
            <input
              type="text"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="subtitulo" className="block font-semibold">Subtítulo:</label>
            <input
              type="text"
              id="subtitulo"
              value={subtitulo}
              onChange={(e) => setSubtitulo(e.target.value)}
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="contenido" className="block font-semibold">Contenido:</label>
            <textarea
              id="contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="template" className="block font-semibold">Template:</label>
            <input
              type="text"
              id="template"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="contenido2" className="block font-semibold">Contenido 2:</label>
            <textarea
              id="contenido2"
              value={contenido2}
              onChange={(e) => setContenido2(e.target.value)}
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="img" className="block font-semibold">Imagen:</label>
            <input
              type="text"
              id="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="video" className="block font-semibold">Video:</label>
            <input
              type="text"
              id="video"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label htmlFor="resumen" className="block font-semibold">Resumen:</label>
            <textarea
              id="resumen"
              value={resumen}
              onChange={(e) => setResumen(e.target.value)}
              className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-400"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full">Crear Landing</button>
        </form>
      </div>
  );
}

CreateLandingCursos.propTypes = {
  campeinId: PropTypes.string.isRequired,
};