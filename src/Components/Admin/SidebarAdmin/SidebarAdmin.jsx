// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import CampaignIcon from "@mui/icons-material/Campaign";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SourceIcon from "@mui/icons-material/Source";
import BookIcon from "@mui/icons-material/Book";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../Redux/features/Users/usersSlice";

function SidebarAdmin({ selectedTab }) {
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
    navigate("/");
  };

  return (
    <div className="bg-blue-700 text-white w-56 min-h-screen translate-y-0 -translate-x-2">
      <div className="p-4 translate-x-10 translate-y-10">
        <div className="md:text-2xl font-semibold">
          <h2>{userData && userData.name}</h2>
        </div>
        <h3 className="text-2xl font-bold mb-4">ADMIN</h3>
        <ul>
          <li className="mb-4">
            <button
              // className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal${
              //   selectedTab === "Usuarios"
              //     ? "bg-blue-400 text-white"
              //     : "hover:bg-blue-500 hover:text-white"
              // }`}
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Usuarios"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => navigate("/admin")}
            >
              <GroupsOutlinedIcon
                className={`${selectedTab === "Usuarios" ? "text-white" : ""}`}
              />{" "}
              Usuarios
            </button>
          </li>
          <li className="mb-4">
            <button
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Cursos"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => navigate("/admin/cursos")}
            >
              <SchoolIcon
                className={`${selectedTab === "Cursos" ? "text-white" : ""}`}
              />{" "}
              Cursos
            </button>
          </li>
          <li className="mb-4">
            <a
              href="https://www.registrodedatos.info/"
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Campañas"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              <CampaignIcon
                className={`${selectedTab === "Campañas" ? "text-white" : ""}`}
              />{" "}
              Campañas
            </a>
          </li>
          <li className="mb-4">
            <button
              href=""
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Roles"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => navigate("/admin/roles")}
            >
              <GroupIcon
                className={`${selectedTab === "Roles" ? "text-white" : ""}`}
              />{" "}
              Roles
            </button>
          </li>
          <li className="mb-4">
            <button
              href=""
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Nosotros"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => navigate("/Admin/Nosotros")}
            >
              <AccessibilityNewIcon
                className={`${selectedTab === "Nosotros" ? "text-white" : ""}`}
              />{" "}
              Nosotros
            </button>
          </li>

          <li className="mb-4">
            <button
              href=""
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Usuarios Eliminados"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => navigate("/admin/usersDeleted")}
            >
              <GroupIcon
                className={`${
                  selectedTab === "Usuarios Eliminados" ? "text-white" : ""
                }`}
              />{" "}
              Usuarios Eliminados
            </button>
          </li>
          <li className="mb-4">
            <button
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Cursos Eliminados"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => navigate("/admin/cursosDeleted")}
            >
              <SchoolIcon
                className={`${
                  selectedTab === "Cursos Eliminados" ? "text-white" : ""
                }`}
              />{" "}
              Cursos Eliminados
            </button>
          </li>
          <li className="mb-4">
            <button
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Blogs"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => navigate("/admin/blogs")}
            >
              <BookIcon
                className={`${selectedTab === "Blogs" ? "text-white" : ""}`}
              />{" "}
              Blogs
            </button>
          </li>
          <li className="mb-4">
            <button
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Testimonios"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => navigate("/admin/testimonios")}
            >
              <SourceIcon
                className={`${
                  selectedTab === "Testimonios" ? "text-white" : ""
                }`}
              />{" "}
              Testimonios
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => navigate("/admin/ajustes")}
              className={`hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal ${
                selectedTab === "Ajustes"
                  ? "bg-blue-400 text-white"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              <SettingsIcon
                className={`${selectedTab === "Ajustes" ? "text-white" : ""}`}
              />{" "}
              Ajustes
            </button>
          </li>
          <li className="mb-4">
            <button
              className="hover:bg-blue-300 px-2 py-1 rounded w-32 font-medium flex justify-normal hover:text-white"
              onClick={handleLogout}
            >
              <ExitToAppIcon /> Salir
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
SidebarAdmin.propTypes = {
  selectedTab: PropTypes.string.isRequired,
};

export default SidebarAdmin;
