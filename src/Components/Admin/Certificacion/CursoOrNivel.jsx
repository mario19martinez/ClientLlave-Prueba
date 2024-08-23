import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCertificate,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

export default function CursoOrNivel() {
  const navigate = useNavigate();

  return (
    <div className="flex px-20 py-20 space-x-10">
      <div
        onClick={() => navigate("/Admin/Certificado")}
        className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out mb-8 lg:mb-0"
      >
        <div className="flex items-center justify-center p-4 bg-blue-500">
          <FontAwesomeIcon
            icon={faCertificate}
            className="text-white text-3xl"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Certificados Cursos
          </h2>
          <p className="text-gray-600 mt-2">
            Genera certificados para los cursos completados con éxito.
          </p>
        </div>
      </div>
      <div 
      onClick={() => navigate("/admin/certificado/selectedNivel/selected")}
      className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
        <div className="flex items-center justify-center p-4 bg-green-500">
          <FontAwesomeIcon
            icon={faGraduationCap}
            className="text-white text-3xl"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Certificados Nivel y Modulos
          </h2>
          <p className="text-gray-600 mt-2">
            Genera certificados para los niveles y modulos completados con éxito.
          </p>
        </div>
      </div>
    </div>
  );
}
