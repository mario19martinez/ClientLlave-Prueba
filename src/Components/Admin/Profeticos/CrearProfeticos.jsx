// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const CrearProfeticos = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [video, setVideo] = useState("");
  const [contenido, setContenido] = useState("");
  const [tipo, setTipo] = useState("");
  const [preguntas, setPreguntas] = useState([
    { pregunta: "", opciones: ["a", "b", "c", "d"], respuestaCorrecta: "" },
  ]);

  const navigate = useNavigate();

  // Función para obtener el ID del video de YouTube a partir de la URL
  const obtenerIDVideo = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const agregarPregunta = () => {
    setPreguntas([
      ...preguntas,
      {
        pregunta: "",
        opciones: ["a", "b", "c", "d"],
        respuestaCorrecta: "",
      },
    ]);
  };

  const handleChangePregunta = (index, e) => {
    const { name, value } = e.target;
    const newPreguntas = [...preguntas];
    newPreguntas[index][name] = value;
    setPreguntas(newPreguntas);
  };

  const handleChangeOpcion = (indexPregunta, indexOpcion, e) => {
    const newPreguntas = [...preguntas];
    newPreguntas[indexPregunta].opciones[indexOpcion] = e.target.value;
    setPreguntas(newPreguntas);
  };

  const handleChangeRespuesta = (index, e) => {
    const { value } = e.target;
    const newPreguntas = [...preguntas];
    newPreguntas[index].respuestaCorrecta = value;
    setPreguntas(newPreguntas);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const respuestaSeleccionada = preguntas.every(
      (pregunta) => pregunta.respuestaCorrecta !== ""
    );
    if (!respuestaSeleccionada) {
      alert("Por favor, selecciona una respuesta correcta para cada pregunta.");
    }
    try {
      // Obtener el ID del video de YouTube
      const videoID = obtenerIDVideo(video);

      const preguntasFormateadas = preguntas.map((pregunta) => ({
        pregunta: pregunta.pregunta,
        opciones: pregunta.opciones,
        respuestaCorrecta: pregunta.respuestaCorrecta,
      }));
      // console.log("Datos enviados al backend:", {
      //   titulo,
      //   descripcion,
      //   video: videoID,
      //   contenido,
      //   tipo,
      //   preguntas: preguntasFormateadas,
      // });

      await axios.post("/profeticos", {
        titulo,
        descripcion,
        video: videoID, // Usar solo el ID del video
        contenido,
        tipo,
        preguntas: preguntasFormateadas,
      });
      // Limpiar los campos después de enviar la solicitud
      setTitulo("");
      setDescripcion("");
      setVideo("");
      setContenido("");
      setTipo("");
      setPreguntas([
        { pregunta: "", opciones: ["a", "b", "c", "d"], respuestaCorrecta: "" },
      ]);
      alert("Clase profética creada exitosamente");
    } catch (error) {
      console.error("Error al crear clase profética:", error);
      alert("Error al crear clase profética");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
    <div className="rounded-lg shadow-xl w-full max-w-xl p- bg-gray-100 border-2 translate-x-48">
      <div className="mb-5">
        <button
          onClick={() => navigate("/admin/profetico/")}
          className="bg-blue-500 text-white w-20 h-10 mb-0 font-semibold py-0 px-4 rounded hover:bg-gray-400 transition-transform ease-in-out duration-300 hover:translate-y-1"
        >
          <KeyboardBackspaceIcon />
        </button>
      </div>
      {/* <div className="px-72 py-10"> */}
        <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center">Crear Clase Profética</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2 ml-6"
              htmlFor="titulo"
            >
              Título:
            </label>
            <input
              type="text"
              id="titulo"
              className="border-2 border-gray-300 rounded-md p-2 w-11/12 ml-6"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2 ml-6"
              htmlFor="descripcion"
            >
              Descripción:
            </label>
            <textarea
              id="descripcion"
              className="border-2 border-gray-300 rounded-md p-2 w-11/12 ml-6"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2 ml-6"
              htmlFor="taller"
            >
              Contenido Teorico:
            </label>
            <ReactQuill
              id="contenido"
              value={contenido}
              onChange={setContenido}
              modules={{ toolbar: true }}
              className="border-2 border-gray-300 rounded-md p-2 w-11/12 ml-6 bg-white"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2 ml-6"
              htmlFor="video"
            >
              Video (URL):
            </label>
            <input
              type="text"
              id="video"
              className="border-2 border-gray-300 rounded-md p-2 w-11/12 ml-6"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2 ml-6"
              htmlFor="tipo"
            >
              Tipo:
            </label>
            <select
              id="tipo"
              className="border-2 border-gray-300 rounded-md p-2 w-11/12 ml-6"
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
          {preguntas.map((pregunta, index) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={`pregunta-${index}`}
                className="block text-gray-700 font-bold mb-2 ml-6"
              >
                Pregunta {index + 1}
              </label>
              <input
                type="text"
                id={`pregunta-${index}`}
                name="pregunta"
                className="border-2 border-gray-300 rounded-md p-2 w-11/12 ml-6 mb-2"
                value={pregunta.pregunta}
                onChange={(e) => handleChangePregunta(index, e)}
              />
              {pregunta.opciones.map((opcion, idx) => (
                <input
                  key={idx}
                  type="text"
                  className="border-2 border-gray-300 rounded-md p-2 w-11/12 ml-6 mb-2 "
                  value={opcion}
                  onChange={(e) => handleChangeOpcion(index, idx, e)}
                  placeholder={`Opción ${String.fromCharCode(97 + idx)}`}
                />
              ))}
              <label
                className="block text-gray-700 font-bold  mb-2 ml-6"
                htmlFor={`respuesta-${index}`}
              >
                Respuesta Correcta:
              </label>
              <select
                id={`respuesta-${index}`}
                className="border-2 border-gray-300 rounded-md p-2 w-11/12 ml-6"
                value={pregunta.respuestaCorrecta}
                onChange={(e) => handleChangeRespuesta(index, e)}
              >
                <option value="">Seleccione una respuesta</option>
                {pregunta.opciones.map((opcion, idx) => (
                  <option key={idx} value={String.fromCharCode(97 + idx)}>
                    {String.fromCharCode(97 + idx)}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div className="flex">
            <div className="pr-2 pl-2">
              <button
                type="button"
                onClick={agregarPregunta}
                className="bg-blue-500 font-semibold text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mb-4 ml-6"
              >
                Agregar Pregunta
              </button>
            </div>
            <div className="pr-2 pl-2">
              <button
                type="submit"
                className="bg-blue-500 font-semibold text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ml-0"
              >
                Crear
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default CrearProfeticos;
