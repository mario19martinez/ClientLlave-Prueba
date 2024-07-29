import UserCertificarModulo from "../../../Components/Admin/Certificacion/CertificadoModulo/UserCertificarModulo";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewCertificarModulo() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <UserCertificarModulo />
      </div>
    </div>
  );
}