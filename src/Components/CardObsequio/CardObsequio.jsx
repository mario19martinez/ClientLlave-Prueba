// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";

const CardObsequio = () => {
  const navigate = useNavigate();

  const register = () => {
    navigate("/FormObsequio");
  };

  return (
      <div className="container mx-auto w-screen px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Regístrate para obtener <br />
              10 Clases de Obsequio
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              ¡No te pierdas esta oferta especial!
            </p>
            <button
              className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={register}
            >
              Regístrate aquí
            </button>
          </div>
        </div>
      </div>
  );
};

export default CardObsequio;