import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NivelClases from "../../NivelClases/NivelClases";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "react-modal"; // Importa el componente Modal si no lo tienes aún

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
          `/nivel/${nivelId}/grupo/${grupoId}/modulo/${moduloId}/detalles`
        );
        const moduloData = moduloResponse.data.modulo;
        setModulo(moduloData);
        setLoading(false);
        if (moduloData.preguntas) {
          console.log("Preguntas del módulo:", moduloData.preguntas);
        }
      } catch (error) {
        console.error("Error al obtener el módulo:", error);
        setLoading(false);
      }
    };

    fetchModulo();
  }, [grupoId, moduloId, nivelId]);

  useEffect(() => {
    const fetchProgresos = async () => {
      if (userSub) {
        try {
          const responseClases = await axios.get(`/modulo/${moduloId}/clases`);
          const clases = responseClases.data;
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
  }, [userSub, moduloId]);

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

  const checkAllClassesCompleted = () => {
    return Object.values(progresos).every((progreso) => progreso >= 80);
  };

  const toggleMostrarPreguntas = () => {
    if (checkAllClassesCompleted()) {
      setMostrarPreguntas(!mostrarPreguntas);
    } else {
      setShowModal(true);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{modulo.titulo}</h1>
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
                    <p className="text-gray-700 mb-2 font-bold">
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
        <div className="text-center mt-4"></div>
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

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-4 text-red-600">Advertencia</h2>
          <p className="text-gray-700 mb-6">
            Debes ver todas las clases al 80% o más para poder ver y responder
            las preguntas.
          </p>
          <button
            onClick={() => setShowModal(false)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Entendido
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModuloDetailsStudent;