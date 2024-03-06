// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

export default function ProfeticoEdit() {
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [video, setVideo] = useState("");
  const [contenido, setContenido] = useState("");
  const [tipo, setTipo] = useState("");
  const [preguntas, setPreguntas] = useState([
    { pregunta: "", opciones: ["a", "b", "c", "d"], respuestaCorrecta: "" },
  ]);

  useEffect(() => {
    async function fetchProfetico() {
      try {
        const response = await axios.get(`/profeticos/${id}`);
        const profetico = response.data;

        setTitulo(profetico.titulo);
        setDescripcion(profetico.descripcion);
        setVideo(profetico.video);
        setContenido(profetico.contenido);
        setTipo(profetico.tipo);
        setPreguntas(profetico.preguntas);
      } catch (error) {
        console.error("Error al obtener el profético:", error);
      }
    }

    fetchProfetico();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`/profeticos/${id}`, {
        titulo,
        descripcion,
        video,
        contenido,
        tipo,
        preguntas,
      });

      alert("Profético actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el profético:", error);
      alert("Error al actualizar el profético");
    }
  };

  const handleChangePregunta = (index, event) => {
    const newPreguntas = [...preguntas];
    newPreguntas[index].pregunta = event.target.value;
    setPreguntas(newPreguntas);
  };

  const handleChangeOpcion = (preguntaIndex, opcionIndex, event) => {
    const newPreguntas = [...preguntas];
    newPreguntas[preguntaIndex].opciones[opcionIndex] = event.target.value;
    setPreguntas(newPreguntas);
  };

  const handleChangeRespuestaCorrecta = (index, event) => {
    const newPreguntas = [...preguntas];
    newPreguntas[index].respuestaCorrecta = event.target.value;
    setPreguntas(newPreguntas);
  };

  const handleAddPregunta = () => {
    setPreguntas([
      ...preguntas,
      { pregunta: "", opciones: ["", "", "", ""], respuestaCorrecta: "" },
    ]);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Editar Profético</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="titulo"
          >
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
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="descripcion"
          >
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
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="taller"
          >
            Contenido Teorico:
          </label>
          <ReactQuill
            id="contenido"
            value={contenido}
            onChange={setContenido}
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
        {preguntas.map((pregunta, index) => (
          <div key={index} className="mb-4">
            <label
              htmlFor={`pregunta-${index}`}
              className="block text-gray-700 font-bold mb-2"
            >
              Pregunta {index + 1}
            </label>
            <input
              type="text"
              id={`pregunta-${index}`}
              name="pregunta"
              className="border-2 border-gray-300 rounded-md p-2 w-full mb-2"
              value={pregunta.pregunta}
              onChange={(e) => handleChangePregunta(index, e)}
            />
            {pregunta.opciones.map((opcion, idx) => (
              <input
                key={idx}
                type="text"
                className="border-2 border-gray-300 rounded-md p-2 w-full mb-2"
                value={opcion}
                onChange={(e) => handleChangeOpcion(index, idx, e)}
                placeholder={`Opción ${String.fromCharCode(97 + idx)}`}
              />
            ))}
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor={`respuestaCorrecta-${index}`}
            >
              Respuesta Correcta
            </label>
            <select
              id={`respuestaCorrecta-${index}`}
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              value={pregunta.respuestaCorrecta}
              onChange={(e) => handleChangeRespuestaCorrecta(index, e)}
              required
            >
              <option value="">Seleccionar respuesta correcta</option>
              {pregunta.opciones.map((opcion, idx) => (
                <option key={idx} value={opcion}>
                  Opción {String.fromCharCode(97 + idx)}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-4"
          onClick={handleAddPregunta}
        >
          Agregar Pregunta
        </button>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

ProfeticoEdit.propTypes = {
  id: PropTypes.string.isRequired,
};
