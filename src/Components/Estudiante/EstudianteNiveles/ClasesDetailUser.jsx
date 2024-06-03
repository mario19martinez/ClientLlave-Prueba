import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function ClaseDetailUser({ claseId }) {
  const [clase, setClase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mostrarTexto, setMostrarTexto] = useState(false);

  useEffect(() => {
    const fetchClaseDetail = async () => {
      try {
        const response = await axios.get(`/clase/${claseId}/detalles`);
        const { clase } = response.data;
        setClase(clase);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los detalles de la clase:", error);
        setError(
          "Error al obtener la clase. Por favor, inténtalo de nuevo más tarde."
        );
        setLoading(false);
      }
    };

    fetchClaseDetail();
  }, [claseId]);

  const extractYoutubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const toggleMostrarTexto = () => {
    setMostrarTexto(!mostrarTexto);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-xl font-semibold text-blue-700">
          Cargando...
        </span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center mt-4">{error}</div>;
  }

  if (!clase) {
    return <div className="text-center mt-4">No se encontró la clase.</div>;
  }

  const caracteresIniciales = 270;
  const textoAbreviado = clase.texto.slice(0, caracteresIniciales);
  const mostrarBoton = clase.texto.length > caracteresIniciales;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{clase.name}</h2>
      <div
        className="relative mb-8"
        style={{ paddingBottom: "56.25%", height: 0 }}
      >
        {clase.url && (
          <iframe
            title={clase.name}
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
              clase.url
            )}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">
          Lectura de la clase:
        </h3>
        {mostrarTexto ? (
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: clase.texto }}
          />
        ) : (
          <div>
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: textoAbreviado }}
            />
            {mostrarBoton && (
              <button
                className="text-blue-500 hover:text-blue-700 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={toggleMostrarTexto}
              >
                Ver más...
              </button>
            )}
          </div>
        )}
      </div>
      {clase.resumen && (
        <div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Resumen:</h3>
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: clase.resumen }}
          />
        </div>
      )}

      <div className="mt-6 text-center">
        <a
          href={clase.pdfURL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Material de apoyo
        </a>
      </div>
    </div>
  );
}

ClaseDetailUser.propTypes = {
  claseId: PropTypes.string.isRequired,
};

export default ClaseDetailUser;