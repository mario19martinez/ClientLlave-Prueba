import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import GrupoDetail from "../../../Components/Admin/NivelAdmin/Grupos/GrupoDetail";
import ModulosDelGrupo from "../../../Components/Admin/NivelAdmin/AddModulo/ModulosDelGrupo";

export default function ViewDetailGrupo() {
  return (
    <div>
      <NavAdmin />
      <SidebarAdmin selectedTab="defaultTab"/>
      <div className="">
      <GrupoDetail />
      </div>
      <div className="">
       <ModulosDelGrupo /> 
      </div>
    </div>
  );
}
