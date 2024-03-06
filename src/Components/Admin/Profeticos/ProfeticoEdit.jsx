// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

export default function ProfeticoEdit() {
  const { id } = useParams();
  const [profeticoData, setProfeticoData] = useState({
    titulo: "",
    descripcion: "",
    video: "",
    contenido: "",
    tipo: "",
    preguntas: [{ pregunta: "", opciones: ["", "", "", ""], respuestaCorrecta: "" }],
  });

  useEffect(() => {
    async function fetchProfetico() {
      try {
        const response = await axios.get(`/profeticos/${id}`);
        const profetico = response.data;
        setProfeticoData(profetico);
      } catch (error) {
        console.error("Error al obtener el profético:", error);
      }
    }

    fetchProfetico();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfeticoData({
      ...profeticoData,
      [name]: value,
    });
  };

  const handlePreguntaChange = (index, event) => {
    const newPreguntas = [...profeticoData.preguntas];
    newPreguntas[index].pregunta = event.target.value;
    setProfeticoData({
      ...profeticoData,
      preguntas: newPreguntas,
    });
  };

  const handleOpcionChange = (preguntaIndex, opcionIndex, event) => {
    const newPreguntas = [...profeticoData.preguntas];
    newPreguntas[preguntaIndex].opciones[opcionIndex] = event.target.value;
    setProfeticoData({
      ...profeticoData,
      preguntas: newPreguntas,
    });
  };

  const handleRespuestaCorrectaChange = (index, event) => {
    const newPreguntas = [...profeticoData.preguntas];
    newPreguntas[index].respuestaCorrecta = event.target.value;
    setProfeticoData({
      ...profeticoData,
      preguntas: newPreguntas,
    });
  };

  const handleAddPregunta = () => {
    setProfeticoData({
      ...profeticoData,
      preguntas: [
        ...profeticoData.preguntas,
        { pregunta: "", opciones: ["", "", "", ""], respuestaCorrecta: "" },
      ],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`/profeticos/${id}`, profeticoData);
      alert("Profético actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el profético:", error);
      alert("Error al actualizar el profético");
    }
  };

  return (
    <div className="py-20 px-52">
      <h1 className="text-3xl font-bold mb-4">Editar Profético</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="titulo">
            Título:
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            value={profeticoData.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="descripcion">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            value={profeticoData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="contenido">
            Contenido Teórico:
          </label>
          <ReactQuill
            id="contenido"
            value={profeticoData.contenido}
            onChange={(content) => setProfeticoData({ ...profeticoData, contenido: content })}
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
            name="video"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            value={profeticoData.video}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="tipo">
            Tipo:
          </label>
          <select
            id="tipo"
            name="tipo"
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            value={profeticoData.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar tipo</option>
            <option value="Caracter">Carácter probado y aprobado</option>
            <option value="Doctrina">Doctrina de demonios</option>
            <option value="Llamamiento">Llamamiento y asignación</option>
            <option value="Historia">Historia Profética</option>
          </select>
        </div>
        {profeticoData.preguntas.map((pregunta, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={`pregunta-${index}`} className="block text-gray-700 font-bold mb-2">
              Pregunta {index + 1}
            </label>
            <input
              type="text"
              id={`pregunta-${index}`}
              name={`pregunta-${index}`}
              className="border-2 border-gray-300 rounded-md p-2 w-full mb-2"
              value={pregunta.pregunta}
              onChange={(e) => handlePreguntaChange(index, e)}
            />
            {pregunta.opciones.map((opcion, idx) => (
              <input
                key={idx}
                type="text"
                className="border-2 border-gray-300 rounded-md p-2 w-full mb-2"
                value={opcion}
                onChange={(e) => handleOpcionChange(index, idx, e)}
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
              name={`respuestaCorrecta-${index}`}
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              value={pregunta.respuestaCorrecta}
              onChange={(e) => handleRespuestaCorrectaChange(index, e)}
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