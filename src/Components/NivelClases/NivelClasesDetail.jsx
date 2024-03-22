import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function NivelClasesDetail({ nivelId, moduloId, claseId }) {
  const [clase, setClase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClase = async () => {
      try {
        const response = await axios.get(
          `/nivel/${nivelId}/modulo/${moduloId}/clase/${claseId}`
        );
        setClase(response.data);
        setLoading(false);
      } catch (error) {
        setError(
          "Error al obtener la clase. Por favor, inténtalo de nuevo más tarde."
        );
        setLoading(false);
      }
    };

    fetchClase();

    return () => {};
  }, [nivelId,moduloId, claseId]);

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
    <div className="mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Detalle de la clase</h2>
      <div className="aspect-w-16 aspect-h-9 mb-6">
        {clase.url && (
          <iframe
            title={clase.name}
            className="w-full h-96 rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
              clase.url
            )}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
      </div>
      {clase.name && (
        <p className="text-lg mb-4">
          <span className="font-semibold">Nombre:</span> {clase.name}
        </p>
      )}
      {clase.texto && (
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Texto:</h3>
          <p className="text-gray-700">{clase.texto}</p>
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
  );
}

// Definir propTypes para validar las props
NivelClasesDetail.propTypes = {
  moduloId: PropTypes.string.isRequired,
  claseId: PropTypes.string.isRequired,
};

export default NivelClasesDetail;