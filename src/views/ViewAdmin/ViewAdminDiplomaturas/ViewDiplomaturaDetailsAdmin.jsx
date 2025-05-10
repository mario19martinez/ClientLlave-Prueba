import { useNavigate } from "react-router-dom";
import DetallesDiplomatura from "../../../Components/Admin/AdminDiplomatura/Diplomatura/DetallesDiplomatura";
import MateriasDiplomaturaAdmin from "../../../Components/Admin/AdminDiplomatura/Diplomatura/MateriasDiplomaturaAdmin/MateriasDiplomaturaAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ViewDiplomaturaDetailsAdmin() {
  const navigate = useNavigate();

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <div className="flex-1 px-8 py-6">
          {/* Botón solo flecha */}
          <button
            onClick={() => navigate("/admin/diplomaturas")}
            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors mb-4"
            aria-label="Volver"
          >
            <ArrowBackIcon />
          </button>

          <DetallesDiplomatura />
          <MateriasDiplomaturaAdmin />
        </div>
      </div>
    </div>
  );
}
