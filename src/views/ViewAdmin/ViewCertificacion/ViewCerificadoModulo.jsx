import { useState } from "react";
import CertificarModulo from "../../../Components/Admin/Certificacion/CertificadoModulo/CertificarModulo";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewCertficadoModulo() {
  const [selectedTab] = useState("Certificados");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <CertificarModulo />
      </div>
    </div>
  );
}