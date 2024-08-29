import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCertificate,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

export default function CursoOrNivel() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-10 space-y-10 lg:space-y-0 px-6 py-10">
      <div
        onClick={() => navigate("/Admin/Certificado")}
        className="cursor-pointer w-full max-w-sm bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg"
      >
        <div className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-blue-600">
          <FontAwesomeIcon
            icon={faCertificate}
            className="text-white text-4xl"
          />
        </div>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Certificados Cursos
          </h2>
          <p className="text-gray-600 mt-3">
            Genera certificados para los cursos completados con éxito.
          </p>
        </div>
      </div>
      <div
        onClick={() => navigate("/admin/certificado/selectedNivel/selected")}
        className="cursor-pointer w-full max-w-sm bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-lg"
      >
        <div className="flex items-center justify-center p-6 bg-gradient-to-r from-green-500 to-green-600">
          <FontAwesomeIcon
            icon={faGraduationCap}
            className="text-white text-4xl"
          />
        </div>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Certificados Nivel y Módulos
          </h2>
          <p className="text-gray-600 mt-3">
            Genera certificados para los niveles y módulos completados con éxito.
          </p>
        </div>
      </div>
    </div>
  );
}