// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CrearProfeticos = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [video, setVideo] = useState("");
  const [Taller, setTaller] = useState("");
  const [tipo, setTipo] = useState("");

  // Función para obtener el ID del video de YouTube a partir de la URL
  const obtenerIDVideo = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Obtener el ID del video de YouTube
      const videoID = obtenerIDVideo(video);

      await axios.post("/profeticos", {
        titulo,
        descripcion,
        video: videoID, // Usar solo el ID del video
        Taller,
        tipo,
      });
      // Limpiar los campos después de enviar la solicitud
      setTitulo("");
      setDescripcion("");
      setVideo("");
      setTaller("");
      setTipo("");
      alert("Clase profética creada exitosamente");
    } catch (error) {
      console.error("Error al crear clase profética:", error);
      alert("Error al crear clase profética");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Crear Clase Profética</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="titulo">
            Título:
          </label>
          <input
            type="text"
            id="titulo"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="descripcion">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="taller">
            Taller:
          </label>
          <ReactQuill
            id="Taller"
            value={Taller}
            onChange={setTaller}
            modules={{ toolbar: true }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="video">
            Video (URL):
          </label>
          <input
            type="text"
            id="video"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="tipo">
            Tipo:
          </label>
          <select
            id="tipo"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="">Seleccionar tipo</option>
            <option value="Caracter">Caracter probado y aprobado</option>
            <option value="Doctrina">Doctrina de demonios</option>
            <option value="Llamamiento">Llamamiento y asignación</option>
            <option value="Historia">Historia Profética</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Crear
        </button>
      </form>
    </div>
  );
};

export default CrearProfeticos;