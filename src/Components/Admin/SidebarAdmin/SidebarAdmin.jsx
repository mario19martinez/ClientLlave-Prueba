import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import CampaignIcon from "@mui/icons-material/Campaign";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import WebIcon from '@mui/icons-material/Web';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
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
    { label: 'Ventas', icon: <MonetizationOnIcon />, path: '/admin/planes' }, 
    { label: 'Pagina', icon: <WebIcon />, path: '/AdminPage' },
    { label: 'Ajustes', icon: <SettingsIcon />, path: '/admin/ajustes' }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-700 to-blue-600 text-white w-64 min-h-screen shadow-lg">
      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold">{userData?.name || "Usuario"}</h2>
          <h3 className="text-2xl font-bold tracking-wider">ADMIN</h3>
        </div>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-300 ${
                  selectedTab === item.label
                    ? "bg-blue-500 text-white shadow-md"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span className="ml-4">{item.label}</span>
              </button>
            </li>
          ))}
          <li>
            <button
              className="w-full text-left px-4 py-3 rounded-lg flex items-center hover:bg-red-500 hover:text-white transition-all duration-300"
              onClick={handleLogout}
            >
              <ExitToAppIcon />
              <span className="ml-4">Salir</span>
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