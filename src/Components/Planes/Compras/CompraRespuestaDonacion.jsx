import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function CompraRespuestaDonacion() {
  const navigate = useNavigate();

  const handleVolver = () => {
    navigate("/", { state: { message: "Gracias por tu donación. Sigue explorando nuestra página web." } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center transform transition-transform duration-300 scale-95 hover:scale-100">
        <div className="mb-4">
          <FaCheckCircle className="w-16 h-16 mx-auto text-green-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ¡Gracias por tu Donación!
        </h2>
        <p className="text-gray-600 mb-4">
          Apreciamos mucho tu apoyo. Tu donación ha sido recibida con éxito.
        </p>
        <p className="text-gray-600 mb-6">
          ¡Sigue explorando nuestra página web para descubrir más formas de apoyar nuestra causa!
        </p>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleVolver}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-300 text-lg"
          >
            Ir a la página principal
          </button>
        </div>
      </div>
    </div>
  );
}