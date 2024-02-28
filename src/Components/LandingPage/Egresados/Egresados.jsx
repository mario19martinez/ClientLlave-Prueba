// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from "react-router-dom";

const Egresados = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="max-w-6xl w-full p-8 bg-white rounded-lg shadow-xl" onClick={() => navigate("/Egresados")}>
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Egresados</h2>
        <div className="flex flex-col md:flex-row items-center justify-center h-full">
          <div className="w-full md:w-1/2 pr-4 md:pr-8">
            <p className="text-gray-800 text-lg md:text-xl text-center leading-relaxed">¡Descubre cómo nuestros egresados han triunfado en el mundo real después de graduarse!</p>
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0 flex justify-center">
            <img src="https://llaveparalasnaciones.online/wp-content/uploads/2024/02/EGRESADOS.png" alt="Egresados" className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition duration-500 transform hover:scale-105" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Egresados;