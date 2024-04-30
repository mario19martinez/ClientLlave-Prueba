import { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";
import axios from "axios";

function ClaseDetailUser({ claseId }) {
  const [clase, setClase] = useState(null);
  //const { claseId } = useParams();

  useEffect(() => {
    const fetchClaseDetail = async () => {
      try {
        const response = await axios.get(`/clase/${claseId}/detalles`);
        const { clase } = response.data;
        setClase(clase);
      } catch (error) {
        console.error("Error al obtener los detalles de la clase:", error);
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

  if (!clase) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-xl font-semibold text-gray-900">
          Cargando...
        </span>
      </div>
    );
  }
  //className=" p-8 bg-white w-1/2 rounded-lg shadow-lg translate-y-48 -translate-x-36"

  return (
    <div className="px-4 translate-y-10 translate-x-24" style={{ width: "700px" }}>
      <h2>{clase.name}</h2>
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

export default ClaseDetailUser;
