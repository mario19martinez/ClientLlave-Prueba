// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ContadorHome() {
  const [transmision, setTransmision] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState({});

  useEffect(() => {
    async function cargarTransmisiones() {
      try {
        const response = await axios.get("/transmisiones");
        const transmisionesActivas = response.data.filter(t => t.estado);
        if (transmisionesActivas.length > 0) {
          const ultimaTransmision = transmisionesActivas[0];
          setTransmision(ultimaTransmision);
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
    if (transmision) {
      interval = setInterval(() => {
        const diferencia = new Date(transmision.fechaTransmision) - new Date();
        if (diferencia > 0) {
          setTiempoRestante({
            dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
            horas: Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutos: Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)),
            segundos: Math.floor((diferencia % (1000 * 60)) / 1000),
          });
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [transmision]);

  if (!transmision) {
    console.log("No hay transmisión activa para mostrar.");
    return null;
  }

  return (
    <div className="bg-gray-100 text-gray-800 py-3 px-4 w-full">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <div>
          <h2 className="text-lg sm:text-xl font-bold">{transmision.titulo} - En Vivo</h2>
          <p className="text-xs sm:text-sm">Transmisión en vivo disponible.</p>
        </div>
        {new Date() < new Date(transmision.fechaTransmision) && (
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2 sm:mt-0">
            <div className="flex flex-col justify-center items-center">
              <span className="text-lg sm:text-2xl font-semibold">{tiempoRestante.dias}</span>
              <span className="text-sm sm:text-md">Días</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-lg sm:text-2xl font-semibold">{tiempoRestante.horas}</span>
              <span className="text-sm sm:text-md">Horas</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-lg sm:text-2xl font-semibold">{tiempoRestante.minutos}</span>
              <span className="text-sm sm:text-md">Minutos</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-lg sm:text-2xl font-semibold">{tiempoRestante.segundos}</span>
              <span className="text-sm sm:text-md">Segundos</span>
            </div>
          </div>
        )}
        {new Date() >= new Date(transmision.fechaTransmision) && (
          <a href={`https://www.youtube.com/watch?v=${transmision.urltransmision.split("watch?v=")[1]}`} className="bg-blue-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mt-2 sm:mt-0">
            Ver en vivo
          </a>
        )}
      </div>
    </div>
  );
}