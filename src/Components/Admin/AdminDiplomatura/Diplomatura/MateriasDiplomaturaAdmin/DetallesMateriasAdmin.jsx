import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import GroupIcon from "@mui/icons-material/Group";

export default function DetallesMateriaAdmin() {
  const { diplomaturaId, materiaId } = useParams();
  const navigate = useNavigate();
  const [materia, setMateria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchMateria = async () => {
      try {
        const res = await axios.get(`/diplomatura/${diplomaturaId}/materia/${materiaId}`);
        setMateria(res.data);
      } catch (error) {
        console.error("Error al cargar la materia:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMateria();
  }, [diplomaturaId, materiaId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (!materia) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p className="text-xl font-semibold">Materia no encontrada.</p>
      </div>
    );
  }

  return (
    <section className="bg-white shadow-lg rounded-2xl p-6 md:p-8 mb-8 w-full">
      {/* Botón de regreso */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition mb-4"
        aria-label="Volver"
      >
        <ArrowBackIcon />
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Imagen */}
        <div className="w-full md:w-1/3">
          <img
            src={materia.image || "https://via.placeholder.com/400x300?text=Sin+imagen"}
            alt={materia.name}
            className="rounded-xl shadow-md w-full h-64 object-cover"
          />
        </div>

        {/* Contenido */}
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold text-gray-800">{materia.name}</h2>
            <div className="flex gap-2">
              <Tooltip title="Ventas">
                <IconButton className="text-blue-600 hover:bg-blue-50">
                  <ShowChartIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Estudiantes inscritos">
                <IconButton className="text-green-600 hover:bg-green-50">
                  <GroupIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Editar">
                <IconButton className="text-yellow-600 hover:bg-yellow-50">
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar">
                <IconButton className="text-red-600 hover:bg-red-50">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>

          {/* Descripción */}
          <p className="text-gray-700 mt-4 mb-2">
            <span className="font-semibold">Descripción: </span>
            {showFullDescription
              ? materia.description
              : (materia.description?.slice(0, 220) || "Sin descripción disponible.")}
            {materia.description?.length > 220 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-500 font-medium ml-1 hover:underline"
              >
                {showFullDescription ? "Ver menos" : "Ver más"}
              </button>
            )}
          </p>

          {/* Precio */}
          <div className="text-lg font-semibold text-blue-700">
            Precio: ${Number(materia.precio).toFixed(2)}
          </div>
        </div>
      </div>
    </section>
  );
}