import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import ClasesDetailModulo from "../../../Components/Admin/ClasesModuloAdmin/ClasesDetailModulo";

export default function ViewClasesModuloAdmin() {
  return (
    <div>
      <NavAdmin />
      <SidebarAdmin selectedTab="defaultTab"/>
      <ClasesDetailModulo />
    </div>
  );
}
