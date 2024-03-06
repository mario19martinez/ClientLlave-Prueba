import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NivelClases from "../NivelClases/NivelClases";

function ModuloDetail() {
  const [modulo, setModulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
  const { nivelId, moduloId } = useParams();

  useEffect(() => {
    const fetchModulo = async () => {
      try {
        const response = await axios.get(
          `/nivel/${nivelId}/modulo/${moduloId}`
        );
        const moduloData = response.data;
        moduloData.preguntas = JSON.parse(moduloData.preguntas);
        setModulo(moduloData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el modulo:", error);
        setLoading(false);
      }
    };

    fetchModulo();
  }, [nivelId, moduloId]);

  const toggleMostrarPreguntas = () => {
    setMostrarPreguntas(!mostrarPreguntas);
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
    <div className=" mx-auto w-5/6">
      <h1 className="text-2xl font-semibold mb-4">{modulo.titulo}</h1>
      <p className="text-gray-700">{modulo.descripcion}</p>
      <button
        onClick={toggleMostrarPreguntas}
        className="text-blue-500 underline mt-2 mb-4"
      >
        {mostrarPreguntas ? "Ocultar preguntas" : "Mostrar preguntas"}
      </button>
      {mostrarPreguntas && (
        <>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Preguntas:</h3>
          {Array.isArray(modulo.preguntas) && modulo.preguntas.length > 0 ? (
            modulo.preguntas.map((pregunta, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-700 mb-1">
                  Pregunta {index + 1}: {pregunta.pregunta}
                </p>
                <p className="text-gray-600 mb-1">Opciones:</p>
                <ul className="list-disc pl-5">
                  {pregunta.opciones.map((opcion, idx) => (
                    <li key={idx} className="text-gray-700">
                      {opcion}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600">
                  Respuesta Correcta: {pregunta.respuestaCorrecta}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center mt-4">
              No se encontraron preguntas para este módulo.
            </div>
          )}
        </>
      )}
      <NivelClases moduloId={moduloId} />
    </div>
  );
}

export default ModuloDetail;
