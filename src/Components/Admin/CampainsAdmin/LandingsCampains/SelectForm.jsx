import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { MdWeb, MdSchool } from "react-icons/md";

export default function SelectForm({ campeinId }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center bg-blue-50 items-center h-screen w-full">
      <div
        className="max-w-md mx-4"
        onClick={() =>
          navigate(`/Admin/campain/landing/selectPlantilla/${campeinId}`)
        }
      >
        <div className="bg-white rounded-lg overflow-hidden shadow-md transition transform hover:scale-105">
          <div className="px-6 py-4">
            <div className="flex flex-col items-center mb-4">
              <MdWeb className="text-7xl text-blue-500 mr-2" />
              <div className="font-bold text-xl">Crear Landing Normal</div>
            </div>
            <p className="text-gray-700 text-base">
              Plantillas de landing con diseño atractivo para tu campaña,
              incluyendo un formulario de registro integrado para capturar
              datos.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-4">
        <div
          className="bg-white rounded-lg overflow-hidden shadow-md transition transform hover:scale-105"
          onClick={() =>
            navigate(
              `/Admin/campain/landing/selectPlantilla/curso/${campeinId}`
            )
          }
        >
          <div className="px-6 py-4">
            <div className="flex flex-col items-center mb-4">
              <MdSchool className="text-7xl text-blue-500 mr-2" />
              <div className="font-bold text-xl">Crear Landing Cursos</div>
            </div>
            <p className="text-gray-700 text-base">
              Plantillas de landing con cursos ofrecen experiencias
              interactivas. Incluye un curso de prueba u obsequio para impulsar
              la participación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

SelectForm.propTypes = {
  campeinId: PropTypes.string.isRequired,
};