import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import img from "../../../assets/transmisiones.png";

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

  return (
    <div className="flex flex-col px-10">
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
        <div className="flex flex-col-reverse items-center p-1 lg:flex-row lg:justify-center">
          <div className="w-full max-w-xl p-1 mx-auto lg:max-w-screen-xl">
            <div className="mb-1 lg:max-w-lg">
              <h2 className="mb-1 font-sans text-3xl font-bold tracking-tight text-gray-900 text-center sm:text-4xl sm:leading-none">
                Revive nuestras transmisiones en vivo
              </h2>
              <p className="mb-1 text-base text-gray-700 text-center md:text-lg">
                ¡Revive nuestras transmisiones en vivo ahora mismo! Haz clic en
                el botón de abajo para disfrutar de contenido exclusivo.
                ¡Síguenos en nuestras redes sociales para más actualizaciones!
              </p>
              <div className="mb-1 text-center md:mb-1 lg:mb-1">
                <button
                  onClick={() => navigate("/transmisiones")}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  Ver transmisiones
                </button>
              </div>
              <div className="flex flex-col items-center">
                <div className="mb-1 text-sm text-gray-600 md:mb-1">
                  Síguenos:
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href="https://www.instagram.com/llaveparalasnacionesoficial"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    <svg
                      viewBox="0 0 30 30"
                      fill="currentColor"
                      className="h-6"
                    >
                      <circle cx="15" cy="15" r="4" />
                      <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@llaveparalasnacionesok"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 43 43"
                      fill="currentColor"
                      className="h-6"
                    >
                      <title>Tiktok</title>
                      <path d="M38.0766847,15.8542954C36.0693906,15.7935177,34.2504839,14.8341149,32.8791434,13.5466056C32.1316475,12.8317108,31.540171,11.9694126,31.1415066,11.0151329C30.7426093,10.0603874,30.5453728,9.03391952,30.5619062,8L24.9731521,8L24.9731521,28.8295196C24.9731521,32.3434487,22.8773693,34.4182737,20.2765028,34.4182737C19.6505623,34.4320127,19.0283477,34.3209362,18.4461858,34.0908659C17.8640239,33.8612612,17.3337909,33.5175528,16.8862248,33.0797671C16.4386588,32.6422142,16.0833071,32.1196657,15.8404292,31.5426268C15.5977841,30.9658208,15.4727358,30.3459348,15.4727358,29.7202272C15.4727358,29.0940539,15.5977841,28.4746337,15.8404292,27.8978277C16.0833071,27.3207888,16.4386588,26.7980074,16.8862248,26.3604545C17.3337909,25.9229017,17.8640239,25.5791933,18.4461858,25.3491229C19.0283477,25.1192854,19.6505623,25.0084418,20.2765028,25.0219479C20.7939283,25.0263724,21.3069293,25.1167239,21.794781,25.2902081L21.794781,19.5985278C21.2957518,19.4900128,20.7869423,19.436221,20.2765028,19.4380839C18.2431278,19.4392483,16.2560928,20.0426009,14.5659604,21.1729264C12.875828,22.303019,11.5587449,23.9090873,10.7814424,25.7878401C10.003907,27.666593,9.80084889,29.7339663,10.1981162,31.7275214C10.5953834,33.7217752,11.5748126,35.5530237,13.0129853,36.9904978C14.4509252,38.4277391,16.2828722,39.4064696,18.277126,39.8028054C20.2711469,40.1991413,22.3382874,39.9951517,24.2163416,39.2169177C26.0948616,38.4384508,27.7002312,37.1209021,28.8296253,35.4300711C29.9592522,33.7397058,30.5619062,31.7522051,30.5619062,29.7188301L30.5619062,18.8324027C32.7275484,20.3418321,35.3149087,21.0404263,38.0766847,21.0867664L38.0766847,15.8542954Z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/fundacionllaveparalasnaciones"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5"
                    >
                      <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2V2C24,0.895,23.105,0,22,0z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@LlaveparalasNaciones"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6"
                    >
                      <path d="M23.8,7.2c0,0-0.2-1.7-1-2.4c-0.9-1-1.9-1-2.4-1C17,3.6,12,3.6,12,3.6h0c0,0-5,0-8.4,0.2c-0.5,0.1-1.5,0.1-2.4,1c-0.7,0.7-1,2.4-1,2.4S0,9.1,0,11.1v1.8c0,1.9,0.2,3.9,0.2,3.9s0.2,1.7,1,2.4c0.9,1,2.1,0.9,2.6,1c1.9,0.2,8.2,0.2,8.2,0.2s5,0,8.4-0.3c0.5-0.1,1.5-0.1,2.4-1c0.7-0.7,1-2.4,1-2.4s0.2-1.9,0.2-3.9v-1.8C24,9.1,23.8,7.2,23.8,7.2zM9.5,15.1l0-6.7l6.5,3.4L9.5,15.1z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full lg:w-auto">
            <img
              className="object-cover w-full h-auto md:max-w-xl lg:max-w-none rounded-lg shadow-lg lg:rounded-lg lg:shadow-md"
              src={img}
              alt="Transmisiones en vivo"
            />
          </div>
        </div>
      )}
    </div>
  );
}