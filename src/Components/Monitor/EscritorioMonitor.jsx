import { FaBook, FaUsers, FaPenFancy, FaUser, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function EscritorioMonitor() {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-gray-100 w-full min-h-screen flex justify-center items-center">
      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div onClick={() => navigate("/Cursos")}>
          <Card
            icon={<FaBook className="text-indigo-500" size={40} />}
            title="Cursos"
            description="Explora y ve el seguimiento aquí."
          />
        </div>
        <div onClick={() => navigate("/Comunidad")}>
          <Card
            icon={<FaUsers className="text-green-500" size={40} />}
            title="Comunidad"
            description="Únete a la comunidad y comparte con otros."
          />
        </div>
        <div onClick={() => navigate("/Monitor/Publicaciones")}>
          <Card
            icon={<FaPenFancy className="text-blue-500" size={40} />}
            title="Mis Publicaciones"
            description="Administra tus publicaciones."
          />
        </div>
        <div onClick={() => navigate("/Monitor/Profile")}>
          <Card
            icon={<FaUser className="text-yellow-500" size={40} />}
            title="Perfil"
            description="Información de perfil."
          />
        </div>
        <div onClick={() => navigate("/Monitor/Ajustes")}>
          <Card
            icon={<FaCog className="text-red-500" size={40} />}
            title="Ajustes"
            description="Configura tus preferencias y ajustes."
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