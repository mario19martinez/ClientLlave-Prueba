// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import {
  HomeOutlined as HomeOutlinedIcon,
  GridViewOutlined as GridViewOutlinedIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  EmailOutlined as EmailOutlinedIcon,
  PersonOutlined as PersonOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  ExpandMore as ExpandMoreIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../Redux/features/Users/usersSlice";

const NavSocial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  const handleMenuToggle = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b-2 sticky top-0 bg-blue-600 dark:bg-gray-800 text-white dark:text-whitesmoke z-50">
      <div className="flex items-center gap-4 md:gap-8">
        <Link to="/Comunidad" className="text-white text-xl font-bold">
          Llave Social
        </Link>
        <HomeOutlinedIcon
          className="text-white"
          onClick={() => navigate("/estudiante/Escritorio")}
        />
        <GridViewOutlinedIcon className="text-white" />
        {/* <PersonAddIcon className="text-white"
        onClick={() => navigate('/agregarAmigo')}/> */}
        <ChatIcon className="text-white"
        onClick={() => navigate('/chat-users')} 
        />
        <div className="hidden md:flex items-center border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white">
          <SearchOutlinedIcon className="text-blue-600 dark:text-whitesmoke" />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent focus:outline-none text-blue-600 dark:text-whitesmoke ml-1"
          />
        </div>
      </div>
      <div className="items-center gap-4 md:gap-8 hidden md:flex">
        <div className="relative">
          <div
            className="flex items-center gap-2 font-medium cursor-pointer"
            onClick={handleMenuToggle}
          >
            <img
              src={
                userData?.image ||
                "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
              }
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-white dark:text-whitesmoke">{`${
              userData?.name || ""
            } ${userData?.last_name || ""}`}</span>
            <ExpandMoreIcon className="text-white" />
          </div>
          {showMenu && (
            <div className="absolute right-0 mt-2 py-2 w-40 bg-blue-600 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md">
              <div className="px-2 py-1">
                <Link
                  to="/estudiante/profile"
                  className="flex items-center gap-2 text-white dark:text-whitesmoke hover:bg-white hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-whitesmoke px-2 py-1 rounded-md"
                >
                  <PersonOutlinedIcon />
                  <span>Ver Perfil</span>
                </Link>
                <Link
                  to="/mis-publicaciones"
                  className="flex items-center gap-2 text-white dark:text-whitesmoke hover:bg-white hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-whitesmoke px-2 py-1 rounded-md"
                >
                  <EmailOutlinedIcon />
                  <span>Mis Publicaciones</span>
                </Link>
                <Link
                  to="/estudiante/Ajustes"
                  className="flex items-center gap-2 text-white dark:text-whitesmoke hover:bg-white hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-whitesmoke px-2 py-1 rounded-md"
                >
                  <NotificationsOutlinedIcon />
                  <span>Editar Perfil</span>
                </Link>
                <div
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-white dark:text-whitesmoke hover:bg-white hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-whitesmoke px-2 py-1 rounded-md"
                >
                  <LogoutIcon />
                  <span>Salir</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavSocial;