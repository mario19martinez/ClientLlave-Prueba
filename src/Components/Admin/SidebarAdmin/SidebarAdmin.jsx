import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import CampaignIcon from "@mui/icons-material/Campaign";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import WebIcon from "@mui/icons-material/Web";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
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
    { label: "Usuarios", icon: <GroupsOutlinedIcon />, path: "/admin" },
    { label: "Cursos", icon: <MenuBookIcon />, path: "/admin/cursos" },
    { label: "Niveles", icon: <CastForEducationIcon />, path: "/niveladmin" },
    { label: "Diplomaturas", icon: <SchoolIcon />, path: "/admin/diplomaturas" },
    { label: "Certificados", icon: <CardMembershipIcon />, path: "/admin/certificacion" },
    { label: "Campañas", icon: <CampaignIcon />, path: "/admin/campain" },
    { label: "Roles", icon: <GroupIcon />, path: "/admin/roles" },
    { label: "Ventas", icon: <MonetizationOnIcon />, path: "/admin/planes" },
    { label: "Página", icon: <WebIcon />, path: "/AdminPage" },
    { label: "Ajustes", icon: <SettingsIcon />, path: "/admin/ajustes" },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-700 to-blue-600 text-white w-64 min-h-screen shadow-xl flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-blue-400">
          <div className="text-center">
            <h2 className="text-lg font-medium">{userData?.name || "Usuario"}</h2>
            <h3 className="text-xl font-bold tracking-wider">ADMIN</h3>
          </div>
        </div>
        <ul className="p-4 space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full px-4 py-3 rounded-lg flex items-center gap-4 transition-all duration-300 ${
                  selectedTab === item.label
                    ? "bg-blue-500 text-white shadow-md"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-blue-400">
        <button
          className="w-full px-4 py-3 rounded-lg flex items-center gap-4 hover:bg-red-500 hover:text-white transition-all duration-300"
          onClick={handleLogout}
        >
          <ExitToAppIcon />
          <span className="font-medium text-sm">Salir</span>
        </button>
      </div>
    </div>
  );
}

SidebarAdmin.propTypes = {
  selectedTab: PropTypes.string.isRequired,
};

export default SidebarAdmin;