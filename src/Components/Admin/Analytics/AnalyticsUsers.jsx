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
    <div className="container mx-auto p-10">
      <div className="mb-6">
        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Volver
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <GraficaUsuarioPais />
        </div>
        <div>
          <GraficaTipoDeUsuario />
        </div>
      </div>
      <div className="mt-6 max-w-lg">
        <GraficaFechaDeRegistro />
      </div>
    </div>
  );
}