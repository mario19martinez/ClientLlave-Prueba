import { useState } from "react";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import DetallesModulo from "../../../Components/Admin/AdminDiplomatura/Diplomatura/MateriasDiplomaturaAdmin/ModulosMateria/DetallesModulo";
import AdministrarClases from "../../../Components/Admin/AdminDiplomatura/Diplomatura/MateriasDiplomaturaAdmin/ModulosMateria/ClasesDiplomatura/AdministrarClases";
import ClasesDiplomaturaAdmin from "../../../Components/Admin/AdminDiplomatura/Diplomatura/MateriasDiplomaturaAdmin/ModulosMateria/ClasesDiplomatura/ClasesDiplomaturaAdmin";

export default function ViewAdminModuloMateria() {
  const [selectedTab] = useState("Diplomaturas");

  // Estado compartido para filtros
  const [filtros, setFiltros] = useState({
    busqueda: "",
    orden: "recientes",
  });

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <div className="w-full">
          <DetallesModulo />
          <AdministrarClases onFiltroChange={setFiltros} />
          <ClasesDiplomaturaAdmin filtros={filtros} />
        </div>
      </div>
    </div>
  );
}
