import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import fondo from "../../assets/Fondo1.jpg";
import { FiRadio } from "react-icons/fi";

export default function TransmisionDetails(props) {
  const [transmision, setTransmision] = useState(null);

  useEffect(() => {
    async function fetchTransmisionDetails() {
      try {
        const response = await axios.get(`/transmisiones/${props.id}`);
        setTransmision(response.data);
      } catch (error) {
        console.error("Error fetching transmision details:", error);
      }
    }
    fetchTransmisionDetails();
  }, [props.id]);

  if (!transmision) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  const extractYouTubeId = (url) => {
    const regExp =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const videoId = transmision.urltransmision
    ? extractYouTubeId(transmision.urltransmision)
    : null;
  const videoUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
    : "";

  const iconStyle = {
    animation: "blink 2s infinite",
    color: "red",
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${fondo})`,
          filter: "blur(3px)",
        }}
      ></div>
      <div className="max-w-2xl w-full p-5 m-5 bg-white/80 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden z-10 relative">
        <h2 className="text-2xl font-bold mb-2">{transmision.titulo}</h2>
        <p>{transmision.descripcion}</p>
        {transmision.urltransmision && (
          <div className="mt-4 flex items-center justify-center">
            <iframe
              title="Video de transmisión"
              width="640" // Aumentar el ancho
              height="360" // Aumentar la altura
              src={videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mx-auto"
            ></iframe>
          </div>
        )}
        <div className="flex py-3">
        <p className="px-2">Estado: </p>
        <p
          className={`${
            transmision.estado ? "text-green-500" : "text-red-500"
          } font-semibold`}
        >
          {transmision.estado ? (
            <span>
              En vivo{" "}
              <FiRadio style={iconStyle} className="inline-block ml-2" />
            </span>
          ) : (
            "Finalizada"
          )}
        </p>
        </div>
      </div>
    </div>
  );
}

TransmisionDetails.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};