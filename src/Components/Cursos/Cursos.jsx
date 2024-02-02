import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchClases } from "../../Redux/features/lesson/lessonSlice";
import { fetchCursoDetail } from "../../Redux/features/courses/coursesSlice";
import Vimeo from "@vimeo/player";

function CursoClases() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const clases = useSelector((state) => state.lesson.clases);
  const status = useSelector((state) => state.lesson.status);
  const error = useSelector((state) => state.lesson.error);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (claseSeleccionada && claseSeleccionada.url) {
      if (claseSeleccionada.platform === "vimeo") {
        const vimeoPlayer = new Vimeo(`vimeoPlayer-${claseSeleccionada.id}`, {
          id: claseSeleccionada.url,
        });
        return () => {
          vimeoPlayer.destroy();
        };
      }
    }
  }, [claseSeleccionada]);

  useEffect(() => {
    dispatch(fetchCursoDetail(id)).then((response) => {
      if (response.payload) {
        setDescripcion(response.payload.descripcion);
      }
    });
    dispatch(fetchClases(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return <div className="text-center mt-4">Cargando...</div>;
  }
  if (status === "failed") {
    return <div className="text-center text-red-500 mt-4">Error: {error}</div>;
  }

  const handleClaseClick = (clase) => {
    setClaseSeleccionada(clase);
  };

  const extractYoutubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
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
              claseSeleccionada && claseSeleccionada.id === clase.id
                ? "bg-blue-200"
                : ""
            }`}
            onClick={() => handleClaseClick(clase)}
          >
            <h3 className="text-xl font-semibold mb-2">{clase.name}</h3>
            {claseSeleccionada && claseSeleccionada.id === clase.id && (
              <div className="aspect-w-16 aspect-h-9">
                {claseSeleccionada &&
                claseSeleccionada.url &&
                claseSeleccionada.platform === "vimeo" ? (
                  <div id={`vimeoPlayer-${claseSeleccionada.id}`} />
                ) : claseSeleccionada &&
                  claseSeleccionada.url &&
                  claseSeleccionada.platform === "youtube" ? (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "0",
                      paddingBottom: "56.25%",
                    }}
                  >
                    <iframe
                      title="url"
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "60%",
                        height: "70%",
                      }}
                      src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
                        claseSeleccionada.url
                      )}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : claseSeleccionada && claseSeleccionada.pdfURL ? (
                  <div>
                    <ul className="space-y-2">
                      <li key={claseSeleccionada.id}>
                        {claseSeleccionada.id === claseSeleccionada?.id && (
                          <Link
                            to={`/cursos/${id}/clases/${claseSeleccionada.id}/pdf`}
                            className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-md"
                          >
                            <span>{claseSeleccionada.name} PDF</span>
                            <button className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-md">
                              Descargar
                            </button>
                          </Link>
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
