import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import ModuloDetailAdmin from "../../../Components/Admin/ModuloAdmin/ModuloDetailAdmin";
export default function ViewModuloDetailAdmin() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <ModuloDetailAdmin />
      </div>
    </div>
  );
}