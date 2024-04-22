import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import GrupoDetail from "../../../Components/Admin/NivelAdmin/Grupos/GrupoDetail";

export default function ViewDetailGrupo() {
  return (
    <div>
      <NavAdmin />
      <SidebarAdmin />
      {/* <div className="-translate-y-52 translate-x-72">
      <button className="bg-blue-500 absolute -translate-y-96">
        Volver
      </button>
      </div> */}
      <div className=" ">
      <GrupoDetail />
      </div>
    </div>
  );
}
