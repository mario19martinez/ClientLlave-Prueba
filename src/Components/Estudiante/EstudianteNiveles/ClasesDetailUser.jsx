import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { FaFilePdf, FaDownload, FaCheckCircle, FaClock } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CircularProgress from '@mui/material/CircularProgress';

function ClaseDetailUser({ claseId }) {
  const [clase, setClase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mostrarTexto, setMostrarTexto] = useState(false);
  const [progreso, setProgreso] = useState({});
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [moduloId, setModuloId] = useState(null);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        setModuloId(response.data.clase.moduloId);
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
          const response = await axios.get("/registro-actividad", {
            params: { userSub: userInfo.sub, moduloId: moduloId },
          });
          setProgreso(response.data);
        } catch (error) {
          console.error("error al obtener el progreso:", error);
        }
      };
      fetchRegistro();
    }
  }, [userInfo, moduloId]);

  useEffect(() => {
    if (clase && clase.url && userInfo) {
      const onYouTubeIframeAPIReady = () => {
        const player = new window.YT.Player(`youtubePlayer-${claseId}`, {
          videoId: extractYoutubeVideoId(clase.url),
          playerVars: {
            controls: 1, // Oculta los controles del video
            disablekb: 1, // Desactiva el teclado para evitar que se use el teclado para manipular el video
            modestbranding: 1, // Muestra menos marcas de YouTube
            playsinline: 1, // Permite la reproducción en línea en dispositivos móviles
            showinfo: 0, // No muestra la información del video (incluyendo la barra de progreso)
            iv_load_policy: 3, // Desactiva las anotaciones
            rel: 1, // Evita que se muestren videos recomendados al final
            fs: 1, // Desactiva el botón de pantalla completa
            autoplay: 1, // Auto-reproduce el video
            loop: 0,

            playlist: extractYoutubeVideoId(clase.url), // Asegura que no se muestre la barra de progreso
          },
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                const intervalId = setInterval(async () => {
                  const currentTime = event.target.getCurrentTime();
                  const duration = event.target.getDuration();
                  const newProgreso = (currentTime / duration) * 100;
      
                  console.log(`Current Time: ${currentTime}, Duration: ${duration}, New Progreso: ${newProgreso}`);
      
                  setProgreso((prevProgresos) => ({
                    ...prevProgresos,
                    [claseId]: newProgreso,
                  }));
      
                  const lastSavedProgreso = progreso[claseId] || 0;
      
                  if (newProgreso >= 100) {
                    clearInterval(intervalId);
                    console.log("Progreso completo, intervalo detenido.");
                  } else if (newProgreso - lastSavedProgreso >= 5) {
                    try {
                      await axios.post("/movimiento-usuario", {
                        userSub: userInfo.sub,
                        moduloId: clase.moduloId,
                        claseId,
                        progreso: newProgreso,
                      });
                      console.log("Progreso enviado al backend:", newProgreso);
                    } catch (error) {
                      console.error("Error al actualizar el progreso:", error);
                    }
                  }
                }, 60000);
      
                player.intervalId = intervalId;
              } else if (
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.ENDED
              ) {
                clearInterval(player.intervalId);
                player.intervalId = null;
                console.log("Reproductor pausado o terminado, intervalo limpiado.");
              } else if (event.data === window.YT.PlayerState.BUFFERING) {
                alert(
                  "Para aprovechar al máximo el contenido y no perder ningún detalle importante, te recomendamos ver la clase en su totalidad sin adelantar. ¡Cada minuto cuenta para tu aprendizaje!"
                )
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
          youtubePlayer.intervalId = null;
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

  const handleDownloadPdf = async () => {
    const htmlContent = clase.pdfURL;
    const opt = {
      margin: 0,
      filename: `Material_de_apoyo_${clase.name}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    const worker = html2pdf().from(htmlContent).set(opt);
    worker
      .toPdf()
      .get("pdf")
      .then(function (pdf) {
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setPage(i).setFontSize(10);
          pdf
            .setPage(i)
            .text(
              `Page ${i} of ${totalPages}`,
              pdf.internal.pageSize.getWidth() / 2 - 40,
              pdf.internal.pageSize.getHeight() - 30
            );
        }
      })
      .save();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDownload = () => {
    handleDownloadPdf();
    setOpen(false);
  };

  const handleViewInBrowser = () => {
    if (clase.pdfURL) {
      const newWindow = window.open();
      newWindow.document.open();
      newWindow.document.write(clase.pdfURL);
      newWindow.document.close();
    } else {
      console.error("No se encontró el contenido HTML.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
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

  const progressColor =
    (progreso[claseId] || 0) > 80 ? "bg-green-500" : "bg-yellow-500";
  const progressIcon =
    (progreso[claseId] || 0) > 80 ? (
      <FaCheckCircle className="text-green-500" />
    ) : (
      <FaClock className="text-blue-500" />
    );

  return (
    <div className="max-w-3xl p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{clase.name}</h2>
      {clase.url && (
        <div className="relative pt-1 mb-6">
          <div className="flex mb-2 items-center justify-between">
            <div className="flex items-center">
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Progreso
              </span>
              <span className="ml-2">{progressIcon}</span>
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
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${progressColor}`}
            ></div>
          </div>
        </div>
      )}
      {clase.url && (
        <div
          className="mb-8 relative"
          style={{
            paddingTop: "56.25%",
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div
            id={`youtubePlayer-${claseId}`}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      )}
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
        <Button
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
          className="inline-flex items-center space-x-2"
          style={{
            borderRadius: "500px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <FaFilePdf className="text-xl" />
          <span className="font-semibold text-sm">Material de apoyo</span>
          <FaDownload className="text-xl" />
        </Button>
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Descargar Material de Apoyo"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estás a punto de descargar un PDF con el material de apoyo de la
            clase <strong>{clase.name}</strong>.
            <br />
            <br />
            <strong>Si prefieres verlo en tu navegador:</strong>
            <ul>
              <li>
                <div className="flex space-x-1">
                  <strong>1. </strong>
                  Se abrirá en una nueva pestaña de tu navegador.
                </div>
              </li>
            </ul>
            <br />
            <br />
            <strong>Si decides descargar el PDF:</strong>
            <br />
            <ul>
              <li>
                <div className="flex space-x-1">
                  <strong>1. </strong>
                  En dispositivos móviles, revisa tu carpeta de descargas.
                </div>
              </li>
              <li>
                <div className="flex space-x-1">
                  <strong>2. </strong>
                  En computadoras de escritorio, el archivo se descargará
                  automáticamente en la carpeta de descargas.
                </div>
              </li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleViewInBrowser}>Ver en navegador</Button>
          <Button
            onClick={handleConfirmDownload}
            color="primary"
            variant="contained"
            autoFocus
          >
            Descargar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ClaseDetailUser.propTypes = {
  claseId: PropTypes.string.isRequired,
};

export default ClaseDetailUser;
