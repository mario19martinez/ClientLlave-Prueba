// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";

const Egresados = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center justify-center py-8">
        <div className="w-full md:w-3/5 mt-4 md:mt-0 flex justify-center pr-3">
          <img
            src="https://llaveparalasnaciones.online/wp-content/uploads/2024/02/EGRESADOS.png"
            alt="Egresados"
            className="w-full max-w-lg h-auto rounded-lg shadow-lg hover:shadow-xl transition duration-500 transform hover:scale-105"
          />
        </div>
        <div className="w-full md:w-2/5 md:pr-8 flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">Egresados</h2>
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed mb-4 text-center">
            ¡Descubre cómo nuestros egresados han triunfado en el mundo real
            después de graduarse!
          </p>
          <button
            onClick={() => navigate("/Egresados")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
          >
            Ver Testimonios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Egresados;