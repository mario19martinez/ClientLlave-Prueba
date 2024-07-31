import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UsersGrupoMonitor from "./UsersGrupoMonitor";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Tooltip from "@mui/material/Tooltip";
import "react-toastify/dist/ReactToastify.css";

function MonitorGruposDetails() {
  const [grupo, setGrupo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { grupoId, nivelId, moduloId } = useParams();

  useEffect(() => {
    const fetchGrupo = async () => {
      try {
        if (!nivelId || !grupoId) {
          setError("ID de nivel o grupo no encontrados");
          return;
        }
        const response = await axios.get(
          `/niveles/${nivelId}/grupos/${grupoId}`
        );
        setGrupo(response.data);
      } catch (error) {
        setError(error.response.data.error);
        console.error("Ocurrió un error:", error);
      }
    };
    fetchGrupo();
  }, [nivelId, grupoId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (error) {
    return <p className="text-center text-red-500 mt-4">Error: {error}</p>;
  }

  if (!grupo) {
    return (
      <div className="flex h-full">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-xl font-semibold text-blue-600">
          Cargando...
        </span>
      </div>
    );
  }

  if (nivelId === undefined) {
    return (
      <p className="text-center text-red-500 mt-4">
        Error: ID de nivel no encontrado
      </p>
    );
  }

  return (
    <div className="px-4 py-6 w-full max-w-4xl mx-auto">
      <Tooltip title="Haz clic para volver atrás" arrow placement="right">
        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white p-3 mb-6 rounded-full hover:bg-blue-600 transition-transform duration-300 ease-in-out"
        >
          <KeyboardBackspaceIcon fontSize="large" />
        </button>
      </Tooltip>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{grupo.name}</h2>
      <div className="mt-6">
        <UsersGrupoMonitor
          nivelId={nivelId}
          grupoId={grupoId}
          moduloId={moduloId}
        />
      </div>
    </div>
  );
}

export default MonitorGruposDetails;