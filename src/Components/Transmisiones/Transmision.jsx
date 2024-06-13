import { useState, useEffect } from "react";
import axios from "axios";
import fondo from "../../assets/Fondo1.jpg";

export default function Transmision() {
  const [ultimaTransmision, setUltimaTransmision] = useState(null);
  const [contador, setContador] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    async function cargarUltimaTransmision() {
      try {
        const response = await axios.get("/transmisiones");
        const transmisiones = response.data.filter((tr) => tr.estado);
        if (transmisiones.length > 0) {
          const ahora = new Date();
          const proximas = transmisiones.filter(
            (tr) => new Date(tr.fechaTransmision) > ahora
          );
          const ultima = proximas.length > 0 ? proximas[0] : transmisiones[0];
          setUltimaTransmision(ultima);
        }
      } catch (error) {
        console.error("Error al obtener la última transmisión:", error);
      }
    }

    cargarUltimaTransmision();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        ultimaTransmision &&
        new Date(ultimaTransmision.fechaTransmision) > new Date()
      ) {
        const diferencia =
          new Date(ultimaTransmision.fechaTransmision) - new Date();
        setContador({
          dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
          horas: Math.floor(
            (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutos: Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)),
          segundos: Math.floor((diferencia % (1000 * 60)) / 1000),
        });
      } else {
        setContador({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ultimaTransmision]);

  const extractYouTubeId = (url) => {
    const regExp =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  const videoId = ultimaTransmision ? extractYouTubeId(ultimaTransmision.urltransmision) : null;
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "thumbnail.jpg";

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${fondo})`, filter: "blur(3px)" }}
      ></div>
      <div className="max-w-2xl w-full p-5 m-5 bg-white/80 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden z-10 relative">
        {ultimaTransmision ? (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {ultimaTransmision.titulo}
            </h2>
            {new Date() < new Date(ultimaTransmision.fechaTransmision) ? (
              <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
                <h2 className="text-lg font-bold text-center mb-4">
                  Tiempo restante para la transmisión:
                </h2>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="text-blue-500">
                    <span className="text-2xl font-semibold">
                      {contador.dias}
                    </span>
                    <p className="text-xs text-gray-500">Días</p>
                  </div>
                  <div className="text-blue-500">
                    <span className="text-2xl font-semibold">
                      {contador.horas}
                    </span>
                    <p className="text-xs text-gray-500">Horas</p>
                  </div>
                  <div className="text-blue-500">
                    <span className="text-2xl font-semibold">
                      {contador.minutos}
                    </span>
                    <p className="text-xs text-gray-500">Minutos</p>
                  </div>
                  <div className="text-blue-500">
                    <span className="text-2xl font-semibold">
                      {contador.segundos}
                    </span>
                    <p className="text-xs text-gray-500">Segundos</p>
                  </div>
                </div>
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail de la transmisión"
                  className="mt-4 w-full h-auto"
                />
              </div>
            ) : (
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video player"
              ></iframe>
            )}
            <p className="mt-4">
              Estado:{" "}
              <span
                className={
                  ultimaTransmision.estado ? "text-green-500" : "text-red-500"
                }
              >
                {ultimaTransmision.estado ? "Activa" : "Inactiva"}
              </span>
            </p>
          </div>
        ) : (
          <p className="text-lg text-red-500">
            No se encontró la última transmisión.
          </p>
        )}
      </div>
    </div>
  );
}