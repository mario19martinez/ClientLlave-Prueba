import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Vimeo from "@vimeo/player";
import axios from "axios";

function CursoClases() {
  const { id } = useParams();
  const [clases, setClases] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get(`/cursos/${id}/clases`);
        setClases(response.data);
      } catch (error) {
        console.error("Error al obtener las clases:", error);
      }
    };
    fetchClases();
  }, [id]);

  useEffect(() => {
    const fetchCursoDescripcion = async () => {
      try {
        const response = await axios.get(`/cursos/${id}`);
        setDescripcion(response.data.descripcion);
      } catch (error) {
        console.error("Error al obtener la descripción del curso:", error);
      }
    };
    fetchCursoDescripcion();
  }, [id]);

  useEffect(() => {
    if (claseSeleccionada && claseSeleccionada.url && claseSeleccionada.platform === "vimeo") {
      const vimeoPlayer = new Vimeo(`vimeoPlayer-${claseSeleccionada.id}`, {
        id: claseSeleccionada.url,
      });
      return () => {
        vimeoPlayer.destroy();
      };
    }
  }, [claseSeleccionada]);

  const extractYoutubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleClaseClick = (clase) => {
    setClaseSeleccionada(clase);
  };

  return (
    <div className="container p-6 lg:w-3/5">
      <h1 className="text-3xl font-bold mb-4">Detalle del Curso</h1>
      <div className="mb-6">{descripcion}</div>
      <h2 className="text-2xl font-semibold mb-2">Clases del Curso</h2>
      <ul className="space-y-4">
        {clases.map((clase) => (
          <li
            key={clase.id}
            className={`cursor-pointer bg-gray-200 p-4 rounded-lg ${
              claseSeleccionada && claseSeleccionada.id === clase.id ? "bg-blue-200" : ""
            }`}
            onClick={() => handleClaseClick(clase)}
          >
            <h3 className="text-xl font-semibold mb-2">{clase.name}</h3>
            {claseSeleccionada && claseSeleccionada.id === clase.id && (
              <div className="aspect-w-16 aspect-h-9">
                {claseSeleccionada && claseSeleccionada.url && claseSeleccionada.platform === "vimeo" ? (
                  <div id={`vimeoPlayer-${claseSeleccionada.id}`} />
                ) : claseSeleccionada && claseSeleccionada.url && claseSeleccionada.platform === "youtube" ? (
                  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      title="url"
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${extractYoutubeVideoId(claseSeleccionada.url)}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : claseSeleccionada && claseSeleccionada.pdfURL ? (
                  <div>
                    <ul className="space-y-2">
                      <li key={claseSeleccionada.id}>
                        {claseSeleccionada.id === claseSeleccionada?.id && (
                          <a
                            href={claseSeleccionada.pdfURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-md"
                          >
                            <span>{claseSeleccionada.name} PDF</span>
                            <button className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-md">
                              Ver Taller
                            </button>
                          </a>
                        )}
                      </li>
                    </ul>
                  </div>
                ) : (
                  <p>No hay contenido disponible para esta clase.</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CursoClases;