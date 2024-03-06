import { useState, useEffect } from "react";
import axios from "axios";
import NivelClasesDetail from "./NivelClasesDetail";

function NivelClases({ moduloId }) {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState(null);

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
            No se encontró el módulo.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-start">
      {/* Navigation Bar */}
      <nav className="bg-white w-full p-4 shadow-md border-t-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">Coaching Ontológico</div>
          <div className="space-x-4">
            <a href="#" className="text-blue-500 hover:underline">
              Etapa 1
            </a>
            <a href="#" className="text-blue-500 hover:underline">
              Etapa 2
            </a>
            <a href="#" className="text-blue-500 hover:underline">
              Mentoring
            </a>
          </div>
        </div>
      </nav>

      {/* Class Information */}
      <div className="flex px-5 py-5">
        <div className=" p-0 mt-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Clases</h2>
          <ul className="grid gap-4">
            {clases.map((clase) => (
              <li
                key={clase.id}
                className={` h-6 shadow-lg shadow-blue-500/50 rounded-lg p-6 border-b-4 border-blue-500 flex items-center justify-between transition duration-500 transform hover:scale-105 ${
                  selectedClassId === clase.id ? "bg-blue-500 border-gray-500 text-white" : ""
                }`}
                onClick={() => handleClassSelect(clase.id)}
              >
                <p className="text-lg font-semibold">{clase.name}</p>
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
        <div className="flex-1 px-5 py-8">
          {selectedClassId && (
            <NivelClasesDetail moduloId={moduloId} claseId={selectedClassId} />
          )}
        </div>
      </div>
    </div>
  );
}

export default NivelClases;
