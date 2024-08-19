import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function NivelClasesDetail({ claseId }) {
  const [clase, setClase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mostrarTexto, setMostrarTexto] = useState(false)
  const [progreso, setProgreso] = useState({});
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [userInfo, setUserInfo] = useState(null)

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
    const fetchClase = async () => {
      try {
        const response = await axios.get(
          `/clase/${claseId}/detalles`
        );
        setClase(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al ver la clase:', error)
        setError(
          "Error al obtener la clase. Por favor, inténtalo de nuevo más tarde."
        );
        setLoading(false);
      }
    };

    fetchClase();

    return () => {};
  }, [claseId]);

  // useEffect que se encarga del seguimiento de las clases
  useEffect(() => {
    if (clase && clase.url) {
      const onYouTubeIframeAPIReady = () => {
        const player = new window.YT.Player(`youtubePlayer-${claseId}`, {
          videoId: extractYoutubeVideoId(clase.url),
          playerVars: {
            controls: 0, // Oculta los controles del video
            disablekb: 1, // Desactiva el teclado para evitar que se use el teclado para manipular el video
            modestbranding: 1, // Muestra menos marcas de YouTube
            playsinline: 1, // Permite la reproducción en línea en dispositivos móviles
            showinfo: 0, // No muestra la información del video (incluyendo la barra de progreso)
            iv_load_policy: 3, // Desactiva las anotaciones
            rel: 1, // Evita que se muestren videos recomendados al final
            fs: 0, // Desactiva el botón de pantalla completa
            autoplay: 1, // Auto-reproduce el video
            loop: 0,

            playlist: extractYoutubeVideoId(clase.url), // Asegura que no se muestre la barra de progreso
          },
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                const intervalId = setTimeout(async () => {
                  const newProgreso = (event.target.getCurrentTime() /  event.target.getDuration()) * 100;
                  setProgreso((prevProgresos) => ({
                    ...prevProgresos,
                    [claseId]: newProgreso,
                  }));
                  const lastSavedProgreso = progreso[claseId] || 0;
                  if (newProgreso - lastSavedProgreso >= 5) {
                    try {
                      await axios.post('/', {
                        userSub: userInfo.sub,
                        grupoId: clase.grupoId,
                        nivelId: clase.nivelId,
                        moduloId: clase.moduloId,
                        claseId,
                        progreso: newProgreso,
                        inicio: new Date().toISOString(),
                      })
                    } catch (error) {
                      console.error('Error al actualizar el progreso:', error);
                    }
                  }
                }, 15000);
                player.intervalId = intervalId;
              } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                clearInterval(player.intervalId);
              }
            }
          }
        });
        setYoutubePlayer(player);
      };

      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        const firstScriptTag = document.getElementsByTagName('script')[0];
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
    }
  }, [clase, userInfo]);

  const extractYoutubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const toggleMostrarTexto = () => {
    setMostrarTexto(!mostrarTexto)
  }

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
      <div className="aspect-w-16 aspect-h-9 mb-6">
        {clase.url && (
          <iframe
          id={`youtubePlayer-${claseId}`}
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
      <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      onClick={toggleMostrarTexto}
      >
        {mostrarTexto ? "Ver menos" : "Ver más"}
      </button>
      {mostrarTexto && clase.texto && (
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