import { useState } from "react";
import DetallesMateriaAdmin from "../../../Components/Admin/AdminDiplomatura/Diplomatura/MateriasDiplomaturaAdmin/DetallesMateriasAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import AdministrarModulos from "../../../Components/Admin/AdminDiplomatura/Diplomatura/MateriasDiplomaturaAdmin/ModulosMateria/AdministrarModulos";
import ModulosMateriaAdmin from "../../../Components/Admin/AdminDiplomatura/Diplomatura/MateriasDiplomaturaAdmin/ModulosMateria/ModulosMateriaAdmin";

export default function ViewAdminMateria() {
  const [selectedTab] = useState("Diplomaturas");

  // Estado para actualizar los módulos después de creación/edición
  const [refrescarModulos, setRefrescarModulos] = useState(false);

  // Estados globales de búsqueda y filtro
  const [search, setSearch] = useState("");

  // Toggle para refrescar useEffect en ModulosMateriaAdmin
  const handleModulosActualizados = () => {
    setRefrescarModulos((prev) => !prev);
  };

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <div className="flex-1 px-6">
          <DetallesMateriaAdmin />
          <AdministrarModulos
            search={search}
            setSearch={setSearch}
            onModulosChange={handleModulosActualizados}
          />
          <ModulosMateriaAdmin
            refreshTrigger={refrescarModulos}
            search={search}
          />
        </div>
      </div>
    </div>
  );
}
