// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Computer as ComputerIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Category as CategoryIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../Redux/features/Users/usersSlice";

function SidebarUser({ selectedTab }) {
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
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-blue-700">
      <div className="sidebar min-h-screen w-[3.35rem] overflow-hidden border-r hover:w-56 hover:bg-blue-700 hover:shadow-lg">
        <div className="flex h-screen flex-col justify-between pt-2 pb-6">
          <div>
            <div className="w-max p-2.5 flex items-center">
              <img
                src={
                  userData?.image ||
                  "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
                }
                alt=""
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="px-2">
                {userData && (
                  <h2 className="font-semibold text-white">
                    {userData.name} <br />
                    {userData.last_name}
                  </h2>
                )}
              </div>
            </div>
            <ul className="mt-6 space-y-2 tracking-wide">
              <li className="min-w-max">
                <button
                  className={`relative flex items-center space-x-4 ${
                    selectedTab === "Escritorio"
                      ? "bg-gradient-to-r from-sky-500 to-cyan-300 px-4 py-3 text-white"
                      : "group bg px-4 py-3 text-white hover:text-cyan-300"
                  }`}
                  onClick={() => navigate("/estudiante/Escritorio")}
                >
                  <ComputerIcon className="h-5 w-5 fill-current text-white group-hover:text-cyan-200" />
                  <span className="group-hover:text-cyan-200">Escritorio</span>
                </button>
              </li>

              <li className="min-w-max">
                <button
                  className={`flex items-center space-x-4 ${
                    selectedTab === "Mi Perfil"
                      ? "bg-gradient-to-r from-sky-500 to-cyan-300 px-4 py-3 text-white"
                      : "group bg px-4 py-3 text-white hover:text-cyan-300"
                  }`}
                  onClick={() => navigate("/estudiante/profile")}
                >
                  <PersonIcon className="h-5 w-5 fill-current text-white group-hover:text-cyan-200" />
                  <span className="group-hover:text-cyan-200">Mi Perfil</span>
                </button>
              </li>

              <li className="min-w-max">
                <button
                  className={`flex items-center space-x-4 ${
                    selectedTab === "Cursos Inscritos"
                      ? "bg-gradient-to-r from-sky-500 to-cyan-300 px-4 py-3 text-white"
                      : "group bg px-4 py-3 text-white hover:text-cyan-300"
                  }`}
                  onClick={() => navigate("/estudiante/cursosInscritos")}
                >
                  <SchoolIcon className="h-5 w-5 fill-current text-white group-hover:text-cyan-200" />
                  <span className="group-hover:text-cyan-200">
                    Cursos Inscritos
                  </span>
                </button>
              </li>

              <li className="min-w-max">
                <button
                  className={`flex items-center space-x-4 ${
                    selectedTab === "Mis Talleres"
                      ? "bg-gradient-to-r from-sky-500 to-cyan-300 px-4 py-3 text-white"
                      : "group bg px-4 py-3 text-white hover:text-cyan-300"
                  }`}
                  onClick={() => navigate("/estudiante/MisTalleres")}
                >
                  <CategoryIcon className="h-5 w-5 fill-current text-white group-hover:text-cyan-200" />
                  <span className="group-hover:text-cyan-200">
                    Mis Talleres
                  </span>
                </button>
              </li>

              <li className="min-w-max">
                <button
                  className={`flex items-center space-x-4 ${
                    selectedTab === "Publicaciones"
                      ? "bg-gradient-to-r from-sky-500 to-cyan-300 px-4 py-3 text-white"
                      : "group bg px-4 py-3 text-white hover:text-cyan-300"
                  }`}
                  onClick={() => navigate("/my-posts")}
                >
                  <RateReviewIcon className="h-5 w-5 fill-current text-white group-hover:text-cyan-200" />
                  <span className="group-hover:text-cyan-200">
                    Publicaciones
                  </span>
                </button>
              </li>
            </ul>
          </div>
          <div className="w-max -mb-3">
            <ul className="mt-6 space-y-2 tracking-wide">
              <li className="min-w-max">
                <button
                  className={`flex items-center space-x-4 ${
                    selectedTab === "Ajustes"
                      ? "bg-gradient-to-r from-sky-500 to-cyan-300 px-4 py-3 text-white"
                      : "group bg px-4 py-3 text-white hover:text-cyan-300"
                  }`}
                  onClick={() => navigate("/estudiante/Ajustes")}
                >
                  <SettingsIcon className="h-5 w-5 fill-current text-white group-hover:text-cyan-200" />
                  <span className="group-hover:text-cyan-200">Ajustes</span>
                </button>
              </li>
              <li className="min-w-max">
                <button
                  className={`flex items-center space-x-4 ${
                    selectedTab === "Salir"
                      ? "bg-gradient-to-r from-sky-500 to-cyan-300 px-4 py-3 text-white"
                      : "group bg px-4 py-3 text-white hover:text-cyan-300"
                  }`}
                  onClick={handleLogout}
                >
                  <LogoutIcon className="h-5 w-5 fill-current text-white group-hover:text-cyan-200" />
                  <span className="group-hover:text-cyan-200">Salir</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

SidebarUser.propTypes = {
  selectedTab: PropTypes.string.isRequired,
};

export default SidebarUser;
