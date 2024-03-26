// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function CreateLanding({ campeinId }) {
  const [titulo, setTitulo] = useState("");
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
          contenido,
          template,
          contenido2,
          img,
          video,
          resumen,
        }
      );
      console.log("Landing creada:", response.data);
      // Aquí podrías redirigir a la página de detalles de la landing recién creada, por ejemplo
    } catch (error) {
      console.error("Error al crear la landing:", error);
      setError("Error al crear la landing. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <h1>Crear Landing Page</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contenido">Contenido:</label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="template">Template:</label>
          <input
            type="text"
            id="template"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contenido2">Contenido 2:</label>
          <textarea
            id="contenido2"
            value={contenido2}
            onChange={(e) => setContenido2(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="img">Imagen:</label>
          <input
            type="text"
            id="img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="video">Video:</label>
          <input
            type="text"
            id="video"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="resumen">Resumen:</label>
          <textarea
            id="resumen"
            value={resumen}
            onChange={(e) => setResumen(e.target.value)}
          />
        </div>
        <button type="submit">Crear Landing</button>
      </form>
    </div>
  );
}

CreateLanding.propTypes = {
  campeinId: PropTypes.string.isRequired,
};