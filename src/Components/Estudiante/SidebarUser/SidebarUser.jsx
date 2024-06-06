import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Computer as ComputerIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import RateReviewIcon from "@mui/icons-material/RateReview";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../Redux/features/Users/usersSlice";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const SidebarUser = ({ selectedTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  useEffect(() => {
    if (userData) {
      const tokenExpiration = new Date(userData.tokenExpiration);
      const now = new Date();
      if (tokenExpiration <= now) {
        setSessionExpired(true);
      }
    }
  }, [userData]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const closeModalAndLogout = () => {
    setSessionExpired(false);
    handleLogout();
  };

  const menuItems = [
    { name: "Escritorio", icon: ComputerIcon, route: "/estudiante/Escritorio" },
    { name: "Mi Perfil", icon: PersonIcon, route: "/estudiante/profile" },
    { name: "Cursos Inscritos", icon: SchoolIcon, route: "/estudiante/cursosInscritos" },
    { name: "Mis Certificados", icon: WorkspacePremiumIcon, route: "/estudiante/certificados" },
    { name: "Publicaciones", icon: RateReviewIcon, route: "/my-posts" },
    { name: "Ajustes", icon: SettingsIcon, route: "/estudiante/Ajustes" },
    { name: "Salir", icon: LogoutIcon, action: handleLogout },
  ];

  return (
    <div className="min-h-screen bg-blue-700">
      <div className="sidebar min-h-screen w-14 md:w-14 lg:hover:w-56 overflow-hidden border-r bg-blue-700 hover:shadow-lg transition-all duration-300">
        <div className="flex h-full flex-col justify-between pt-2 pb-6">
          <div>
            <div className="w-max p-2.5 flex items-center">
              <img
                src={userData?.image || "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"}
                alt="Profile"
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="hidden lg:block px-2">
                {userData && (
                  <h2 className="font-semibold text-white">
                    {userData.name} <br />
                    {userData.last_name}
                  </h2>
                )}
              </div>
            </div>
            <ul className="mt-6 space-y-2 tracking-wide">
              {menuItems.slice(0, -2).map((item) => (
                <li key={item.name} className="min-w-max">
                  <button
                    className={`flex items-center space-x-4 px-4 py-3 text-white ${
                      selectedTab === item.name
                        ? "bg-gradient-to-r from-sky-500 to-cyan-300"
                        : "group hover:text-cyan-300"
                    }`}
                    onClick={() => navigate(item.route)}
                  >
                    <item.icon className="h-5 w-5 text-white group-hover:text-cyan-200" />
                    <span className="hidden lg:block group-hover:text-cyan-200">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-max mb-3">
            <ul className="space-y-2 tracking-wide">
              {menuItems.slice(-2).map((item) => (
                <li key={item.name} className="min-w-max">
                  <button
                    className={`flex items-center space-x-4 px-4 py-3 text-white ${
                      selectedTab === item.name
                        ? "bg-gradient-to-r from-sky-500 to-cyan-300"
                        : "group hover:text-cyan-300"
                    }`}
                    onClick={item.action ? item.action : () => navigate(item.route)}
                  >
                    <item.icon className="h-5 w-5 text-white group-hover:text-cyan-200" />
                    <span className="hidden lg:block group-hover:text-cyan-200">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Dialog open={sessionExpired} onClose={closeModalAndLogout}>
        <DialogTitle>Sesión expirada</DialogTitle>
        <DialogContent>
          <p>Tu sesión ha expirado. Por favor, inicia sesión nuevamente.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModalAndLogout} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SidebarUser.propTypes = {
  selectedTab: PropTypes.string.isRequired,
};

export default SidebarUser;