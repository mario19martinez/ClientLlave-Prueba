import { FaGraduationCap, FaLayerGroup, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SelectetNivelOrModulo() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col md:flex-row justify-center items-center md:space-x-6 py-10 space-y-6 md:space-y-0">
      {/* Botón de retroceso */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <FaArrowLeft className="text-2xl" />
      </button>

      <div className="w-full md:w-1/2 max-w-lg rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 transform transition-all hover:scale-105">
        <div className="p-8 text-center">
          <FaGraduationCap className="text-6xl text-blue-500 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold mb-4">Certificar Nivel</h2>
          <p className="text-gray-600 text-base mb-6">
            Asegura que has alcanzado el nivel requerido en tu área de estudio.
          </p>
          <button
            onClick={() => navigate("/admin/certificado/selectedNivel")}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Certificar
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 max-w-lg rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 transform transition-all hover:scale-105">
        <div className="p-8 text-center">
          <FaLayerGroup className="text-6xl text-green-500 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold mb-4">Certificar Módulo</h2>
          <p className="text-gray-600 text-base mb-6">
            Confirma que has completado y dominado el módulo específico.
          </p>
          <button
            onClick={() => navigate("/admin/certificado/CertificarModulo")}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Certificar
          </button>
        </div>
      </div>
    </div>
  );
}
