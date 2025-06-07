import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DetallesDiplomatura from "../../../Components/Admin/AdminDiplomatura/Diplomatura/DetallesDiplomatura";
import MateriasDiplomaturaAdmin from "../../../Components/Admin/AdminDiplomatura/Diplomatura/MateriasDiplomaturaAdmin/MateriasDiplomaturaAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdministrarMaterias from "../../../Components/Admin/AdminDiplomatura/Diplomatura/MateriasDiplomaturaAdmin/AdministrarManterias";

export default function ViewDiplomaturaDetailsAdmin() {
  const navigate = useNavigate();

  // Estados de control
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const handleReloadMaterias = () => {
    setReloadTrigger((prev) => !prev);
  };

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <div className="flex-1 px-8 py-6">
          {/* Botón de volver */}
          <button
            onClick={() => navigate("/admin/diplomaturas")}
            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors mb-4"
            aria-label="Volver"
          >
            <ArrowBackIcon />
          </button>

          {/* Detalle de la diplomatura */}
          <DetallesDiplomatura />

          {/* Controles para administrar materias */}
          <AdministrarMaterias
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            onReload={handleReloadMaterias}
          />

          {/* Lista de materias filtradas y paginadas */}
          <MateriasDiplomaturaAdmin
            search={search}
            filter={filter}
            reloadTrigger={reloadTrigger}
          />
        </div>
      </div>
    </div>
  );
}