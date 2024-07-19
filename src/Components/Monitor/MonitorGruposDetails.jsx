import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import UsersGrupo from "../Admin/NivelAdmin/UserGrupo/UsersGrupo";
import UsersGrupoMonitor from "./UsersGrupoMonitor";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Tooltip from "@mui/material/Tooltip";
import "react-toastify/dist/ReactToastify.css";

function MonitorGruposDetails() {
  const [grupo, setGrupo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { grupoId, nivelId } = useParams();

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
      <div className="flex justify-center items-center h-screen">
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
    <div className="px-4 py-6 w-screen">
      <ToastContainer />
      <Tooltip title="Haz clic para volver atrás" arrow placement="right">
        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white p-3 mb-6 rounded-full hover:bg-blue-600 transition-transform duration-300 ease-in-out"
        >
          <KeyboardBackspaceIcon fontSize="large" />
        </button>
      </Tooltip>
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Detalle del Grupo
      </h2>
      <div className="flex flex-col lg:flex-row lg:items-start">
      <img
  className="w-full max-w-xs sm:max-w-xs md:max-w-xs lg:max-w-sm xl:max-w-md h-auto object-cover rounded-lg mb-6 lg:mr-6"
  src={grupo.image}
  alt={grupo.name}
/>
        <div className="lg:w-1/2 mb-6">
          <p className="text-gray-700 text-lg mb-2">
            <strong className="font-bold">Nombre:</strong> {grupo.name}
          </p>
          <p className="text-gray-700 text-lg mb-2">
            <strong className="font-bold">Descripción:</strong>{" "}
            {grupo.descripcion}
          </p>
          <p className="text-gray-700 text-lg mb-2">
            <strong className="font-bold">Inicia:</strong> {grupo.fechaInicio}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <UsersGrupoMonitor nivelId={nivelId} grupoId={grupoId} />
      </div>
    </div>
  );
}

export default MonitorGruposDetails;
