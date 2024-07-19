import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import GrupoDetail from "../../../Components/Admin/NivelAdmin/Grupos/GrupoDetail";
import ModulosDelGrupo from "../../../Components/Admin/NivelAdmin/AddModulo/ModulosDelGrupo";

export default function ViewDetailGrupo() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarAdmin selectedTab="defaultTab" />
        </div>
        <div className="flex">
          <GrupoDetail />
          <div className="px-2 py-2">
            <ModulosDelGrupo />
          </div>
        </div>
      </div>
    </div>
  );
}