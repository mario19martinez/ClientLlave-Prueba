import UserSinCursosYGrupo from "../../Components/Admin/AllUsersAdmin/UsersDatos/UsersSinCursosYGrupo";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewUsersNoInscritoAll() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <UserSinCursosYGrupo />
      </div>
    </div>
  );
}