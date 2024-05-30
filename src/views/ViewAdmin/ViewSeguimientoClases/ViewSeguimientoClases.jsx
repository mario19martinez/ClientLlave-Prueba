import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SeguimientoClases from "../../../Components/Admin/AllUsersAdmin/SeguimientoClases/SeguimientoClases";

export default function ViewSeguimientoClases() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab="defaultTab" />
        <SeguimientoClases />
      </div>
    </div>
  );
}
