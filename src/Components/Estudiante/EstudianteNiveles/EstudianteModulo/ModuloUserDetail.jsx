import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NivelClases from "../../../NivelClases/NivelClases";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "react-modal";

function ModuloUserDetail() {
  const { moduloId } = useParams();
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
        const moduloResponse = await axios.get(`/modulo/${moduloId}`);
        const moduloData = moduloResponse.data; // Aquí obtienes el objeto modulo directamente
        console.log("Datos del módulo:", moduloData); // Verificar los datos recibidos
        setModulo(moduloData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el módulo:", error);
        setLoading(false);
      }
    };

    fetchModulo();
  }, [moduloId]);

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

  // Función para verificar si los primeros dos caracteres son números
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
                to={`/home/modulo/${modulos[0].id}`}
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
                      {index + 1}:{" "}
                      {pregunta.tipo === "opcion_multiple"
                        ? "Seleccione la respuesta correcta:"
                        : "Determine si es verdadero o falso:"}
                      <br />
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
                              className="mr-2"
                              disabled={quizCompletado}
                            />
                            <label
                              htmlFor={`opcion-${index}-${opcionIndex}`}
                              className="text-gray-600"
                            >
                              {opcion}
                            </label>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`pregunta-${index}`}
                              value="verdadero"
                              checked={respuestas[index] === "verdadero"}
                              onChange={(e) => handleAnswerChange(index, e)}
                              className="mr-2"
                              disabled={quizCompletado}
                            />
                            <span className="text-gray-600">Verdadero</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`pregunta-${index}`}
                              value="falso"
                              checked={respuestas[index] === "falso"}
                              onChange={(e) => handleAnswerChange(index, e)}
                              className="mr-2"
                              disabled={quizCompletado}
                            />
                            <span className="text-gray-600">Falso</span>
                          </label>
                        </div>
                      )}
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
          ¡Felicitaciones! Has respondido todas las preguntas correctamente.
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
          <h2 className="text-3xl font-bold mb-4 text-red-600 uppercase">
            ADVERTENCIA
          </h2>
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

export default ModuloUserDetail;
