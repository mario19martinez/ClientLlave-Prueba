// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Computer as ComputerIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Category as CategoryIcon,
  ThreeP as ThreePIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import RateReviewIcon from '@mui/icons-material/RateReview';
import PropTypes from "prop-types";

function SidebarUser({ selectedTab }) {
  const navigate = useNavigate();
  const li = "mb-2"; // Reduce el espacio vertical entre elementos
  const styleButton =
    "block px-2 py-1 rounded md:w-24 lg:w-40 text-blue-500 font-semibold flex md:justify-start";

  const handleLogout = () => {
    // Lógica para realizar la salida de la sesión
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    // Redirige al usuario a la página de inicio de sesión o a la página de inicio
    navigate("/");
  };

  return (
    <div className="bg-white w-1/6 md:w-1/6 h-auto border-r-2 border-blue-500">
      <ul className="sm:p-0 lg:pt-8 lg:pl-12">
        <li className={li}>
          <button
            className={`${selectedTab === "Escritorio" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"} ${styleButton}`}
            onClick={() => navigate("/estudiante/Escritorio")}
          >
            <ComputerIcon className={`${selectedTab === "Escritorio" ? "text-white" : ""}`} />{" "}
            <span className="md:inline hidden">Escritorio</span>
          </button>
        </li>

        <li className={li}>
          <button
            className={`${selectedTab === "Mi Perfil" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"} ${styleButton}`}
            onClick={() => navigate("/estudiante/profile")}
          >
            <PersonIcon className={`${selectedTab === "Mi Perfil" ? "text-white" : ""}`} />{" "}
            <span className="md:inline hidden">Mi Perfil</span>
          </button>
        </li>

        <li className={li}>
          <button
            className={`${selectedTab === "Cursos Inscritos" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"} ${styleButton}`}
            onClick={() => navigate("/estudiante/cursosInscritos")}
          >
            <SchoolIcon className={`${selectedTab === "Cursos Inscritos" ? "text-white" : ""}`} />{" "}
            <span className="md:inline hidden">Cursos Inscritos</span>
          </button>
        </li>

        <li className={li}>
          <button
            className={`${selectedTab === "Mis Talleres" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"} ${styleButton}`}
            onClick={() => navigate("/estudiante/MisTalleres")}
          >
            <CategoryIcon className={`${selectedTab === "Mis Talleres" ? "text-white" : ""}`} />{" "}
            <span className="md:inline hidden">Mis Talleres</span>
          </button>
        </li>

        <li className={li}>
          <button
            className={`${selectedTab === "Publicaciones" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"} ${styleButton}`}
            onClick={() => navigate("/my-posts")}
          >
            <RateReviewIcon className={`${selectedTab === "Publicaciones" ? "text-white" : ""}`} />{" "}
            <span className="md:inline hidden">Publicaciones</span>
          </button>
        </li>

        <li className={li}>
          <button
            className={`${selectedTab === "Preguntas & Respuestas" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"} ${styleButton}`}
            onClick={() => navigate("/estudiante/Preguntas&Respuestas")}
          >
            <ThreePIcon className={`${selectedTab === "Preguntas & Respuestas" ? "text-white" : ""}`} />{" "}
            <span className="md:inline hidden">Pregts & Respts</span>
          </button>
        </li>

        <li className={li}>
          <button
            className={`${selectedTab === "Ajustes" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"} ${styleButton}`}
            onClick={() => navigate("/estudiante/Ajustes")}
          >
            <SettingsIcon className={`${selectedTab === "Ajustes" ? "text-white" : ""}`} />{" "}
            <span className="md:inline hidden">Ajustes</span>
          </button>
        </li>

        <li className={li}>
          <button
            className={`${selectedTab === "Salir" ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"} ${styleButton}`}
            onClick={handleLogout}
          >
            <LogoutIcon className={`${selectedTab === "Salir" ? "text-white" : ""}`} />{" "}
            <span className="md:inline hidden">Salir</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

SidebarUser.propTypes = {
  selectedTab: PropTypes.string.isRequired,
};

export default SidebarUser;