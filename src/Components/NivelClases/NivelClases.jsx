import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import ClaseDetailUser from "../Estudiante/EstudianteNiveles/ClasesDetailUser";
import { FaChevronDown, FaChevronUp, FaCheckCircle, FaClock, FaInfoCircle } from "react-icons/fa";

function NivelClases() {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [showClasses, setShowClasses] = useState(false);
  const [progresos, setProgresos] = useState({});
  const { moduloId } = useParams();

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get(`/modulo/${moduloId}/clases`);
        const sortedClases = response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setClases(sortedClases);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las clases:", error);
        setLoading(false);
      }
    };

    const fetchProgresos = async () => {
      try {
        const token = localStorage.getItem("token");
        const userResponse = await axios.get("/user-info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userSub = userResponse.data.sub;

        const progresoResponse = await axios.get("/registro-actividad", {
          params: { userSub, moduloId },
        });
        setProgresos(progresoResponse.data);
      } catch (error) {
        console.error("Error al obtener los progresos:", error);
      }
    };

    fetchClases();
    fetchProgresos();
  }, [moduloId]);

  const handleClassSelect = (claseId) => {
    setSelectedClassId(claseId);
    if (window.innerWidth <= 768) {
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
        <span className="ml-4 text-xl font-semibold text-gray-900">Cargando...</span>
      </div>
    );
  }

  if (!clases || clases.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-500 p-4 rounded-lg shadow-lg">
          <span className="text-white font-semibold">No se encontraron clases en este módulo.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="w-full md:w-1/3 p-4">
        <button
          onClick={toggleShowClasses}
          className="md:hidden bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center w-full mb-4"
        >
          {showClasses ? (
            <>
              <FaChevronUp className="mr-2" />
              Ocultar Clases
            </>
          ) : (
            <>
              <FaChevronDown className="mr-2" />
              Mostrar Clases
            </>
          )}
        </button>
        <div className={`transition-all duration-500 ease-in-out ${showClasses ? 'block' : 'hidden md:block'}`}>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Clases</h2>
          <ul className="grid gap-4">
            {clases.map((clase) => {
              const progreso = progresos[clase.id] || 0;
              let borderColor, bgColor, icon;

              if (progreso === 0) {
                borderColor = "border-blue-500";
                icon = null;
              } else if (progreso > 80) {
                borderColor = "border-green-500";
                icon = <FaCheckCircle className="text-green-500 w-6 h-6" />;
                bgColor = selectedClassId === clase.id ? "bg-green-200" : "";
              } else {
                borderColor = "border-yellow-500";
                icon = <FaClock className="text-yellow-500 w-6 h-6" />;
                bgColor = selectedClassId === clase.id ? "bg-yellow-200" : "";
              }

              return (
                <li
                  key={clase.id}
                  className={`shadow-lg shadow-blue-500/50 rounded-lg p-6 border-b-4 ${borderColor} ${bgColor} flex items-center justify-between transition duration-500 transform hover:scale-105 cursor-pointer ${
                    selectedClassId === clase.id ? "border-gray-500" : ""
                  }`}
                  onClick={() => handleClassSelect(clase.id)}
                >
                  <p className="text-lg font-semibold">{clase.name.length > 20 ? `${clase.name.substring(0, 20)}...` : clase.name}</p>
                  <div className="flex items-center">
                    {icon}
                    <svg
                      className="w-8 h-8 text-blue-500 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex-1 p-4">
        {selectedClassId ? (
          <ClaseDetailUser moduloId={moduloId} claseId={selectedClassId} />
        ) : (
          <div className="text-center text-gray-700 p-6 border border-dashed border-gray-400 rounded-lg">
            <p className="text-lg font-semibold flex items-center justify-center">
              {window.innerWidth <= 768
                ? "Pulsa el botón de 'Mostrar Clases' para desplegar la lista de clases del módulo."
                : (
                  <>
                    <FaInfoCircle className="mr-2" />
                    No hay clase seleccionada. Selecciona una clase para verla aquí.
                  </>
                )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

NivelClases.propTypes = {
  moduloId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default NivelClases;