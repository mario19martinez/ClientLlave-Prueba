import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Vimeo from "@vimeo/player";
import axios from "axios";

function ClasesLanding({ id }) {
  const [clases, setClases] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [mostrarTodasClases, setMostrarTodasClases] = useState(true);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get(`/cursos/${id}/clases`);
        const sortedClases = response.data.sort((a, b) => a.id - b.id);
        setClases(sortedClases);
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
    if (
      claseSeleccionada &&
      claseSeleccionada.url &&
      claseSeleccionada.platform === "vimeo"
    ) {
      const vimeoPlayer = new Vimeo(`vimeoPlayer-${claseSeleccionada.id}`, {
        id: claseSeleccionada.url,
      });
      return () => {
        vimeoPlayer.destroy();
      };
    }
  }, [claseSeleccionada]);

  const extractYoutubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleClaseClick = (clase) => {
    if (claseSeleccionada && claseSeleccionada.id === clase.id) {
      setClaseSeleccionada(null);
    } else {
      setClaseSeleccionada(clase);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-8 bg-gray-50">
      <div className="text-center mb-6 text-lg text-gray-700">{descripcion}</div>
      <h2 className="text-3xl font-bold mb-6 text-blue-700">Clases del Curso</h2>
      <div className="flex mb-6">
        <button
          className={`mr-4 px-6 py-3 rounded-lg font-semibold transition ${
            mostrarTodasClases ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setMostrarTodasClases(true)}
        >
          Todas las Clases
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            !mostrarTodasClases ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setMostrarTodasClases(false)}
        >
          Última Clase
        </button>
      </div>
      <ul className="space-y-6 w-full">
        {mostrarTodasClases ? (
          clases.map((clase) => (
            <li
              key={clase.id}
              className={`cursor-pointer p-6 rounded-lg transition ${
                claseSeleccionada && claseSeleccionada.id === clase.id
                  ? "bg-blue-100 shadow-lg"
                  : "bg-white shadow"
              }`}
              onClick={() => handleClaseClick(clase)}
            >
              <div className="py-2">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{clase.name}</h3>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Haz clic para ver más</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 transition-transform ${
                    claseSeleccionada && claseSeleccionada.id === clase.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {claseSeleccionada && claseSeleccionada.id === clase.id && (
                <div className="mt-4">
                  {claseSeleccionada.url && claseSeleccionada.platform === "vimeo" ? (
                    <div id={`vimeoPlayer-${claseSeleccionada.id}`} className="aspect-w-16 aspect-h-9" />
                  ) : claseSeleccionada.url && claseSeleccionada.platform === "youtube" ? (
                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                      <iframe
                        title="url"
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${extractYoutubeVideoId(claseSeleccionada.url)}`}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : claseSeleccionada.pdfURL ? (
                    <div className="mt-4">
                      <a
                        href={claseSeleccionada.pdfURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        <span>{claseSeleccionada.name} PDF</span>
                        <button className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-lg">
                          Ver Taller
                        </button>
                      </a>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No hay contenido disponible para esta clase.</p>
                  )}
                </div>
              )}
            </li>
          ))
        ) : (
          clases.length > 0 && (
            <li
              key={clases[clases.length - 1].id}
              className={`cursor-pointer p-6 rounded-lg transition ${
                claseSeleccionada && claseSeleccionada.id === clases[clases.length - 1].id
                  ? "bg-blue-100 shadow-lg"
                  : "bg-white shadow"
              }`}
              onClick={() => handleClaseClick(clases[clases.length - 1])}
            >
              <div className="py-2">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{clases[clases.length - 1].name}</h3>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Haz clic para ver más</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 transition-transform ${
                    claseSeleccionada && claseSeleccionada.id === clases[clases.length - 1].id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {claseSeleccionada && claseSeleccionada.id === clases[clases.length - 1].id && (
                <div className="mt-4">
                  {claseSeleccionada.url && claseSeleccionada.platform === "vimeo" ? (
                    <div id={`vimeoPlayer-${claseSeleccionada.id}`} className="aspect-w-16 aspect-h-9" />
                  ) : claseSeleccionada.url && claseSeleccionada.platform === "youtube" ? (
                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                      <iframe
                        title="url"
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${extractYoutubeVideoId(claseSeleccionada.url)}`}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : claseSeleccionada.pdfURL ? (
                    <div className="mt-4">
                      <a
                        href={claseSeleccionada.pdfURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        <span>{claseSeleccionada.name} PDF</span>
                        <button className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-lg">
                          Ver Taller
                        </button>
                      </a>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No hay contenido disponible para esta clase.</p>
                  )}
                </div>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

// Validación de tipo para props
ClasesLanding.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ClasesLanding;