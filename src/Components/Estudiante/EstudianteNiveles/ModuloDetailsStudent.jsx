import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NivelClases from "../../NivelClases/NivelClases";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "react-modal";

function ModuloDetailsStudent() {
  const { nivelId, grupoId, moduloId } = useParams();
  const [modulo, setModulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
  const [respuestas, setRespuestas] = useState({});
  const [respuestasUsuario, setRespuestasUsuario] = useState([]);
  const [modulos] = useState([]);
  const [userSub, setUserSub] = useState(null);
  const [quizCompletado, setQuizCompletado] = useState(false);
  const [progresos, setProgresos] = useState({});
  const [showModal, setShowModal] = useState(false);

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
          `/nivel/${nivelId}/grupo/${grupoId}/modulo/${moduloId}/detalles`
        );
        setModulo(moduloResponse.data.modulo);
      } catch (error) {
        console.error("Error al obtener el módulo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModulo();
  }, [grupoId, moduloId, nivelId]);

  useEffect(() => {
    const fetchProgresos = async () => {
      if (userSub && modulo) {
        try {
          const responseClases = await axios.get(`/modulo/${moduloId}/clases`);
          const clases = responseClases.data.filter(
            (clase) => clase.url && clase.url.trim() !== ""
          );
          const responseProgresos = await axios.get("/registro-actividad", {
            params: { userSub, moduloId },
          });
          const progresos = responseProgresos.data;

          const progresoPorClase = clases.reduce((acc, clase) => {
            acc[clase.id] = progresos[clase.id] || 0;
            return acc;
          }, {});

          setProgresos(progresoPorClase);
        } catch (error) {
          console.error("Error al obtener los progresos:", error);
        }
      }
    };

    fetchProgresos();
  }, [userSub, moduloId, modulo]);

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
          tipo: pregunta.tipo,
        })
      );

      const aprobado = todasCorrectas();
      const response = await axios.post(
        "/modulo/responder",
        {
          userSub: userSub,
          moduloId,
          preguntas: preguntasConRespuestas,
          aprobado,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Respuestas enviadas:", response.data);
      setQuizCompletado(aprobado);

      // Verificar respuestas incorrectas y notificar al usuario
      const incorrectas = preguntasConRespuestas
        .map((pregunta, index) => ({
          index,
          pregunta: pregunta.pregunta,
          esIncorrecta: !verificarRespuesta(index, respuestas[index]),
        }))
        .filter(({ esIncorrecta }) => esIncorrecta);

      if (incorrectas.length > 0) {
        alert(
          `Respuestas incorrectas. Por favor, verifique las siguientes preguntas: ${incorrectas
            .map(({ index }) => `número ${index + 1}`)
            .join(", ")}`
        );
      }
    } catch (error) {
      console.error("Error al enviar respuestas:", error);
    }
  };

  const verificarRespuesta = (preguntaIndex, respuesta) => {
    const pregunta = modulo.preguntas[preguntaIndex];

    if (pregunta.tipo === "opcion_multiple") {
      return respuesta.startsWith(pregunta.respuestaCorrecta);
    } else if (pregunta.tipo === "verdadero_falso") {
      return respuesta === pregunta.respuestaCorrecta;
    }

    return false; // Si no es un tipo válido, retornar falso
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
    if (!pregunta || !pregunta.pregunta) {
      return false;
    }
    if (
      pregunta.tipo === "opcion_multiple" &&
      !Array.isArray(pregunta.opciones)
    ) {
      return false;
    }
    const opcionesValidas =
      pregunta.tipo === "opcion_multiple"
        ? pregunta.opciones.filter((opcion) => opcion.trim() !== "").length > 0
        : true;
    return pregunta.pregunta.trim() !== "" && opcionesValidas;
  };

  const checkAllClassesCompleted = () => {
    return Object.values(progresos).every((progreso) => progreso >= 80);
  };

  const toggleMostrarPreguntas = () => {
    if (loading) {
      setShowModal(true);
    } else if (!checkAllClassesCompleted()) {
      setShowModal(true);
    } else {
      setMostrarPreguntas(!mostrarPreguntas);
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

  const tituloModulo = /^\d{2}/.test(modulo.titulo)
    ? modulo.titulo.substring(2)
    : modulo.titulo;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{tituloModulo}</h1>
      <p className="text-gray-700 mb-6">{modulo.contenido}</p>

      <nav className="bg-blue-500 p-4 shadow-md border-t-4 border-blue-100 mb-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-xl font-bold text-white mb-2 md:mb-0">
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

      <div>
        <NivelClases moduloId={moduloId} />
      </div>

      {modulo.preguntas &&
      modulo.preguntas.filter(isPreguntaValida).length > 0 ? (
        <>
          <button
            onClick={toggleMostrarPreguntas}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 mt-4 mb-8 block mx-auto"
          >
            {mostrarPreguntas ? (
              <>
                <FaEyeSlash className="inline-block mr-2" />
                Ocultar preguntas
              </>
            ) : (
              <>
                <FaEye className="inline-block mr-2" />
                Mostrar preguntas
              </>
            )}
          </button>

          {mostrarPreguntas && (
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Preguntas
              </h3>
              {modulo.preguntas
                .filter(isPreguntaValida)
                .map((pregunta, index) => (
                  <div
                    key={index}
                    className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <p className="text-lg text-gray-800 mb-4 font-semibold">
                      {index + 1}.{" "}
                      {pregunta.tipo === "opcion_multiple"
                        ? "Seleccione la respuesta correcta:"
                        : "Determine si es verdadero o falso:"}
                    </p>
                    <p className="text-gray-700 mb-4 italic">
                      {pregunta.pregunta}
                    </p>
                    <div className="space-y-2">
                      {pregunta.tipo === "opcion_multiple" ? (
                        pregunta.opciones.map((opcion, opcionIndex) => (
                          <div key={opcionIndex} className="flex items-center">
                            <input
                              type="radio"
                              id={`opcion-${index}-${opcionIndex}`}
                              name={`pregunta-${index}`}
                              value={opcion}
                              checked={respuestas[index] === opcion}
                              onChange={(e) => handleAnswerChange(index, e)}
                              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                              disabled={quizCompletado}
                            />
                            <label
                              htmlFor={`opcion-${index}-${opcionIndex}`}
                              className="text-gray-700"
                            >
                              {opcion}
                            </label>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center space-x-6">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`pregunta-${index}`}
                              value="verdadero"
                              checked={respuestas[index] === "verdadero"}
                              onChange={(e) => handleAnswerChange(index, e)}
                              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                              disabled={quizCompletado}
                            />
                            <span className="text-gray-700">Verdadero</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`pregunta-${index}`}
                              value="falso"
                              checked={respuestas[index] === "falso"}
                              onChange={(e) => handleAnswerChange(index, e)}
                              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                              disabled={quizCompletado}
                            />
                            <span className="text-gray-700">Falso</span>
                          </label>
                        </div>
                      )}
                    </div>
                    {quizCompletado && respuestas[index] && (
                      <div
                        className={`mt-2 text-lg font-semibold ${
                          verificarRespuesta(index, respuestas[index])
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {verificarRespuesta(index, respuestas[index])
                          ? "¡Correcto!"
                          : "Incorrecto. Sigue intentándolo, no te rindas."}
                      </div>
                    )}
                  </div>
                ))}
              <button
                onClick={handleSubmitAnswers}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg mt-6 transition duration-300 ease-in-out"
                disabled={
                  Object.keys(respuestas).length !== modulo.preguntas.length
                }
              >
                Enviar Respuestas
              </button>
            </div>
          )}
          {quizCompletado && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4 mb-8">
              <span className="block sm:inline">
                ¡Felicitaciones! Has aprobado el cuestionario.
              </span>
            </div>
          )}
          {!quizCompletado && respuestasUsuario.length > 0 && (
            <div className="bg-red-200 text-red-800 p-4 rounded-lg mb-4">
              Algunas respuestas son incorrectas. Inténtalo de nuevo.
            </div>
          )}
        </>
      ) : (
        <div className="bg-blue-100 p-4 rounded-lg shadow-md mt-4">
          <span className="text-blue-800 font-semibold">
            Este módulo no tiene preguntas para responder.
          </span>
        </div>
      )}

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            {loading
              ? "Cargando..."
              : !checkAllClassesCompleted()
              ? "Debes completar al menos el 80% de las clases para responder las preguntas."
              : ""}
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Aceptar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModuloDetailsStudent;