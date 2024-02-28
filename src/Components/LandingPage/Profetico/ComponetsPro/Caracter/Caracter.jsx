// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Caracter() {
  const [profeticos, setProfeticos] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);

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
    setFeedback({});
    setSelectedOption({});
  };

  const handleOptionSelect = (preguntaIndex, opcion) => {
    setSelectedOption({ ...selectedOption, [preguntaIndex]: opcion });
  };

  const handleSubmitAnswer = (profetico, preguntaIndex) => {
    const respuestaCorrecta =
      profetico.preguntas[preguntaIndex].respuestaCorrecta;
    const opcionSeleccionada = selectedOption[preguntaIndex];

    // Convertir la respuesta seleccionada al formato de letra ('a', 'b', 'c', 'd')
    const opcionSeleccionadaLetra = String.fromCharCode(
      97 +
        profetico.preguntas[preguntaIndex].opciones.indexOf(opcionSeleccionada)
    );

    if (opcionSeleccionadaLetra === respuestaCorrecta) {
      setFeedback({ ...feedback, [preguntaIndex]: "¡Respuesta correcta!" });
    } else {
      setFeedback({
        ...feedback,
        [preguntaIndex]: "Respuesta incorrecta. ¡Inténtalo de nuevo!",
      });
    }
  };

  // Filtrar los proféticos con el tipo "Caracter"
  const caracterProfeticos = profeticos.filter(
    (profetico) => profetico.tipo === "Caracter"
  );

  return (
    <div className="container mx-auto mt-10 pb-5 pt-5 justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Formando Carácter</h1>
      </div>
      <div>
        {caracterProfeticos.map((profetico, index) => (
          <div
            key={profetico.id}
            className="bg-gray-200 bg-opacity-70 p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 mx-auto w-full"
            style={{ maxWidth: "500px", marginBottom: "20px" }}
          >
            <div className="cursor-pointer" onClick={() => toggleExpand(index)}>
              <h2 className="text-lg font-bold mb-2">{profetico.titulo}</h2>
              <p
                className="text-gray-700 mb-4 overflow-hidden"
                style={{ maxHeight: expandedCard === index ? "none" : "3rem" }}
              >
                {profetico.descripcion}
              </p>
            </div>
            {expandedCard === index && (
              <>
                {profetico.video && (
                  <div className="relative" style={{ paddingBottom: "56.25%" }}>
                    {/* 16:9 aspect ratio */}
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
                    <h3 className="font-bold text-lg">Contenido:</h3>{" "}
                    {/* Cambiado de 'Taller' a 'Contenido' */}
                    <div
                      dangerouslySetInnerHTML={{ __html: profetico.contenido }}
                    />
                  </div>
                )}
                {profetico.preguntas && (
                  <div className="mt-4">
                    <h3 className="font-bold text-lg">Preguntas:</h3>
                    {profetico.preguntas.map((pregunta, preguntaIndex) => (
                      <div key={preguntaIndex}>
                        <p>{pregunta.pregunta}</p>
                        <ul>
                          {pregunta.opciones.map((opcion, opcionIndex) => (
                            <li key={opcionIndex}>
                              <label>
                                <input
                                  type="radio"
                                  name={`pregunta${preguntaIndex}`}
                                  value={opcion}
                                  checked={
                                    selectedOption[preguntaIndex] === opcion
                                  }
                                  onChange={() =>
                                    handleOptionSelect(preguntaIndex, opcion)
                                  }
                                />
                                {String.fromCharCode(65 + opcionIndex)}.{" "}
                                {opcion}
                              </label>
                            </li>
                          ))}
                        </ul>
                        {feedback[preguntaIndex] && (
                          <p>{feedback[preguntaIndex]}</p>
                        )}
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                          onClick={() =>
                            handleSubmitAnswer(profetico, preguntaIndex)
                          }
                        >
                          Enviar respuesta
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
