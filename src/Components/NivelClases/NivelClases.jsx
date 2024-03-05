import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function NivelClases({ moduloId }) {
  const [clases, setClases] = useState([true]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get(`/modulo/${moduloId}/clases`);
        setClases(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        console.error("Error al obtener las clases:", error);
        setLoading(false);
      }
    };
    fetchClases();
  }, [moduloId]);

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
    <div className="max-w-lg mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6">Clases</h2>
      <ul className="grid gap-4">
        {clases.map((clase) => (
          <Link key={clase.id} to={`/modulo/${moduloId}/clase/${clase.id}`}>
            <li
              key={clase.id}
              className="bg-gray-300 rounded-lg shadow-md p-6 flex items-center justify-between transition duration-500 transform hover:scale-105"
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
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default NivelClases;
