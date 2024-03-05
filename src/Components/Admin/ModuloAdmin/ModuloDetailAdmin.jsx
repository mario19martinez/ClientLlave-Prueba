import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ClaseModuloAdmin from "../ClasesModuloAdmin/ClasesModuloAdmin";
//import ClaseModuloCreate from "../ClasesModuloAdmin/ClasesModuloCreate";

function ModuloDetailAdmin() {
  const [modulo, setModulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { nivelId, moduloId } = useParams();
  // console.log("nivel:", nivelId);
  // console.log("modulo:", moduloId);

  

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
        console.error("Error al obtener el detalle del modulo:", error);
        setError("Produjo un error al cargar el detalle del modulo.");
        setLoading(false);
      }
    };
    fetchModulo();
  }, [nivelId, moduloId]);

  if (loading) {
    return <div className="text-center mt-4">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">Error: {error}</div>;
  }

  if (!modulo) {
    return (
      <div className="text-center mt-4">
        No se encontro ningun modulo con ID proporcionado.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{modulo.titulo}</h2>
      <p className="text-gray-600 mb-2">Contenido: {modulo.contenido}</p>
      <p className="text-gray-600 mb-2">descripcion: {modulo.descripcion}</p>
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
      <hr className="my-6" />
      <h3 className="text-xl font-bold text-gray-800 mb-2">Clase:</h3>
      <ClaseModuloAdmin moduloId={moduloId} />
    </div>
  );
}

export default ModuloDetailAdmin;
