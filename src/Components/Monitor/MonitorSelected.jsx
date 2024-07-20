import { FaRegChartBar, FaBook, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MonitorSelected({ grupoId, nivelId, userSub }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 bg-gray-100 w-full min-h-screen flex flex-col items-center">
      <button
        onClick={handleBackClick}
        className="flex items-center px-4 py-2 mb-6 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        <FaArrowLeft className="mr-2" />
        Atrás
      </button>
      <div className="max-w-4xl w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <div onClick={() => navigate(`/Monitor/Cursos/GrupoDetais/${grupoId}/${nivelId}`)}>
          <Card
            icon={<FaRegChartBar className="text-blue-500" size={40} />}
            title="Seguimiento"
            description="Aquí puedes hacer el seguimiento de tu progreso de los estudiantes en el grupo."
          />
        </div>
        <div onClick={() => navigate(`/Monitor/Cursos/Modulos/${nivelId}/${grupoId}/${userSub}`)}>
          <Card
            icon={<FaBook className="text-green-500" size={40} />}
            title="Modulos y Clases"
            description="Aquí puedes ver los modulos y las clases del modulo."
          />
        </div>
      </div>
    </div>
  );
}

function Card({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-between h-full p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

Card.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

MonitorSelected.propTypes = {
    grupoId: PropTypes.string.isRequired,
    nivelId: PropTypes.string.isRequired,
  };