import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import NavAdmin from "../NavAdmin/NavAdmin";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModuloEditAdmin() {
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
    descripcion: "",
    activo: false,
    preguntas: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModulo = async () => {
      const { nivelId, moduloId } = params;
      try {
        const response = await axios.get(`/nivel/${nivelId}/modulo/${moduloId}`);
        const moduloData = response.data;

        const preguntas = moduloData.preguntas
          ? moduloData.preguntas.map((pregunta) => ({
              ...pregunta,
              opciones: pregunta.opciones
                ? pregunta.opciones.map((opcion) =>
                    opcion.replace(/^[a-d]\.\s*/, "")
                  )
                : ["", "", "", ""],
              tipo: pregunta.opciones ? "opcion_multiple" : "verdadero_falso",
            }))
          : [];

        setFormData({
          titulo: moduloData.titulo || "",
          contenido: moduloData.contenido || "",
          descripcion: moduloData.descripcion || "",
          activo: moduloData.activo || false,
          preguntas: preguntas,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el detalle del modulo:", error);
        setError("Se produjo un error al cargar el detalle del modulo.");
        setLoading(false);
      }
    };
    fetchModulo();
  }, [params]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      activo: e.target.checked,
    });
  };

  const handlePreguntasChange = (index, e) => {
    const { name, value } = e.target;
    const newPreguntas = [...formData.preguntas];

    if (name === "pregunta") {
      newPreguntas[index].pregunta = value;
    } else if (name.includes("opcion")) {
      const opcionIndex = Number(name.match(/\d+/)[0]);
      newPreguntas[index].opciones[opcionIndex] = value;
    } else if (name === "respuestaCorrecta") {
      newPreguntas[index].respuestaCorrecta = value;
    } else if (name === "tipo") {
      newPreguntas[index].tipo = value;
      newPreguntas[index].opciones =
        value === "opcion_multiple" ? ["", "", "", ""] : [];
      newPreguntas[index].respuestaCorrecta = "";
    }

    setFormData({
      ...formData,
      preguntas: newPreguntas,
    });
  };

  const agregarPregunta = () => {
    setFormData({
      ...formData,
      preguntas: [
        ...formData.preguntas,
        {
          tipo: "opcion_multiple",
          pregunta: "",
          opciones: ["", "", "", ""],
          respuestaCorrecta: "",
        },
      ],
    });
  };

  const eliminarPregunta = (index) => {
    const newPreguntas = [...formData.preguntas];
    newPreguntas.splice(index, 1);
    setFormData({
      ...formData,
      preguntas: newPreguntas,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nivelId, moduloId } = params;
    try {
      const preguntasFormateadas = formData.preguntas.map((pregunta) => ({
        tipo: pregunta.tipo,
        pregunta: pregunta.pregunta,
        opciones:
          pregunta.tipo === "opcion_multiple"
            ? pregunta.opciones.map((opcion, idx) => `${String.fromCharCode(97 + idx)}. ${opcion}`)
            : undefined,
        respuestaCorrecta: pregunta.respuestaCorrecta,
      }));

      await axios.put(`/nivel/${nivelId}/modulo/${moduloId}`, {
        ...formData,
        preguntas: preguntasFormateadas,
      });
      toast.success("Módulo actualizado exitosamente!", {
        position: "bottom-center",
        autoClose: 1500,
        closeOnClick: true,
        theme: "colored",
      });

      setTimeout(() => {
        navigate(`/nivel/${nivelId}/modulo/${moduloId}`);
      }, 1800);
    } catch (error) {
      console.error("Error al actualizar el modulo:", error);
      toast.error("Error al actualizar el modulo.", {
        position: "bottom-center",
        autoClose: 1500,
        closeOnClick: true,
        theme: "colored",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-xl font-semibold text-blue-600">
          Cargando...
        </span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">Error: {error}</div>;
  }

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Editar Módulo
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="titulo"
                className="block text-sm font-medium text-gray-700"
              >
                Título
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="contenido"
                className="block text-sm font-medium text-gray-700"
              >
                Contenido
              </label>
              <textarea
                id="contenido"
                name="contenido"
                value={formData.contenido}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                rows="6"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md w-full"
                rows="3"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="activo"
                className="block text-sm font-medium text-gray-700"
              >
                Activo
              </label>
              <input
                type="checkbox"
                id="activo"
                name="activo"
                checked={formData.activo}
                onChange={handleCheckboxChange}
                className="mt-1"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Preguntas
              </label>
              {formData.preguntas.map((pregunta, index) => (
                <div key={index} className="mb-6 border p-4 rounded-lg relative">
                  <button
                    type="button"
                    onClick={() => eliminarPregunta(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <FaTrashAlt />
                  </button>
                  <label
                    htmlFor={`pregunta-${index}`}
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Pregunta {index + 1}
                  </label>
                  <select
                    name="tipo"
                    value={pregunta.tipo}
                    onChange={(e) => handlePreguntasChange(index, e)}
                    className="mb-2 border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                  >
                    <option value="opcion_multiple">Opción Múltiple</option>
                    <option value="verdadero_falso">Verdadero/Falso</option>
                  </select>
                  <textarea
                    id={`pregunta-${index}`}
                    name="pregunta"
                    value={pregunta.pregunta}
                    onChange={(e) => handlePreguntasChange(index, e)}
                    className="border p-2 rounded-md w-full mb-2"
                    rows="3"
                    required
                  />
                  {pregunta.tipo === "opcion_multiple" &&
                    pregunta.opciones.map((opcion, opcionIndex) => (
                      <div key={opcionIndex} className="mb-2">
                        <label
                          htmlFor={`opcion-${index}-${opcionIndex}`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Opción {String.fromCharCode(97 + opcionIndex)}
                        </label>
                        <input
                          type="text"
                          id={`opcion-${index}-${opcionIndex}`}
                          name={`opcion-${opcionIndex}`}
                          value={opcion}
                          onChange={(e) => handlePreguntasChange(index, e)}
                          className="mt-1 p-2 border rounded-md w-full"
                          required
                        />
                      </div>
                    ))}
                  <div className="mb-4">
                    <label
                      htmlFor={`respuestaCorrecta-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Respuesta Correcta
                    </label>
                    {pregunta.tipo === "opcion_multiple" ? (
                      <select
                        id={`respuestaCorrecta-${index}`}
                        name="respuestaCorrecta"
                        value={pregunta.respuestaCorrecta}
                        onChange={(e) => handlePreguntasChange(index, e)}
                        className="mt-1 p-2 border rounded-md w-full"
                        required
                      >
                        {pregunta.opciones.map((_, opcionIndex) => (
                          <option key={opcionIndex} value={String.fromCharCode(97 + opcionIndex)}>
                            Opción {String.fromCharCode(97 + opcionIndex)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <select
                        id={`respuestaCorrecta-${index}`}
                        name="respuestaCorrecta"
                        value={pregunta.respuestaCorrecta}
                        onChange={(e) => handlePreguntasChange(index, e)}
                        className="mt-1 p-2 border rounded-md w-full"
                        required
                      >
                        <option value="verdadero">Verdadero</option>
                        <option value="falso">Falso</option>
                      </select>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={agregarPregunta}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Agregar Pregunta
              </button>
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
            >
              Guardar Cambios
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default ModuloEditAdmin;