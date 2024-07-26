import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import CampaignIcon from "@mui/icons-material/Campaign";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SourceIcon from "@mui/icons-material/Source";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import WebIcon from '@mui/icons-material/Web';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // Icono para "Ventas"
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
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { label: 'Usuarios', icon: <GroupsOutlinedIcon />, path: '/admin' },
    { label: 'Cursos', icon: <SchoolIcon />, path: '/admin/cursos' },
    { label: 'Niveles', icon: <SchoolIcon />, path: '/niveladmin' },
    { label: 'Certificados', icon: <CardMembershipIcon />, path: '/admin/certificacion' },
    { label: 'Campañas', icon: <CampaignIcon />, path: '/admin/campain' },
    { label: 'Roles', icon: <GroupIcon />, path: '/admin/roles' },
    { label: 'Ventas', icon: <MonetizationOnIcon />, path: '/admin/planes' }, // Nueva sección de Ventas
    { label: 'Pagina', icon: <WebIcon />, path: '/AdminPage' },
    { label: 'Noticias', icon: <SourceIcon />, path: '/admin/noticias' },
    { label: 'Videos', icon: <VideoFileIcon />, path: '/admin/videos' },
    { label: 'Ajustes', icon: <SettingsIcon />, path: '/admin/ajustes' }
  ];

  return (
    <div className="bg-blue-700 text-white w-56 min-h-screen pr-7">
      <div className="p-4">
        <div className="md:text-2xl font-semibold mb-2">
          <h2>{userData?.name || "Usuario"}</h2>
        </div>
        <h3 className="text-2xl font-bold mb-6">ADMIN</h3>
        <ul>
          {menuItems.map((item) => (
            <li key={item.label} className="mb-4">
              <button
                className={`px-2 py-1 rounded w-32 font-medium flex items-center transition-colors ${
                  selectedTab === item.label
                    ? "bg-blue-400 text-white"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </button>
            </li>
          ))}
          <li className="mb-4">
            <button
              className="px-2 py-1 rounded w-32 font-medium flex items-center hover:bg-blue-500 hover:text-white transition-colors"
              onClick={handleLogout}
            >
              <ExitToAppIcon />
              <span className="ml-2">Salir</span>
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