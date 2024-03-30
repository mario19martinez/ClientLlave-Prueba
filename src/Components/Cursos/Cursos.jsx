import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CursoClases() {
  const { id } = useParams();
  const [clases, setClases] = useState([]);
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get(`/cursos/${id}/clases`);
        const sortedClases = response.data.sort((a, b) => a.id - b.id); // Orden ascendente por id
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

  const extractYoutubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div className="container p-6 lg:w-3/5">
      <div className="mb-6">{descripcion}</div>
      <h2 className="text-2xl font-semibold mb-2 py-6">Clases del Curso</h2>
      <ul className="space-y-4">
        {clases.map((clase) => (
          <li key={clase.id} className="bg-gray-200 p-4 rounded-lg">
            
            <div className="aspect-w-16 aspect-h-9">
              {clase.url && clase.platform === "youtube" ? (
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    title={`youtube-${clase.id}`}
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${extractYoutubeVideoId(clase.url)}`}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : clase.pdfURL ? (
                <div>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href={clase.pdfURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        <span>{clase.name} PDF</span>
                        <button className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-md">
                          Ver Taller
                        </button>
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <p>No hay contenido disponible para esta clase.</p>
              )}
            </div>
            <h3 className="text-xl font-semibold py-2">{clase.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CursoClases;