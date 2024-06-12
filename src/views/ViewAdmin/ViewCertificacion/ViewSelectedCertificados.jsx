import CursoOrNivel from "../../../Components/Admin/Certificacion/CursoOrNivel";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewSelectedCertificado() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <CursoOrNivel />
      </div>
    </div>
  );
}