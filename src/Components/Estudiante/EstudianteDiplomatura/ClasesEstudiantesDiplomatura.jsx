import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function ClasesEstudiantesDiplomatura() {
  const { userSub, materiaId } = useParams();
  const navigate = useNavigate();
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `/users/${userSub}/materias/${materiaId}/clases`
        );
        const sortedClases = response.data.sort((a, b) => a.orden - b.orden);
        setClases(sortedClases);
      } catch (err) {
        setError("No se pudieron cargar las clases.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userSub && materiaId) {
      fetchClases();
    }
  }, [userSub, materiaId]);

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

  if (!clases.length) {
    return (
      <div className="text-center text-gray-600 py-4">
        No hay clases disponibles en esta materia.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
        Clases de la Materia
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {clases.map((clase) => (
          <div
            key={clase.id}
            onClick={() => navigate(`/estudiante/${userSub}/clase/${clase.id}`)}
            className="bg-white rounded-2xl border border-gray-200 shadow-md p-6 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all duration-200"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {clase.orden}. {clase.titulo}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
              {clase.descripcion || "Sin descripción disponible."}
            </p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Precio: ${parseFloat(clase.precio).toFixed(2)}</span>
              {!clase.activo && (
                <span className="text-red-500 font-medium">Clase inactiva</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}