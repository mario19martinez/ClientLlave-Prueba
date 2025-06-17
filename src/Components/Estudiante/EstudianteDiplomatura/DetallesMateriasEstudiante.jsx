import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, LinearProgress } from "@mui/material";

export default function DetallesMateriasEstudiante() {
  const { userSub, materiaId } = useParams();
  const [materia, setMateria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verMas, setVerMas] = useState(false);

  useEffect(() => {
    const fetchMateriaDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `/user/${userSub}/materia/${materiaId}/detail`
        );
        setMateria(response.data);
      } catch (err) {
        setError("No se pudo cargar la materia.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userSub && materiaId) {
      fetchMateriaDetail();
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

  if (!materia) {
    return (
      <div className="text-center text-gray-600 py-4">
        No se encontró información de la materia.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {materia.image && (
          <div className="md:w-2/5 max-h-72 md:max-h-full overflow-hidden">
            <img
              src={materia.image}
              alt={`Imagen de ${materia.name}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="md:w-3/5 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-3">{materia.name}</h2>

          <div className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
            {materia.description ? (
              <>
                {verMas || materia.description.length <= 250 ? (
                  <p>{materia.description}</p>
                ) : (
                  <p>{materia.description.slice(0, 250)}...</p>
                )}
                {materia.description.length > 250 && (
                  <button
                    className="text-blue-600 text-sm mt-1 hover:underline focus:outline-none"
                    onClick={() => setVerMas(!verMas)}
                  >
                    {verMas ? "Ver menos" : "Ver más"}
                  </button>
                )}
              </>
            ) : (
              <p className="text-gray-500 italic">Sin descripción.</p>
            )}
          </div>

          {materia.progress !== undefined && (
            <div className="mt-5">
              <p className="text-sm text-gray-600 mb-1">Progreso:</p>
              <LinearProgress
                variant="determinate"
                value={materia.progress}
                className="rounded-full h-2"
              />
              <p className="text-xs text-gray-500 mt-1">{materia.progress}% completado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}