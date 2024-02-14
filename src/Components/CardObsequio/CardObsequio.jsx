// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";

const CardObsequio = () => {
  const navigate = useNavigate();

  const register = () => {
    navigate("/FormObsequio");
  }
  return (
    <div className="flex justify-center">
      <div className="max-w-xs rounded overflow-hidden shadow-lg border border-blue-500 m-4">
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">
            Regístrate para obtener <br />
            10 Clases de Obsequio
          </h2>
          <p className="text-gray-700 mb-4 text-center">
            ¡No te pierdas esta oferta especial!
          </p>
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
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
