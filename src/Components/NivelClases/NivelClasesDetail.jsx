import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function NivelClasesDetail() {
  const { moduloId, claseId } = useParams();
  const [clase, setClase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClase = async () => {
      try {
        const response = await axios.get(
          `/modulo/${moduloId}/clase/${claseId}`
        );
        setClase(response.data);
        setLoading(false);
      } catch (error) {
        setError(
          "Error al obtener la clase. Por favor, intentalo de nuevo mas tarde."
        );
        setLoading(false);
      }
    };

    fetchClase();

    return () => {};
  }, [moduloId, claseId]);

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
    return <div>{error}</div>;
  }

  if (!clase) {
    return <div>No se encontró la clase.</div>;
  }

  return (
    <div className="p-4">
      <h2>Detalle de la clase</h2>
      <p>ID: {clase.id}</p>
      {clase.name && <p className="mb-2"><span className="font-semibold">Nombre:</span> {clase.name}</p>}
      {clase.url && <p>URL: {clase.url}</p>}
      {clase.url && (
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          <iframe
            title={clase.name}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
                clase.url
            )}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {clase.pdfURL && <p>PDF URL: {clase.pdfURL}</p>}
      {clase.texto && <p>Texto: {clase.texto}</p>}
      {clase.resumen && (
        <div>
          <p>Resumen:</p>
          <p>{clase.resumen}</p>
        </div>
      )}
    </div>
  );
}

export default NivelClasesDetail;
