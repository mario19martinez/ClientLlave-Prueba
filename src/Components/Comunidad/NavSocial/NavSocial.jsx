import { useEffect, useState } from "react";
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
    window.localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-blue-600 text-white sticky top-0 z-50 border-b-2 px-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/Comunidad" className="text-xl font-bold">
            Llave Social
          </Link>
          <HomeOutlinedIcon
            className="cursor-pointer"
            onClick={() => navigate("/estudiante/Escritorio")}
          />
          <GridViewOutlinedIcon className="cursor-pointer" />
          <div className="hidden md:flex items-center border rounded-md bg-white p-2">
            <SearchOutlinedIcon className="text-blue-600 dark:text-whitesmoke" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent focus:outline-none text-blue-600 dark:text-whitesmoke ml-1"
            />
          </div>
        </div>
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleMenuToggle}
          >
            <img
              src={
                userData?.image ||
                "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
              }
              alt="profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="hidden md:inline">{`${userData?.name || ""} ${userData?.last_name || ""}`}</span>
            <ExpandMoreIcon />
          </div>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-blue-600 border rounded-md shadow-md">
              <div className="py-2">
                <Link
                  to="/estudiante/profile"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-blue-700 "
                >
                  <PersonOutlinedIcon />
                  <span>Ver Perfil</span>
                </Link>
                <Link
                  to="/my-posts"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-blue-700 "
                >
                  <EmailOutlinedIcon />
                  <span>Mis Publicaciones</span>
                </Link>
                <Link
                  to="/estudiante/Ajustes"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-blue-700 "
                >
                  <NotificationsOutlinedIcon />
                  <span>Editar Perfil</span>
                </Link>
                <div
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-blue-700 cursor-pointer"
                >
                  <LogoutIcon />
                  <span>Salir</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavSocial;