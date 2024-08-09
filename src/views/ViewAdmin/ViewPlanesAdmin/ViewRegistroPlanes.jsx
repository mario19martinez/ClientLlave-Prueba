import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import RegistroPlanes from "../../../Components/Admin/Planes/RegistroPlanes/RegistroPlanes";

export default function ViewRegistroPlanes() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab="default" />
        <RegistroPlanes />
      </div>
    </div>
  );
}
