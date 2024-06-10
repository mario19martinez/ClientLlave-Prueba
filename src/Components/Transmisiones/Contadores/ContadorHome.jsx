import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiRadio } from "react-icons/fi";

export default function ContadorHome() {
  const [transmision, setTransmision] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState({});
  const [eventoActivo, setEventoActivo] = useState(false);
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
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [transmision, eventoActivo]);

  // Estilos para la animación del icono
  const iconStyle = {
    animation: "blink 2s infinite",
    color: "red",
  };

  if (!transmision) {
    console.log("No hay transmisión activa para mostrar.");
    return null;
  }

  return (
    <div className="bg-gray-200 text-gray-800 py-3 px-4 w-full">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <div>
          <h2 className="text-lg sm:text-xl font-bold">
            {transmision.titulo} - En Vivo
          </h2>
          <p className="text-xs sm:text-sm">Transmisión en vivo disponible.</p>
        </div>
        {!eventoActivo && (
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2 sm:mt-0">
            <div className="flex flex-col justify-center items-center">
              <div className="text-blue-600">
                <span className="text-lg sm:text-2xl font-semibold">
                  {tiempoRestante.dias}
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-700">Días</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="text-blue-600">
                <span className="text-lg sm:text-2xl font-semibold">
                  {tiempoRestante.horas}
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-700">Horas</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="text-blue-600">
                <span className="text-lg sm:text-2xl font-semibold">
                  {tiempoRestante.minutos}
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-700">
                Minutos
              </span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="text-blue-600">
                <span className="text-lg sm:text-2xl font-semibold">
                  {tiempoRestante.segundos}
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-700">
                Segundos
              </span>
            </div>
          </div>
        )}
        {eventoActivo && (
          <a
            href=""
            onClick={() => navigate("/transmision")}
            className="bg-blue-400 text-white font-medium px-4 py-2 rounded hover:bg-blue-500 transition duration-300 mt-2 sm:mt-0 flex items-center"
          >
            <FiRadio style={iconStyle} className="mr-2" /> Ver en vivo
          </a>
        )}
      </div>
    </div>
  );
}

// Agregar la animación de blink en un <style> global o en tu archivo CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;
document.head.append(style);
