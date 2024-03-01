// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Caracter() {
  const [profeticos, setProfeticos] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [completedWorkshops, setCompletedWorkshops] = useState([]);

  useEffect(() => {
    async function fetchProfeticos() {
      try {
        const response = await axios.get("/profeticos");
        setProfeticos(response.data);
      } catch (error) {
        console.error("Error al obtener los proféticos:", error);
      }
    }

    fetchProfeticos();
  }, []);

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleOptionSelect = (profeticoId, preguntaIndex, opcion) => {
    setSelectedOptions({
      ...selectedOptions,
      [profeticoId]: {
        ...selectedOptions[profeticoId],
        [preguntaIndex]: opcion,
      },
    });
  };

  const handleSubmitAnswer = (profeticoId, preguntaIndex) => {
    const profetico = profeticos.find((item) => item.id === profeticoId);
    const pregunta = profetico.preguntas[preguntaIndex];
    if (!pregunta) return; // No se muestra si no hay pregunta

    const respuestaCorrecta = pregunta.respuestaCorrecta;
    const opcionSeleccionada = selectedOptions[profeticoId][preguntaIndex];

    if (!opcionSeleccionada) return; // No se muestra si no hay opción seleccionada

    const opcionSeleccionadaLetra = String.fromCharCode(
      97 + pregunta.opciones.indexOf(opcionSeleccionada)
    );

    if (opcionSeleccionadaLetra === respuestaCorrecta) {
      setFeedbacks({
        ...feedbacks,
        [profeticoId]: {
          ...feedbacks[profeticoId],
          [preguntaIndex]: (
            <span style={{ color: "green" }}>¡Respuesta correcta!</span>
          ),
        },
      });
      if (allQuestionsAnswered(profeticoId)) {
        setCompletedWorkshops([...completedWorkshops, profeticoId]);
      }
    } else {
      setFeedbacks({
        ...feedbacks,
        [profeticoId]: {
          ...feedbacks[profeticoId],
          [preguntaIndex]: (
            <span style={{ color: "red" }}>
              Respuesta incorrecta. ¡Inténtalo de nuevo!
            </span>
          ),
        },
      });
    }
  };

  const handleTryAgain = (profeticoId, preguntaIndex) => {
    setFeedbacks({
      ...feedbacks,
      [profeticoId]: {
        ...feedbacks[profeticoId],
        [preguntaIndex]: null,
      },
    });
    setSelectedOptions({
      ...selectedOptions,
      [profeticoId]: {
        ...selectedOptions[profeticoId],
        [preguntaIndex]: null,
      },
    });
    setCompletedWorkshops(
      completedWorkshops.filter((id) => id !== profeticoId)
    );
  };

  const allQuestionsAnswered = (profeticoId) => {
    const profetico = profeticos.find((item) => item.id === profeticoId);
    return profetico.preguntas.every(
      (pregunta, index) => selectedOptions[profeticoId]?.[index]
    );
  };

  // Filtrar los proféticos con el tipo "Historia"
  const historiaProfeticos = profeticos.filter(
    (profetico) => profetico.tipo === "Historia"
  );

  return (
    <div className="container mx-auto mt-10 pb-5 pt-5 justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Historia Profética</h1>
      </div>
      <div>
        {historiaProfeticos.map((profetico, index) => (
          <div
            key={profetico.id}
            className="bg-gray-100 p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 mx-auto w-full"
            style={{ maxWidth: "500px", marginBottom: "20px" }}
          >
            <div className="cursor-pointer" onClick={() => toggleExpand(index)}>
              <h2 className="text-lg font-bold mb-2 text-gray-800">
                {profetico.titulo}
              </h2>
              <p
                className="text-gray-600 mb-4 overflow-hidden"
                style={{ maxHeight: expandedCard === index ? "none" : "3rem" }}
              >
                {profetico.descripcion}
              </p>
            </div>
            {expandedCard === index && (
              <>
                {profetico.video && (
                  <div className="relative" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      title={profetico.titulo}
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src={`https://www.youtube.com/embed/${profetico.video}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {profetico.contenido && (
                  <div className="mt-4">
                    <h3 className="font-bold text-lg text-gray-800">
                      Contenido:
                    </h3>
                    <div
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: profetico.contenido }}
                    />
                  </div>
                )}
                {completedWorkshops.includes(profetico.id) ? (
                  <p className="text-green-600 font-bold mt-4">
                    ¡Taller finalizado! ¡Felicidades!
                  </p>
                ) : (
                  <>
                    {profetico.preguntas.length > 0 && (
                      <>
                        {profetico.preguntas.map((pregunta, preguntaIndex) => (
                          <div key={preguntaIndex}>
                            {pregunta.pregunta && (
                              <>
                                <p className="text-lg font-bold mb-2 text-gray-800">
                                  {pregunta.pregunta}
                                </p>
                                <ul className="list-disc pl-8 mb-4">
                                  {pregunta.opciones.map(
                                    (opcion, opcionIndex) => (
                                      <li
                                        key={opcionIndex}
                                        className="pl-2 pr-2"
                                      >
                                        <label className="inline-flex items-center text-gray-800">
                                          <input
                                            type="radio"
                                            name={`pregunta${preguntaIndex}`}
                                            value={opcion}
                                            checked={
                                              selectedOptions[profetico.id]?.[
                                                preguntaIndex
                                              ] === opcion
                                            }
                                            onChange={() =>
                                              handleOptionSelect(
                                                profetico.id,
                                                preguntaIndex,
                                                opcion
                                              )
                                            }
                                          />
                                          <span className="ml-2">
                                            {opcion.substr(0)}
                                          </span>
                                        </label>
                                      </li>
                                    )
                                  )}
                                </ul>
                                {feedbacks[profetico.id]?.[preguntaIndex] && (
                                  <p className="text-sm text-red-600">
                                    {feedbacks[profetico.id][preguntaIndex]}
                                  </p>
                                )}
                                <div>
                                  <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4 transition duration-300"
                                    onClick={() =>
                                      handleSubmitAnswer(
                                        profetico.id,
                                        preguntaIndex
                                      )
                                    }
                                    disabled={
                                      !!feedbacks[profetico.id]?.[preguntaIndex]
                                    }
                                  >
                                    Responder
                                  </button>
                                  {feedbacks[profetico.id]?.[preguntaIndex] && (
                                    <button
                                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300"
                                      onClick={() =>
                                        handleTryAgain(
                                          profetico.id,
                                          preguntaIndex
                                        )
                                      }
                                    >
                                      Intentar de Nuevo
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}