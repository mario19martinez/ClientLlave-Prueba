import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import NivelDetailAdmin from "../../../Components/Admin/NivelAdmin/NivelDetailAdmin";

export default function ViewNivelDetailAdmin() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarAdmin selectedTab="defaultTab" />
        </div>
        <NivelDetailAdmin />
      </div>
    </div>
  );
}