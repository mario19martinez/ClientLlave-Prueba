// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import SchoolIcon from "@mui/icons-material/School";
import ArticleIcon from "@mui/icons-material/Article";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../Redux/features/Users/usersSlice";

function SidebarEditor({ selectedTab }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);

  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    // Eliminar la Cache
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-blue-700 text-white w-56 min-h-screen translate-y-0 -translate-x-2 pr-7">
      <div className="p-4 translate-x-10 translate-y-10">
        <div className="md:text-2xl font-semibold">
          <h2>{userData && userData.name}</h2>
        </div>
        <h3 className="text-2xl font-bold mb-4">Editor</h3>
        <ul>
        <li className="mb-4">
            <button
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Escritorio"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => navigate("/Editor")}
            >
              <DesktopMacIcon
                className={`${selectedTab === "Escritorio " ? "text-white" : ""} mr-2`}
              />{" "}
              Escritorio 
            </button>
          </li>

          <li className="mb-4">
            <button
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Cursos"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => navigate("/Editor/Cursos")}
            >
              <SchoolIcon
                className={`${selectedTab === "Cursos" ? "text-white" : ""} mr-2`}
              />{" "}
              Cursos
            </button>
          </li>

          <li className="mb-4">
            <button
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Blogs"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => navigate("/Editor/Blogs")}
            >
              <ArticleIcon
                className={`${selectedTab === "Blogs" ? "text-white" : ""} mr-2`}
              />{" "}
              Blogs
            </button>
          </li>

          <li className="mb-4">
            <button
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Asistencia"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => navigate("/Editor/Asistencia")}
            >
              <HowToRegIcon
                className={`${selectedTab === "Asistencia" ? "text-white" : ""} mr-2`}
              />{" "}
              Asistecias
            </button>
          </li>

          <li className="mb-4">
            <button
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Transmisión"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => navigate("/Editor/Transmision")}
            >
              <LiveTvIcon
                className={`${selectedTab === "Transmisión" ? "text-white" : ""} mr-2`}
              />{" "}
              Transmisión
            </button>
          </li>

          <li className="mb-4">
            <button
              onClick={() => navigate("/Editor/Ajustes")}
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Ajustes"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              <SettingsIcon
                className={`${selectedTab === "Ajustes" ? "text-white" : ""} mr-2`}
              />{" "}
              Ajustes
            </button>
          </li>
          <li className="mb-4">
            <button
              className="hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal hover:text-white"
              onClick={handleLogout}
            >
              <ExitToAppIcon className="mr-2" /> Salir
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

SidebarEditor.propTypes = {
  selectedTab: PropTypes.string.isRequired,
};

export default SidebarEditor;