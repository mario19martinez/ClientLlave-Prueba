// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CursoClases() {
  const { id } = useParams();
  const [clases, setClases] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [mostrarTodasClases, setMostrarTodasClases] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [progreso, setProgreso] = useState({});
  const [youtubePlayer, setYoutubePlayer] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/user-info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error al obtener información del usuario:", error);
      }
    };
    getUserInfo();
  }, []);

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

  // Este useEffect es para obtener el progreso de las clases
  useEffect(() => {
    if (userInfo && userInfo.sub) {
      const fetchProgreso = async () => {
        try {
          const response = await axios.get('/progresos', {
            params: { userSub: userInfo.sub, cursoId: id },
          })
          setProgreso(response.data);
        } catch (error) {
          console.error('Error al obtener el progreso:', error);
        }
      };
      fetchProgreso();
    }
  }, [userInfo, id]);


  // useEffect que se encarga del seguimiento de las clases
  useEffect(() => {
    if (claseSeleccionada && claseSeleccionada.url && claseSeleccionada.platform === "youtube") {
      const onYouTubeIframeAPIReady = () => {
        const player = new window.YT.Player(`youtubePlayer-${claseSeleccionada.id}`, {
          videoId: extractYoutubeVideoId(claseSeleccionada.url),
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                const intervalId = setInterval(async () => {
                  const newProgreso = (event.target.getCurrentTime() / event.target.getDuration()) * 100;
                  setProgreso((prevProgresos) => ({
                    ...prevProgresos,
                    [claseSeleccionada.id]: newProgreso,
                  }));
                  const lastSavedProgreso = progreso[claseSeleccionada.id] || 0;
                  if (newProgreso - lastSavedProgreso >= 5) {
                    try {
                      await axios.post("/seguimiento-clases", {
                        userSub: userInfo.sub,
                        cursoId: id,
                        claseId: claseSeleccionada.id,
                        progreso: newProgreso,
                      });
                    } catch (error) {
                      console.error("Error al actualizar el progreso:", error);
                    }
                  }
                }, 15000);
                player.intervalId = intervalId;
              } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                clearInterval(player.intervalId);
              }
            },
          },
        });
        setYoutubePlayer(player);
      };
  
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        onYouTubeIframeAPIReady();
      }
  
      return () => {
        if (youtubePlayer && youtubePlayer.intervalId) {
          clearInterval(youtubePlayer.intervalId);
        }
        if (youtubePlayer) {
          youtubePlayer.destroy();
        }
        setYoutubePlayer(null);
      };
    } else {
      if (youtubePlayer && youtubePlayer.intervalId) {
        clearInterval(youtubePlayer.intervalId);
      }
      setYoutubePlayer(null);
    }  }, [claseSeleccionada, userInfo, id]);

  const extractYoutubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleClaseClick = async (clase) => {
    console.log('clase seleccionada:', clase)
    if (claseSeleccionada && claseSeleccionada.id === clase.id) {
      setClaseSeleccionada(null);
    } else {
      setClaseSeleccionada(clase);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-2">
      <div className="mb-6">{descripcion}</div>
      <h2 className="text-2xl font-semibold mb-2 py-6">Clases del Curso</h2>
      <div className="flex mb-4">
        <button
          className={`mr-4 px-4 py-2 rounded-md ${
            mostrarTodasClases ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setMostrarTodasClases(true)}
        >
          Todas las Clases
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            !mostrarTodasClases ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setMostrarTodasClases(false)}
        >
          Última Clase
        </button>
      </div>
      <ul className="space-y-4 w-full">
        {mostrarTodasClases
          ? clases.map((clase) => (
              <li
                key={clase.id}
                className={`cursor-pointer p-4 rounded-lg ${
                  clase.pdfURL ? "bg-blue-200" : "bg-gray-200"
                } ${
                  claseSeleccionada && claseSeleccionada.id === clase.id
                    ? "bg-blue-200"
                    : ""
                }`}
                onClick={() => handleClaseClick(clase)}
              >
                <div className="py-1">
                  <h3 className="text-xl font-semibold mb-2">{clase.name}</h3>
                  {claseSeleccionada && claseSeleccionada.id === clase.id && (
                    <div className="w-full">
                      <div className="flex items-center">
                        <div className="w-full mr-2">
                          <div className="h-2 bg-white rounded-full">
                          <div
                              className={`h-2 rounded-full ${
                                progreso[clase.id] >= 80
                                  ? "bg-green-500"
                                  : "bg-yellow-500"
                              }`}
                              style={{
                                width: `${progreso[clase.id] || 0}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <span>{`${(progreso[clase.id] || 0).toFixed(1)}%`}</span>
                        {/* <span>{`${Math.round(progreso[clase.id] || 0)}%`}</span> */}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 mb-4">
                    Haz clic para ver más
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${
                      claseSeleccionada && claseSeleccionada.id === clase.id
                        ? "transform rotate-180"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {claseSeleccionada && claseSeleccionada.id === clase.id && (
                  <div className="aspect-w-16 aspect-h-9">
                    {claseSeleccionada &&
                    claseSeleccionada.url &&
                    claseSeleccionada.platform === "youtube" ? (
                      <div
                        className="relative w-full"
                        style={{ paddingTop: "10.25%" }}
                      >
                        <div id={`youtubePlayer-${claseSeleccionada.id}`} />
                      </div>
                    ) : claseSeleccionada && claseSeleccionada.pdfURL ? (
                      <div>
                        <ul className="space-y-2">
                          <li key={claseSeleccionada.id}>
                            {claseSeleccionada.id === clase.id && (
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
            ))
          : clases.length > 0 && (
              <li
                className={`cursor-pointer p-4 rounded-lg ${
                  clases[clases.length - 1].pdfURL
                    ? "bg-blue-200"
                    : "bg-gray-200"
                } ${
                  claseSeleccionada &&
                  claseSeleccionada.id === clases[clases.length - 1].id
                    ? "bg-blue-200"
                    : ""
                }`}
                onClick={() => handleClaseClick(clases[clases.length - 1])}
              >
                <div className="py-1">
                  <h3>{clases[clases.length - 1].name}</h3>
                  {claseSeleccionada &&
                    claseSeleccionada.id === clases[clases.length - 1].id && (
                      <div className="w-full">
                        <div className="flex items-center">
                          <div className="w-full mr-2">
                            <div className="h-2 bg-gray-200 rounded-full">
                            <div
                                className={`h-full rounded-full ${
                                  progreso[clases[clases.length - 1].id] >= 80
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                                }`}
                                style={{
                                  width: `${
                                    progreso[clases[clases.length - 1].id] || 0
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <span>{`${(progreso[clases[clases.length - 1].id] || 0).toFixed(1)}%`}</span>
                          {/* <span>{`${Math.round(
                            progreso[clases[clases.length - 1].id] || 0
                          )}%`}</span> */}
                        </div>
                      </div>
                    )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 mb-4">
                    Haz clic para ver más
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${
                      claseSeleccionada &&
                      claseSeleccionada.id === clases[clases.length - 1].id
                        ? "transform rotate-180"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {claseSeleccionada &&
                  claseSeleccionada.id === clases[clases.length - 1].id && (
                    <div className="aspect-w-16 aspect-h-0">
                      {claseSeleccionada &&
                      claseSeleccionada.url &&
                      claseSeleccionada.platform === "youtube" ? (
                        <div
                          className="relative w-full"
                          style={{ paddingTop: "56.25%" }}
                        >
                          <div id={`youtubePlayer-${claseSeleccionada.id}`} />
                        </div>
                      ) : claseSeleccionada && claseSeleccionada.pdfURL ? (
                        <div>
                          <ul className="space-y-2">
                            <li key={claseSeleccionada.id}>
                              {claseSeleccionada.id ===
                                clases[clases.length - 1].id && (
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
            )}
      </ul>
    </div>
  );
}

export default CursoClases;