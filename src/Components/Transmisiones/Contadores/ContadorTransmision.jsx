import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import NoTransmisionActiva from "../NoTransmisionActiva";

export default function ContadorTransmision() {
  const [transmision, setTransmision] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState({});
  const [eventoActivo, setEventoActivo] = useState(false);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarTransmisiones() {
      try {
        const response = await axios.get("/transmisiones");
        const transmisionesActivas = response.data.filter((t) => t.estado);
        if (transmisionesActivas.length > 0) {
          const ultimaTransmision = transmisionesActivas[0];
          setTransmision(ultimaTransmision);
          const diferencia =
            new Date(ultimaTransmision.fechaTransmision) - new Date();
          setEventoActivo(diferencia <= 0);
        } else {
          setTransmision(null);
        }
      } catch (error) {
        console.error("Error al cargar transmisiones:", error);
      }
    }
    cargarTransmisiones();
  }, []);

  useEffect(() => {
    let interval;
    if (transmision && !eventoActivo) {
      interval = setInterval(() => {
        setAnimating(true);
        const diferencia = new Date(transmision.fechaTransmision) - new Date();
        if (diferencia > 0) {
          setTiempoRestante({
            dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
            horas: Math.floor(
              (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            ),
            minutos: Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)),
            segundos: Math.floor((diferencia % (1000 * 60)) / 1000),
          });
        } else {
          clearInterval(interval);
          setEventoActivo(true);
        }
        setAnimating(false);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [transmision, eventoActivo]);

  const extractYouTubeId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };
  //console.log('datos transmisiones: ', transmision);

  return (
    <div className="flex flex-col px-10">
      <h1 className="text-4xl text-gray-800 md:text-5xl font-semibold mb-10 mt-8 text-center">Transmisiones en vivo</h1>
      {transmision ? (
        eventoActivo ? (
          <div className="text-center">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 p-4 pb-8 rounded-xl bg-gray-100">
              {/* Imagen */}
              <div>
                <img
                  src={`https://img.youtube.com/vi/${extractYouTubeId(
                    transmision.urltransmision
                  )}/hqdefault.jpg`}
                  className="object-cover rounded-xl w-full md:w-auto md:max-w-sm drop-shadow-2xl"
                  alt="Miniatura del video"
                  loading="lazy"
                />
              </div>
              {/* Titulo, descripción y autor */}
              <div>
                <div className="flex items-center gap-4">
                  <svg
                    stroke="currentColor"
                    fill="currentColor" 
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="text-5xl text-indigo-500"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
                    </g>
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {transmision.titulo}
                  </h2>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="text-5xl text-indigo-500"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path d="M19.417 6.679C20.447 7.773 21 9 21 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311-1.804-.167-3.226-1.648-3.226-3.489a3.5 3.5 0 0 1 3.5-3.5c-1.073 0-2.099.49-2.748 1.179zm-10 0C10.447 7.773 11 9 11 10.989c0 3.5-2.457 6.637-6.03 8.188l-.893-1.378c3.335-1.804 3.987-4.145 4.247-5.621-.537.278-1.24.375-1.929.311C4.591 12.322 3.17 10.841 3.17 9a3.5 3.5 0 0 1 3.5-3.5c1.073 0 2.099.49 2.748 1.179z"></path>
                    </g>
                  </svg>
                </div>
                <p className="my-4 text-gray-500">
                  ¡Haz clic en el botón para ver la transmisión o visita nuestro
                  canal de YouTube o nuestro perfil en Facebook! ¡No te pierdas
                  ni un segundo de contenido!
                </p>
                <div className="mb-8">
                  <button
                    onClick={() => navigate("/transmision")}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
                  >
                    <PodcastsIcon className="text-white" />
                    <span>Ver transmisión</span>
                  </button>
                  {/* Botones de YouTube y Facebook */}
                  <div className="flex pt-5 space-x-5 items-center justify-center">
                    <a
                      href="https://www.youtube.com/@LlaveparalasNaciones"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-lg"
                    >
                      <YouTubeIcon className="text-white" />
                      <span>Youtube</span>
                    </a>
                    <a
                      href="https://www.facebook.com/fundacionllaveparalasnaciones"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg"
                    >
                      <FacebookIcon className="text-white" />
                      <span>Facebook</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold mb-4">La transmisión</h2>
              <h2 className="text-3xl font-bold mb-4">{transmision.titulo}</h2>
              <h4 className="text-lg font-semibold mb-2">Comenzará en:</h4>
            </div>
            <div className="flex items-center justify-center space-x-4 sm:space-x-10 py-5">
              <div className="flex-1 sm:w-1/4">
                <div
                  className={`bg-blue-200 rounded-lg p-2 sm:p-4 text-center ${
                    animating ? "transition-all duration-500" : ""
                  }`}
                >
                  <span className="text-3xl sm:text-5xl font-semibold">
                    {tiempoRestante.dias}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-700">Días</p>
                </div>
              </div>
              <div className="flex-1 sm:w-1/4">
                <div
                  className={`bg-blue-200 rounded-lg p-2 sm:p-4 text-center ${
                    animating ? "transition-all duration-500" : ""
                  }`}
                >
                  <span className="text-3xl sm:text-5xl font-semibold">
                    {tiempoRestante.horas}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-700">Horas</p>
                </div>
              </div>
              <div className="flex-1 sm:w-1/4">
                <div
                  className={`bg-blue-200 rounded-lg p-2 sm:p-4 text-center ${
                    animating ? "transition-all duration-500" : ""
                  }`}
                >
                  <span className="text-3xl sm:text-5xl font-semibold">
                    {tiempoRestante.minutos}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-700">Minutos</p>
                </div>
              </div>
              <div className="flex-1 sm:w-1/4">
                <div
                  className={`bg-blue-200 rounded-lg p-2 sm:p-4 text-center ${
                    animating ? "transition-all duration-500" : ""
                  }`}
                >
                  <span className="text-3xl sm:text-5xl font-semibold">
                    {tiempoRestante.segundos}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-700">Segundos</p>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <NoTransmisionActiva />
      )}
    </div>
  );
}