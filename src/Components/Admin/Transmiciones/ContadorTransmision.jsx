// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';

export default function ContadorTransmision({ fechaTransmision }) {
  const calcularTiempoRestante = useCallback(() => {
    const ahora = new Date();
    const fechaTransmisionDate = new Date(fechaTransmision);
    const diferencia = fechaTransmisionDate - ahora;

    if (diferencia < 0) {
      return { dias: 0, horas: 0, minutos: 0, segundos: 0, haPasado: true };
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    return { dias, horas, minutos, segundos, haPasado: false };
  }, [fechaTransmision]);

  const [tiempoRestante, setTiempoRestante] = useState(calcularTiempoRestante);

  useEffect(() => {
    if (!tiempoRestante.haPasado) {
      const intervalo = setInterval(() => {
        setTiempoRestante(calcularTiempoRestante());
      }, 1000);

      return () => clearInterval(intervalo);
    }
  }, [calcularTiempoRestante, tiempoRestante.haPasado]);

  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-lg font-bold text-center mb-4">Contador Regresivo</h2>
      <p className="text-sm text-gray-600 text-center mb-2">Tiempo restante para la transmisión:</p>
      {tiempoRestante.haPasado ? (
        <p className="text-red-500 font-semibold text-center">La transmisión ha comenzado o ya pasó.</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="text-blue-500">
            <span className="text-2xl font-semibold">{tiempoRestante.dias}</span>
            <p className="text-xs text-gray-500">Días</p>
          </div>
          <div className="text-blue-500">
            <span className="text-2xl font-semibold">{tiempoRestante.horas}</span>
            <p className="text-xs text-gray-500">Horas</p>
          </div>
          <div className="text-blue-500">
            <span className="text-2xl font-semibold">{tiempoRestante.minutos}</span>
            <p className="text-xs text-gray-500">Minutos</p>
          </div>
          <div className="text-blue-500">
            <span className="text-2xl font-semibold">{tiempoRestante.segundos}</span>
            <p className="text-xs text-gray-500">Segundos</p>
          </div>
        </div>
      )}
    </div>
  );
}

ContadorTransmision.propTypes = {
  fechaTransmision: PropTypes.string.isRequired
};