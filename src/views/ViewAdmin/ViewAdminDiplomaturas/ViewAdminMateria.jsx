import { useState } from "react";
import DetallesMateriaAdmin from "../../../Components/Admin/AdminDiplomatura/Diplomatura/MateriasDiplomaturaAdmin/DetallesMateriasAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import AdministrarModulos from "../../../Components/Admin/AdminDiplomatura/Diplomatura/MateriasDiplomaturaAdmin/ModulosMateria/AdministrarModulos";
import ModulosMateriaAdmin from "../../../Components/Admin/AdminDiplomatura/Diplomatura/MateriasDiplomaturaAdmin/ModulosMateria/ModulosMateriaAdmin";

export default function ViewAdminMateria() {
  const [selectedTab] = useState("Diplomaturas");

  // Estado que se usará como "trigger" para actualizar los módulos
  const [refrescarModulos, setRefrescarModulos] = useState(false);

  // Función que alterna el valor para forzar el useEffect en ModulosMateriaAdmin
  const handleModulosActualizados = () => {
    setRefrescarModulos(prev => !prev);
  };

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <div>
          <DetallesMateriaAdmin />
          <AdministrarModulos onModulosChange={handleModulosActualizados} />
          <ModulosMateriaAdmin refreshTrigger={refrescarModulos} />
        </div>
      </div>
    </div>
  );
}
