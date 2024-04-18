// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import fondo from '../../assets/Fondo1.jpg';
import axios from "axios";

export default function Transmision() {
  const [ultimaTransmision, setUltimaTransmision] = useState(null);

  useEffect(() => {
    const cargarUltimaTransmision = async () => {
      try {
        const response = await axios.get("http://localhost:3000/transmisiones");
        const transmisiones = response.data;

        if (transmisiones.length > 0) {
          const ultima = transmisiones.reduce((prev, current) => {
            return new Date(prev.createdAt) > new Date(current.createdAt) ? prev : current;
          });
          setUltimaTransmision(ultima);
        }
      } catch (error) {
        console.error("Error al obtener la última transmisión:", error);
      }
    };

    cargarUltimaTransmision();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
      {/* Fondo borroso */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fondo})`, filter: 'blur(3px)' }}></div>

      {/* Contenido */}
      <div className="max-w-2xl w-full p-5 m-5 bg-white/80 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden z-10 relative">
        {ultimaTransmision ? (
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {ultimaTransmision.titulo}
            </h2>
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${ultimaTransmision.urltransmision.split("watch?v=")[1]}?autoplay=1&mute=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            ></iframe>
            <p className="mt-4">
              Estado: <span className={ultimaTransmision.estado ? "text-green-500" : "text-red-500"}>
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