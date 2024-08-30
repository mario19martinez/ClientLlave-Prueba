import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NoTransmisionActiva() {
  const navigate = useNavigate();
  const [latestVideo, setLatestVideo] = useState(null);

  useEffect(() => {
    const fetchTransmisiones = async () => {
      try {
        const response = await axios.get("/transmisiones");
        const videos = response.data;

        if (videos.length > 0) {
          // Ordena los videos por fecha de creación (de más reciente a más antigua)
          videos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          // Selecciona el video más reciente
          const latest = videos[0];
          setLatestVideo(latest);
        }
      } catch (error) {
        console.error("Error fetching transmisiones:", error);
      }
    };

    fetchTransmisiones();
  }, []);

  // Genera la URL de la miniatura de YouTube usando el ID del video
  const getThumbnailUrl = (videoUrl) => {
    try {
      const url = new URL(videoUrl);
      const isLive = url.pathname.startsWith("/live");
      const videoId = isLive
        ? url.pathname.split("/")[2]
        : url.searchParams.get("v");

      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    } catch (error) {
      console.error("Error generating thumbnail URL:", error);
      return ""; // Retorna una cadena vacía o una URL de miniatura predeterminada en caso de error
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center p-4 lg:h-screen">
      <div className="flex flex-col w-full lg:w-1/2 p-4 items-center">
        <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 text-center sm:text-4xl sm:leading-none">
          Revive nuestras transmisiones en vivo
        </h2>
        <p className="mb-4 text-base text-gray-700 text-center md:text-lg">
          ¡Revive nuestras transmisiones en vivo ahora mismo! Haz clic en el
          botón de abajo para disfrutar de contenido exclusivo. ¡Síguenos en
          nuestras redes sociales para más actualizaciones!
        </p>
        <div className="mb-4 text-center">
          <button
            onClick={() => navigate("/transmisiones")}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Ver transmisiones
          </button>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <div className="mb-1 text-sm text-gray-600 md:mb-1">Síguenos:</div>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com/llaveparalasnacionesoficial"
              className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
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
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2V2C24,0.895,23.105,0,22,0z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@LlaveparalasNaciones"
              className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6">
                <path d="M23.8,7.2c0,0-0.2-1.7-1-2.4c-0.9-1-1.9-1-2.4-1C17,3.6,12,3.6,12,3.6h0c0,0-5,0-8.4,0.2c-0.5,0.1-1.5,0.1-2.4,1c-0.7,0.7-1,2.4-1,2.4S0,9.1,0,11.1v1.8c0,1.9,0.2,3.9,0.2,3.9s0.2,1.7,1,2.4c0.9,1,2.1,0.9,2.6,1c1.9,0.2,8.2,0.2,8.2,0.2s5,0,8.4-0.3c0.5-0.1,1.5-0.1,2.4-1c0.7-0.7,1-2.4,1-2.4s0.2-1.9,0.2-3.9v-1.8C24,9.1,23.8,7.2,23.8,7.2zM9.5,15.1l0-6.7l6.5,3.4L9.5,15.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      {latestVideo && (
        <div className="flex items-center justify-center w-full lg:w-1/2 p-4">
          <a
            href={latestVideo.urltransmision}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="object-cover w-full h-auto rounded-lg shadow-lg lg:shadow-md"
              src={getThumbnailUrl(latestVideo.urltransmision)}
              alt={latestVideo.titulo}
            />
          </a>
        </div>
      )}
    </div>
  );
}
