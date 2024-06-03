import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import ClaseDetailUser from "../Estudiante/EstudianteNiveles/ClasesDetailUser";

function NivelClases() {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [showClasses, setShowClasses] = useState(false);
  const { moduloId } = useParams();

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get(`/modulo/${moduloId}/clases`);
        setClases(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las clases:", error);
        setLoading(false);
      }
    };
    fetchClases();
  }, [moduloId]);

  const handleClassSelect = (claseId) => {
    setSelectedClassId(claseId);
    if (window.innerWidth <= 768) { // Ocultar la lista en móviles al seleccionar una clase
      setShowClasses(false);
    }
  };

  const toggleShowClasses = () => {
    setShowClasses(!showClasses);
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

  if (!clases || clases.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-500 p-4 rounded-lg shadow-lg">
          <span className="text-white font-semibold">
            No se encontraron clases en este módulo.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start ">
      <div className="w-full p-4">
        <button
          onClick={toggleShowClasses}
          className="md:hidden bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          {showClasses ? "Ocultar Clases" : "Mostrar Clases"}
        </button>
      </div>
      <div className="flex flex-col md:flex-row w-full">
        <div className={`p-0 mt-4 rounded-lg shadow-md px-2 transition-all duration-500 ease-in-out ${showClasses ? 'block' : 'hidden md:block'}`}>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Clases</h2>
          <ul className="grid gap-4">
            {clases.map((clase) => (
              <li
                key={clase.id}
                className={`shadow-lg shadow-blue-500/50 rounded-lg p-6 border-b-4 border-blue-500 flex items-center justify-between transition duration-500 transform hover:scale-105 cursor-pointer ${
                  selectedClassId === clase.id ? "bg-blue-500 border-gray-500 text-white" : ""
                }`}
                onClick={() => handleClassSelect(clase.id)}
              >
                <p className="text-lg font-semibold">{clase.name.length > 20 ? `${clase.name.substring(0, 20)}...` : clase.name}</p>
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-2 py-2 w-full md:w-2/3">
          {selectedClassId && (
            <ClaseDetailUser moduloId={moduloId} claseId={selectedClassId} />
          )}
        </div>
      </div>
    </div>
  );
}

NivelClases.propTypes = {
  moduloId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, 
};

export default NivelClases;