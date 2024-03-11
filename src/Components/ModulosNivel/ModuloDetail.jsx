// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NivelClases from "../NivelClases/NivelClases";

function ModuloDetail() {
  const { nivelId, moduloId } = useParams();
  const [modulo, setModulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
  const [respuestas, setRespuestas] = useState({});
  const [completedModules, setCompletedModules] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [modulos, setModulos] = useState([]);

  useEffect(() => {
    const fetchModulo = async () => {
      try {
        const [moduloResponse, modulosResponse] = await Promise.all([
          axios.get(`/nivel/${nivelId}/modulo/${moduloId}`),
          axios.get(`/niveles/${nivelId}/modulos`),
        ]);
        const moduloData = moduloResponse.data;
        moduloData.preguntas = JSON.parse(moduloData.preguntas);
        setModulo(moduloData);
        setModulos(modulosResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el módulo:", error);
        setLoading(false);
      }
    };

    fetchModulo();
  }, [nivelId, moduloId]);

  const handleAnswerChange = (index, event) => {
    setRespuestas({
      ...respuestas,
      [index]: event.target.value,
    });
  };

  const handleSubmitAnswers = () => {
    const correctAnswers = modulo.preguntas.map(
      (pregunta) => pregunta.respuestaCorrecta
    );
    const userAnswers = Object.values(respuestas);
    const feedback = {};
    userAnswers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        feedback[index] = "¡Respuesta correcta!";
      } else {
        feedback[index] = "Respuesta incorrecta. ¡Inténtalo de nuevo!";
      }
    });
    setFeedbacks(feedback);
    const isModuleCompleted = correctAnswers.every(
      (answer, index) => userAnswers[index] === answer
    );
    if (isModuleCompleted) {
      setCompletedModules([...completedModules, moduloId]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-xl font-semibold text-gray-900">
          Cargando...
        </span>
      </div>
    );
  }

  if (!modulo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-500 p-4 rounded-lg shadow-lg">
          <span className="text-white font-semibold">
            No se encontró el módulo.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-5/6">
      <h1 className="text-2xl font-semibold mb-4">{modulo.titulo}</h1>
      <p className="text-gray-700 mb-4">{modulo.descripcion}</p>

      <div>
        <nav className="bg-white w-full p-4 shadow-md border-t-4 border-blue-500 mb-2">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">
              Módulo actual: {modulo.titulo}
            </div>
            <div className="space-x-4 flex">
              {modulos.map((mod, index) => (
                <div key={mod.id} className="flex">
                  {index < modulos.length - 1 ? (
                    <Link
                      to={`/home/nivel/${nivelId}/modulo/${
                        modulos[index + 1].id
                      }`}
                      className="text-blue-500 hover:underline"
                    >
                      {modulos[index + 1].titulo}
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </nav>
        <div>
          <NivelClases moduloId={moduloId} />
        </div>
        <button
          onClick={() => setMostrarPreguntas(!mostrarPreguntas)}
          className="text-blue-500 underline mt-4 mb-8 block"
        >
          {mostrarPreguntas ? "Ocultar preguntas" : "Mostrar preguntas"}
        </button>
        {mostrarPreguntas && (
          <>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Preguntas:</h3>
            {Array.isArray(modulo.preguntas) && modulo.preguntas.length > 0 ? (
              <>
                {modulo.preguntas.map((pregunta, index) => (
                  <div key={index} className="mb-8">
                    <p className="text-gray-700 mb-2">
                      Pregunta {index + 1}: {pregunta.pregunta}
                    </p>
                    <div className="flex flex-wrap">
                      {pregunta.opciones.map((opcion, opcionIndex) => (
                        <div key={opcionIndex} className="mr-4 mb-2">
                          <input
                            type="radio"
                            id={`opcion-${index}-${opcionIndex}`}
                            name={`pregunta-${index}`}
                            value={opcion}
                            onChange={(e) => handleAnswerChange(index, e)}
                          />
                          <label
                            htmlFor={`opcion-${index}-${opcionIndex}`}
                            className="ml-2"
                          >
                            {opcion}
                          </label>
                        </div>
                      ))}
                    </div>
                    {feedbacks[index] && (
                      <p
                        className={
                          feedbacks[index].includes("correcta")
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {feedbacks[index]}
                      </p>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleSubmitAnswers}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300"
                >
                  Enviar Respuestas
                </button>
              </>
            ) : (
              <div className="text-center mt-4">
                No se encontraron preguntas para este módulo.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ModuloDetail;
