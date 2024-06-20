import { useNavigate } from "react-router-dom";
import egresados from './egresados.png'; 

const Egresados = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col items-center justify-center">
      <h2 className="text-4xl text-gray-800 md:text-5xl font-semibold mb-4 mt-8 text-center">Egresados</h2>
      <div className="flex flex-col md:flex-row items-center justify-center py-8">
        <div className="w-full md:w-3/5 mt-8 md:mt-0 flex justify-center pr-3">
          <img
            src={egresados}
            alt="Egresados"
            className="w-full md:max-w-md h-auto rounded-lg shadow-lg hover:shadow-xl transition duration-500 transform hover:scale-105"
          />
        </div>
        <div className="w-full md:w-2/5 md:pr-8 flex flex-col items-center justify-center">
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed mb-4 text-center">
            ¡Descubre cómo nuestros egresados han triunfado en el mundo real después de graduarse!
          </p>
          <button
            onClick={() => navigate("/Egresados")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-110"
          >
            Ver Testimonios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Egresados;