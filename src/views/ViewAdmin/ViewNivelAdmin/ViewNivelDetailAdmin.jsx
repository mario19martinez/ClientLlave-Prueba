import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import NivelDetailAdmin from "../../../Components/Admin/NivelAdmin/NivelDetailAdmin";

export default function ViewNivelDetailAdmin() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab="defaultTab" />
        <NivelDetailAdmin />
      </div>
    </div>
  );
}