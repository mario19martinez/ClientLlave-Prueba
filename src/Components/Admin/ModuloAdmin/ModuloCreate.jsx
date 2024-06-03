import { useState } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function ModuloCreate({ nivelId, closeModalAndReload }) {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [preguntas, setPreguntas] = useState([
    { pregunta: "", opciones: ["a", "b", "c", "d"], respuestaCorrecta: "" },
  ]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const respuestaSeleccionada = preguntas.every(
    //   (pregunta) => pregunta.respuestaCorrecta !== ""
    // );
    // if (!respuestaSeleccionada) {
    //   alert("Por favor, selecciona una respuesta correcta para cada pregunta.");
    // }
    try {
      const preguntasFormateadas = preguntas.map((pregunta) => ({
        pregunta: pregunta.pregunta,
        opciones: pregunta.opciones,
        respuestaCorrecta: pregunta.respuestaCorrecta,
      }));

      const response = await axios.post(`/nivel/${nivelId}/modulo`, {
        titulo,
        contenido,
        descripcion,
        preguntas: preguntasFormateadas,
      });

      setTitulo("");
      setContenido("");
      setDescripcion("");
      setPreguntas([
        { pregunta: "", opciones: ["a", "b", "c", "d"], respuestaCorrecta: "" },
      ]);
      console.log(response.data);
      toast.success("Modulo creado exitosamente!", {
        position: "bottom-center",
        autoClose: 1500,
        closeOnClick: true,
        theme: "colored",
      });

      setTimeout(() => {
        closeModalAndReload();
      }, 1800);
    } catch (error) {
      console.error("Error al crear el modulo:", error.response.data.error);
      alert("Error al crear el modulo");
    }
  };

  return (
    <div className="bg-blue-500 p-2 rounded-md shadow-md max-w-lg h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-100 ms-4">
        Agregar Modulo
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 rounded-lg shadow-lg h-full"
      >
        <div className="mb-2">
          <label htmlFor="" className="block text-gray-100 font-semibold mb-2">
            Titulo:
          </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Ingrese el título del módulo"
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="" className="block text-gray-100 font-semibold mb-2">
            Contenido:
          </label>
          <textarea
            id="contenido"
            value={contenido}
            className="border-2 border-gray-400 rounded-md p-2 w-full h-40 resize-none focus:outline-none focus:border-blue-500"
            placeholder="Ingrese el contenido del módulo"
            onChange={(e) => setContenido(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-2">
          <label htmlFor="" className="font-semibold text-gray-100">
            Descripción:
          </label>
          <input
            type="text"
            value={descripcion}
            className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Ingrese la descripción del módulo"
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        {preguntas.map((pregunta, index) => (
          <div key={index} className="mb-2">
            <label
              htmlFor={`pregunta-${index}`}
              className="block text-gray-100 font-semibold mb-2"
            >
              Pregunta {index + 1}
            </label>
            <input
              type="text"
              id={`pregunta-${index}`}
              name="pregunta"
              className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
              value={pregunta.pregunta}
              placeholder={`Ingrese la pregunta ${index + 1}`}
              onChange={(e) => handleChangePregunta(index, e)}
            />
            {pregunta.opciones.map((opcion, idx) => (
              <input
                key={idx}
                type="text"
                className="border-2 border-gray-400 rounded-md p-2 w-full mt-2 focus:outline-none focus:border-blue-500"
                value={opcion}
                onChange={(e) => handleChangeOpcion(index, idx, e)}
                placeholder={`Opción ${String.fromCharCode(97 + idx)}`}
              />
            ))}
            <label
              className="block text-gray-100 font-semibold  mb-2"
              htmlFor={`respuesta-${index}`}
            >
              Respuesta Correcta:
            </label>
            <select
              id={`respuesta-${index}`}
              className="border-2 border-gray-400 rounded-md p-2 w-full mt-2 focus:outline-none focus:border-blue-500"
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
        <button
          type="button"
          onClick={agregarPregunta}
          className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mb-4 font-semibold"
        >
          Agregar Pregunta
        </button>
        <button
          type="submit"
          className="bg-blue-900 text-white py-2 px-4 ms-8 rounded hover:bg-blue-600 transition duration-300 mr-4 font-semibold"
        >
          Crear
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

ModuloCreate.propTypes = {
  nivelId: PropTypes.string.isRequired,
  closeModalAndReload: PropTypes.func.isRequired,
};

export default ModuloCreate;
