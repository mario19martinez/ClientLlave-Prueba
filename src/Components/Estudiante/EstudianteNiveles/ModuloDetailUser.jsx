import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// EN REVISION PARA DETERMINAR SI SE ESTA USANDO O NO

function ModuloDetailUser() {
  const [grupo, setGrupo] = useState(null);
  const [modulo, setModulo] = useState(null);
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
  const [respuestas, setRespuestas] = useState({});
  const [userSub, setUserSub] = useState(null);

  const { nivelId, grupoId, moduloId } = useParams();

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
    const fetchModuloDetail = async () => {
      try {
        const response = await axios.get(
          `/nivel/${nivelId}/grupo/${grupoId}/modulo/${moduloId}/detalles`
        );
        const { grupo, modulo } = response.data;
        setGrupo(grupo);
        setModulo(modulo);
        console.log('modulo:', response)
      } catch (error) {
        console.error(
          "Error al obtener los detalles del modulo y las clases:",
          error
        );
      }
    };

    fetchModuloDetail();
  }, [nivelId, grupoId, moduloId]);

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
    } catch (error) {
      console.error("Error al enviar respuestas:", error);
    }
  };


  if (!grupo || !modulo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-xl font-semibold text-blue-600">
          Cargando...
        </span>
      </div>
    );
  }

  return (
    <div className="mx-auto w-5/6 p-0 translate-y-8">
      <h1 className="text-2xl font-semibold mb-4">{modulo.titulo}</h1>
      <p className="text-gray-700 mb-4">{modulo.descripcion}</p>

      <div>
        <nav className="bg-white w-full p-4 shadow-md border-t-4 border-blue-500 mb-2">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">
              Modulo Actual: {modulo?.titulo}
            </div>
            <button
            onClick={() => setMostrarPreguntas(!mostrarPreguntas)}>
              {mostrarPreguntas ? "Ocultar Preguntas" : "Mostrar Preguntas"}
            </button>
            {mostrarPreguntas &&
            modulo &&
            Array.isArray(modulo.preguntas) &&
            modulo.preguntas.length > 0 ? (
              <>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Preguntas:
                </h3>
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
                  </div>
                ))}
                <button
                  onClick={handleSubmitAnswers}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300"
                  disabled={
                    Object.keys(respuestas).length !== modulo.preguntas.length
                  }
                >
                  Responder
                </button>
              </>
            ) : (
              <div className="text-center mt-4">
                {modulo &&
                Array.isArray(modulo.preguntas) &&
                modulo.preguntas.length === 0
                  ? "No se encontraron preguntas para este modulo."
                  : "Cargando preguntas..."}
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default ModuloDetailUser;
