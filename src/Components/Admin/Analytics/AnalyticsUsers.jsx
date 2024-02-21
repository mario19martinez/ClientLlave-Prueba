// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import GraficaUsuarioPais from "./GraficasUsuario/GraficaUsuarioPais";
import GraficaFechaDeRegistro from "./GraficasUsuario/GraficaFechaDeRegistro";
import GraficaTipoDeUsuario from "./GraficasUsuario/GraficaTipoDeUsuario";

export default function AnalyticsUsers() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/admin");
  };

  return (
    <div className="flex flex-col p-10">
      <div>
        <button
          onClick={handleGoBack}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mb-4"
        >
          Volver
        </button>
      </div>
      <div>
        <GraficaUsuarioPais />
        <GraficaFechaDeRegistro />
        <GraficaTipoDeUsuario />
      </div>
    </div>
  );
}
