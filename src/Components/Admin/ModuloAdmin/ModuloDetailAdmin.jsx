import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ClaseModuloAdmin from "../ClasesModuloAdmin/ClasesModuloAdmin";
import EditNoteIcon from "@mui/icons-material/EditNote";

function ModuloDetailAdmin() {
  const [modulo, setModulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { nivelId, moduloId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModulo = async () => {
      try {
        const response = await axios.get(
          `/nivel/${nivelId}/modulo/${moduloId}`
        );
        const moduloData = response.data;
        console.log(moduloData);
        setModulo(moduloData);
        setLoading(false);
      } catch (error) {
        setError("Produjo un error al cargar el detalle del modulo.");
        setLoading(false);
      }
    };
    fetchModulo();
  }, [nivelId, moduloId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/nivel/${nivelId}/modulo/${moduloId}`);
      navigate(`/nivel/${nivelId}`);
    } catch (error) {
      console.error("Error al eliminar el modulo:", error);
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
        <div className="px-10 py-5 translate-x-32 w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {modulo.titulo}
          </h2>
          <p className="text-gray-600 mb-4">
            <strong>Contenido:</strong> {modulo.contenido}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Descripción:</strong> {modulo.descripcion}
          </p>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Preguntas:</h3>
          {Array.isArray(modulo.preguntas) && modulo.preguntas.length > 0 ? (
            <div className="mb-4">
              {modulo.preguntas.map((pregunta, index) => (
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
              ))}
            </div>
          ) : (
            <div className="text-center mb-4">
              No se encontraron preguntas para este módulo.
            </div>
          )}
          <div className="flex items-center">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 mr-4"
            >
              <DeleteIcon fontSize="large" />
            </button>
            <button
              onClick={() =>
                navigate(`/nivel/${nivelId}/modulo/${moduloId}/edit`)
              }
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              <EditNoteIcon fontSize="large" />
            </button>
          </div>
          <hr className="my-6" />
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Clases:</h3>
          <ClaseModuloAdmin moduloId={moduloId} />
        </div>
  );
}

export default ModuloDetailAdmin;