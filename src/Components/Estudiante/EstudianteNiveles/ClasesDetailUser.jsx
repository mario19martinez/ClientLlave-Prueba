import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa";

function ClaseDetailUser({ claseId }) {
  const [clase, setClase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const [progreso, setProgreso] = useState({});
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [moduloId, setModuloId] = useState(null);

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
    const fetchClaseDetail = async () => {
      try {
        setLoading(true);
        setClase(null);
        const response = await axios.get(`/clase/${claseId}/detalles`);
        setClase(response.data.clase);
        setModuloId(response.data.clase.moduloId)
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

  useEffect(() => {
    if (userInfo && userInfo.sub && moduloId) {
      const fetchRegistro = async () => {
        try {
          const response = await axios.get('/registro-actividad', {
            params: { userSub: userInfo.sub, moduloId: moduloId },
          })
          setProgreso(response.data);
        } catch (error) {
          console.error('error al obtener el progreso:', error);
        }
      }
      fetchRegistro()
    }
  }, [userInfo, moduloId])
  

  useEffect(() => {
    if (clase && clase.url && userInfo) {
      const onYouTubeIframeAPIReady = () => {
        const player = new window.YT.Player(`youtubePlayer-${claseId}`, {
          videoId: extractYoutubeVideoId(clase.url),
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                const intervalId = setInterval(async () => {
                  const currentTime = event.target.getCurrentTime();
                  const duration = event.target.getDuration();
                  const newProgreso = (currentTime / duration) * 100;
                  setProgreso((prevProgresos) => ({
                    ...prevProgresos,
                    [claseId]: newProgreso,
                  }));
                  const lastSavedProgreso = progreso[claseId] || 0;
                  if (newProgreso >= 100) {
                    clearInterval(intervalId); // Detener el intervalo si el progreso llega al 100%
                  } else if (newProgreso - lastSavedProgreso >= 5) {
                    try {
                      await axios.post("/movimiento-usuario", {
                        userSub: userInfo.sub,
                        moduloId: clase.moduloId,
                        claseId,
                        progreso: newProgreso,
                      });
                    } catch (error) {
                      console.error("Error al actualizar el progreso:", error);
                    }
                  }
                }, 15000);
                player.intervalId = intervalId;
              } else if (
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.ENDED
              ) {
                clearInterval(player.intervalId);
                player.intervalId = null; // Asegurarse de que el intervalo no se ejecute de nuevo
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
          youtubePlayer.intervalId = null
        }
        if (youtubePlayer) {
          youtubePlayer.destroy();
        }
        setYoutubePlayer(null);
      };
    }
  }, [clase, userInfo, claseId, moduloId]);

  const extractYoutubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/;
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
      <div className="relative pt-1 mb-6">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Progreso
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              {Math.round(progreso[claseId] || 0)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
          <div
          style={{ width: `${Math.round(progreso[claseId] || 0)}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
          ></div>
        </div>
      </div>
      <div className="mb-8 relative" style={{ paddingTop: "56.25%", width: "100%", maxWidth: "800px", margin: "0 auto" }}>
        {clase.url && (
          <div
          id={`youtubePlayer-${claseId}`}
          className="absolute top-0 left-0 w-full h-full"
        />
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
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <FaFilePdf className="inline-block mr-2" />
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