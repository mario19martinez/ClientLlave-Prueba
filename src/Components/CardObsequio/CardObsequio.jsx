// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import LLAVE from "../../assets/LLAVE.png"; 

const CardObsequio = () => {
  const navigate = useNavigate();

  const register = () => {
    navigate("/FormObsequio");
  };

  return (
    <div className="flex justify-center items-center h-full py-10 px-20">
      <div className="flex flex-col md:flex-row items-center">
        <img src={LLAVE} alt="Fondo" className="w-full md:w-1/2 h-auto mb-6 md:mb-0 md:mr-6" />
        <div>
          <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            Regístrate para obtener <br />
            10 Clases de Obsequio y tener acceso a nuestra comunidad
          </h2>
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