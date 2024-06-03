import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NivelClases from "../../NivelClases/NivelClases";

function ModuloDetailsStudent() {
  const { grupoId, moduloId } = useParams();
  const [modulo, setModulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
  const [respuestas, setRespuestas] = useState({});
  const [respuestasUsuario, setRespuestasUsuario] = useState([]);
  const [modulos] = useState([]);
  const [userSub, setUserSub] = useState(null);
  const [quizCompletado, setQuizCompletado] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/usuario/sub", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserSub(response.data.userSub);
        console.log("response:", response);
      } catch (error) {
        console.error("Error al obtener el sub del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchModulo = async () => {
      try {
        const moduloResponse = await axios.get(
          `/grupo/${grupoId}/modulo/${moduloId}/detalles`
        );
        const moduloData = moduloResponse.data.modulo;
        setModulo(moduloData);
        setLoading(false);
        console.log("Modulo data:", moduloData); // Log del módulo completo
        if (moduloData.preguntas) {
          console.log("Preguntas del módulo:", moduloData.preguntas); // Log de las preguntas
        }
      } catch (error) {
        console.error("Error al obtener el módulo:", error);
        setLoading(false);
      }
    };

    fetchModulo();
  }, [grupoId, moduloId]);

  useEffect(() => {
    const fetchRespuestasUsuario = async () => {
      if (userSub) {
        try {
          const response = await axios.get(
            `/resultados/${userSub}/${moduloId}`
          );
          if (response.data.length > 0) {
            const respuestasData = response.data[0].preguntas;
            setRespuestasUsuario(respuestasData);
            const formattedRespuestas = respuestasData.reduce(
              (acc, current, index) => {
                acc[index] = current.respuesta;
                return acc;
              },
              {}
            );
            setRespuestas(formattedRespuestas);
          }
        } catch (error) {
          console.error("Error al obtener las respuestas del usuario:", error);
        }
      }
    };

    fetchRespuestasUsuario();
  }, [userSub, moduloId]);

  const handleAnswerChange = (index, event) => {
    const opcionSeleccionada = event.target.value;
    setRespuestas({
      ...respuestas,
      [index]: opcionSeleccionada,
    });
  };

  const handleSubmitAnswers = async () => {
    try {
      const token = localStorage.getItem("token");
      const preguntasConRespuestas = modulo.preguntas.map(
        (pregunta, index) => ({
          pregunta: pregunta.pregunta,
          respuesta: respuestas[index] || "",
        })
      );
      const response = await axios.post(
        "/modulo/responder",
        {
          userSub: userSub,
          moduloId,
          preguntas: preguntasConRespuestas,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Respuestas enviadas:", response.data);
      setQuizCompletado(todasCorrectas());
    } catch (error) {
      console.error("Error al enviar respuestas:", error);
    }
  };

  const verificarRespuesta = (preguntaIndex, respuesta) => {
    const respuestaCorrecta = modulo.preguntas[preguntaIndex].respuestaCorrecta;
    return respuesta.startsWith(respuestaCorrecta);
  };

  const todasCorrectas = () => {
    return (
      modulo &&
      modulo.preguntas.every((pregunta, index) => {
        const respuestaUsuario = respuestas[index];
        return respuestaUsuario && verificarRespuesta(index, respuestaUsuario);
      })
    );
  };

  const isPreguntaValida = (pregunta) => {
    if (!pregunta || !pregunta.pregunta || !Array.isArray(pregunta.opciones)) {
      return false;
    }
    const opcionesValidas =
      pregunta.opciones.filter((opcion) => opcion.trim() !== "").length > 0;
    return pregunta.pregunta.trim() !== "" && opcionesValidas;
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
    <div className="px-5 py-5">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{modulo.titulo}</h1>
      <p className="text-gray-700 mb-6">{modulo.contenido}</p>

      <nav className="bg-blue-500 p-4 shadow-md border-t-4 border-blue-100 mb-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-white">
            Módulo actual: {modulo.titulo}
          </div>
          <div className="space-x-4">
            {modulos.length > 0 && (
              <Link
                to={`/home/grupo/${grupoId}/modulo/${modulos[0].id}`}
                className="text-white hover:underline"
              >
                {modulos[0].titulo}
              </Link>
            )}
          </div>
        </div>
      </nav>

      <NivelClases moduloId={moduloId} />

      {modulo.preguntas &&
      modulo.preguntas.filter(isPreguntaValida).length > 0 ? (
        <>
          <button
            onClick={() => setMostrarPreguntas(!mostrarPreguntas)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 mt-4 mb-8 block mx-auto"
          >
            {mostrarPreguntas ? "Ocultar preguntas" : "Mostrar preguntas"}
          </button>

          {mostrarPreguntas && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Preguntas:
              </h3>
              {modulo.preguntas
                .filter(isPreguntaValida)
                .map((pregunta, index) => (
                  <div
                    key={index}
                    className="mb-6 p-4 border border-gray-300 rounded-lg"
                  >
                    <p className="text-gray-700 mb-2">
                      {index + 1}: {pregunta.pregunta}
                    </p>
                    <div className="space-y-2">
                      {pregunta.opciones.map((opcion, opcionIndex) => (
                        <div key={opcionIndex} className="flex items-center">
                          <input
                            type="radio"
                            id={`opcion-${index}-${opcionIndex}`}
                            name={`pregunta-${index}`}
                            value={opcion}
                            checked={respuestas[index] === opcion}
                            onChange={(e) => handleAnswerChange(index, e)}
                            className="mr-2"
                          />
                          <label
                            htmlFor={`opcion-${index}-${opcionIndex}`}
                            className="text-gray-600"
                          >
                            {opcion}
                          </label>
                        </div>
                      ))}
                    </div>
                    {quizCompletado && respuestas[index] && (
                      <div
                        className={`mt-2 ${
                          verificarRespuesta(index, respuestas[index])
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {verificarRespuesta(index, respuestas[index])
                          ? "Correcto"
                          : "Incorrecto. Sigue intentado, no te rindas"}
                      </div>
                    )}
                  </div>
                ))}
              <button
                onClick={handleSubmitAnswers}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300"
                disabled={
                  Object.keys(respuestas).length !== modulo.preguntas.length
                }
              >
                Responder
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center mt-4">Este módulo no tiene preguntas.</div>
      )}

      {quizCompletado && (
        <div className="text-center mt-4 text-green-600 text-xl font-semibold">
          ¡Felicitaciones! Has completado el quizz correctamente.
        </div>
      )}
      {!quizCompletado && respuestasUsuario.length > 0 && (
        <div className="text-center mt-4 text-red-600 text-xl font-semibold">
          Algunas respuestas son incorrectas. Inténtalo de nuevo.
        </div>
      )}
    </div>
  );
}

export default ModuloDetailsStudent;