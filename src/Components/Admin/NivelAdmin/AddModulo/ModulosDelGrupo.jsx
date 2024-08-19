import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";

function ModulosDelGrupo() {
  const [modulos, setModulos] = useState([]);
  const [error, setError] = useState(null);
  const { grupoId } = useParams()

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get(`/grupo/${grupoId}/modulos`);
        setModulos(response.data.modulos);
      } catch (error) {
        setError("Error al obtener los modulos del grupo");
        console.error("Error al obtener los modulos de este grupo:", error);
      }
    };

    fetchModulos();
  }, [grupoId]);

  const handleDeleteModulo = async (moduloId) => {
    try {
      const confirmacion = window.confirm("¿Estás seguro de eliminar este módulo del grupo?");
      if (!confirmacion) return; // Si el usuario cancela la eliminación, salir de la función
      await axios.delete(`/grupo/${grupoId}/modulo/${moduloId}`);
      setModulos((prevModulos) =>
        prevModulos.filter((modulo) => modulo.id !== moduloId)
      );
    } catch (error) {
      console.error("Error al eliminar el módulo:", error);
    }
  };

  return (
    <div className="bg-gray-100 border-2 border-gray-300 shadow-md rounded-md px-5 py-5 w-64">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Modulos ({modulos.length})</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="h-5/6 overflow-y-auto">
      <ul>
        {modulos.map((modulo) => (
          <li key={modulo.id} className="border-b border-gray-200 py-4">
            <p className="text-lg font-semibold mb-2 text-gray-700">{modulo.titulo}</p>
            <p className="text-sm text-gray-600 mb-1">
  Agregado al grupo: {new Date(modulo.GrupoModulo.createdAt).toLocaleDateString()}
</p>
            <Tooltip
            title="Eliminar Modulo del Grupo"
            arrow
            placement="top"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -6],
                    }
                  }
                ]
              }
            }}
            >
            <button
            onClick={() => handleDeleteModulo(modulo.id)}
            className="text-red-500 hover:text-white hover:bg-red-500 rounded"
            >
              <DeleteIcon />
            </button>
            </Tooltip>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default ModulosDelGrupo;