import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PropTypes from "prop-types";

export default function ModulosMateriaAdmin({ refreshTrigger }) {
  const { materiaId } = useParams();
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchModulos = async () => {
    try {
      const res = await axios.get(`/materia/${materiaId}/modulos`);
      const activos = res.data.filter((modulo) => modulo.activo);
      setModulos(activos);
    } catch (err) {
      console.error("Error al obtener módulos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Se actualiza cuando cambia `materiaId` o `refreshTrigger`
  useEffect(() => {
    setLoading(true);
    fetchModulos();
  }, [materiaId, refreshTrigger]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <CircularProgress />
      </div>
    );
  }

  if (!modulos.length) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
        <InfoOutlinedIcon sx={{ fontSize: 60 }} className="text-blue-500 mb-4" />
        <p className="text-xl font-semibold">No hay módulos activos en esta materia.</p>
        <p className="text-sm mt-1">Puedes crear uno desde la gestión de módulos.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Módulos Activos de la Materia</h3>
      <ul className="space-y-3">
        {modulos.map((modulo) => (
          <li
            key={modulo.id}
            className="group flex justify-between items-center px-4 py-3 border border-gray-200 rounded-md hover:shadow transition"
          >
            <Button variant="text" className="text-left text-base font-medium text-blue-700">
              {modulo.titulo}
            </Button>
            <div
              className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <Tooltip title="Ver ventas">
                <IconButton size="small" className="text-blue-600 hover:bg-blue-50">
                  <ShowChartIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Editar módulo">
                <IconButton size="small" className="text-yellow-600 hover:bg-yellow-50">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar módulo">
                <IconButton size="small" className="text-red-600 hover:bg-red-50">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Validación de props
ModulosMateriaAdmin.propTypes = {
  refreshTrigger: PropTypes.any, // cualquier cambio forzará el refresh
};