import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import NavAdmin from "../NavAdmin/NavAdmin";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function ClasesDetailModulo() {
  const { nivelId, moduloId, claseId } = useParams();
  const [clase, setClase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClase = async () => {
      try {
        const response = await axios.get(
          `/nivel/${nivelId}/modulo/${moduloId}/clase/${claseId}`
        );
        setClase(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error en el funcionamiento:", error);
        setError(
          "Error al obtener la clase. Por favor, inténtalo de nuevo más tarde."
        );
        setLoading(false);
      }
    };

    fetchClase();

    return () => {};
  }, [nivelId, moduloId, claseId]);

  const extractYoutubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

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

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 border border-red-400 rounded-md">
        Error: {error}
      </div>
    );
  }

  if (!clase) {
    return <div className="p-4">No se encontró la clase.</div>;
  }

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <div className="bg-gray-100 min-h-screen flex justify-center items-center w-1/2 translate-x-32">
          <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg">
          <button
            onClick={goBack}
            className="bg-blue-500 text-white w-20 h-10 mb-8 font-semibold py-0 px-4 rounded hover:bg-gray-400 transition-transform ease-in-out duration-300 hover:translate-y-2"
          >
            <KeyboardBackspaceIcon fontSize="large" />
          </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Detalle de la clase
            </h2>

            <Link
              to={`/admin/nivel/${nivelId}/modulo/${moduloId}/clase/${claseId}/editar`}
              className="bg-blue-500 text-white p-2 rounded-md mb-4 flex items-center gap-1"
            >
              <EditNoteIcon />
              Editar Clase
            </Link>

            {clase.url && (
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <iframe
                  title={clase.name}
                  className="w-full h-96 rounded-lg"
                  src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
                    clase.url
                  )}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {clase.name && (
              <div className="mb-4">
                <p className="font-bold text-gray-800 text-xl">{clase.name}</p>
              </div>
            )}

            {clase.texto && (
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Texto:</h3>
                <p className="font-gabarito">{clase.texto}</p>
              </div>
            )}

            {clase.resumen && (
              <div>
                <h3 className="text-xl font-bold mb-2">Resumen:</h3>
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: clase.resumen }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClasesDetailModulo;
