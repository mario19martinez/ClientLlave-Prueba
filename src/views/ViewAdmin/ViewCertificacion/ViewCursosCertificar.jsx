import CursosCertificar from "../../../Components/Admin/Certificacion/CursosCertificar";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewCursosCerticar() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <CursosCertificar />
      </div>
    </div>
  );
}