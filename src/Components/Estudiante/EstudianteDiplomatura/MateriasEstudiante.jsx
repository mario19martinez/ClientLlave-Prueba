import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function MateriasEstudiante() {
  const { diplomaturaId, userSub } = useParams();
  const navigate = useNavigate();
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `/users/${userSub}/diplomaturas/${diplomaturaId}/materias`
        );
        setMaterias(response.data);
      } catch (err) {
        setError("No se pudieron cargar las materias.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userSub && diplomaturaId) {
      fetchMaterias();
    }
  }, [userSub, diplomaturaId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-4 font-semibold">
        {error}
      </div>
    );
  }

  if (!materias.length) {
    return (
      <div className="text-center text-gray-600 py-4">
        No hay materias registradas para esta diplomatura.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        Materias de la Diplomatura
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {materias.map((materia) => (
          <div
            key={materia.id}
            onClick={() =>
              navigate(
                `/estudiante/diplomatura/${diplomaturaId}/${userSub}/materia/${materia.id}`
              )
            }
            className="bg-white border border-blue-200 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] cursor-pointer overflow-hidden"
          >
            {materia.image && (
              <img
                src={materia.image}
                alt={`Imagen de ${materia.name}`}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {materia.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {materia.description || "Sin descripción."}
              </p>
              <p className="mt-2 text-xs text-blue-500">
                Progreso: {materia.progress || 0}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}