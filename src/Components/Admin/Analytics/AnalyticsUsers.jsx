// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import GraficaUsuarioPais from "./GraficasUsuario/GraficaUsuarioPais";
import GraficaFechaDeRegistro from "./GraficasUsuario/GraficaFechaDeRegistro";

export default function AnalyticsUsers() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/admin");
  };

  return (
    <div className="flex flex-col p-10">
      <button
        onClick={handleGoBack}
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline-block -mt-1 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Volver a Admin
      </button>
      <GraficaUsuarioPais />
      <GraficaFechaDeRegistro />
    </div>
  );
}
