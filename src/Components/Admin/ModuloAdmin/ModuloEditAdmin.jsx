import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ModuloEditAdmin() {
  const { nivelId, moduloId } = useParams();
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
        try {
          const response = await axios.get(`/nivel/${nivelId}/modulo/${moduloId}`);
          const moduloData = response.data;
          console.log("preguntas:", moduloData.preguntas);
          setFormData({
            titulo: moduloData.titulo,
            contenido: moduloData.contenido,
            descripcion: moduloData.descripcion,
            activo: moduloData.activo,
            preguntas: moduloData.preguntas,
          });
          setLoading(false);
        } catch (error) {
          console.error("Error al obtener el detalle del modulo:", error);
          setError("Produjo un error al cargar el detalle del modulo.");
          setLoading(false);
        }
      };
    fetchModulo();
  }, [nivelId, moduloId]);

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
    }

    setFormData({
      ...formData,
      preguntas: newPreguntas,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/nivel/${nivelId}/modulo/${moduloId}`, formData);
      navigate(`/nivel/${nivelId}/modulo/${moduloId}`);
    } catch (error) {
      console.error("Error al actualizar el modulo:", error);
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
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Editar Módulo</h2>
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
            <div key={index} className="mb-6">
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
                className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                value={pregunta.pregunta}
                placeholder={`Ingrese la pregunta ${index + 1}`}
                onChange={(e) => handlePreguntasChange(index, e)}
                required
              />
              {pregunta.opciones.map((opcion, idx) => (
                <input
                key={idx}
                type="text"
                className="border-2 border-gray-400 rounded-md p-2 w-full mt-2 focus:outline-none focus:border-blue-500"
                value={opcion}
                onChange={(e) =>
                  handlePreguntasChange(index, {
                    target: {
                      name: `opciones.${idx}`,
                      value: e.target.value,
                    },
                  })
                }
                placeholder={`Opción ${String.fromCharCode(97 + idx)}`}
                required
              />
              ))}
              <label
                className="block text-gray-700 font-bold  mb-2"
                htmlFor={`respuesta-${index}`}
              >
                Respuesta Correcta:
              </label>
              <select
                id={`respuesta-${index}`}
                className="border-2 border-gray-400 rounded-md p-2 w-full mt-2 focus:outline-none focus:border-blue-500"
                value={pregunta.respuestaCorrecta}
                onChange={(e) =>
                  handlePreguntasChange(index, {
                    target: {
                      name: "respuestaCorrecta",
                      value: e.target.value,
                    },
                  })
                }
                required
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
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModuloEditAdmin;
