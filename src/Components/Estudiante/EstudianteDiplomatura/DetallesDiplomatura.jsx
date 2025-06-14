import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function DetallesDiplomatura() {
  const { diplomaturaId, userSub } = useParams();
  const [diplomatura, setDiplomatura] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiplomatura = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/diplomatura/${diplomaturaId}/${userSub}/detail`);
        setDiplomatura(response.data);
      } catch (err) {
        setError("No se pudo cargar la diplomatura.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (diplomaturaId && userSub) {
      fetchDiplomatura();
    }
  }, [diplomaturaId, userSub]);

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

  if (!diplomatura) {
    return (
      <div className="text-center text-gray-600 py-4">
        No se encontró información de la diplomatura.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden mt-8">
      <div className="flex flex-col md:flex-row">
        {/* Imagen */}
        {diplomatura.image && (
          <div className="md:w-2/5">
            <img
              src={diplomatura.image}
              alt={`Imagen de ${diplomatura.name}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Contenido */}
        <div className="md:w-3/5 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-3">
            {diplomatura.name}
          </h2>
          <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed line-clamp-6">
            {diplomatura.description}
          </p>
        </div>
      </div>
    </div>
  );
}