import { useState } from "react";
import { useParams } from "react-router-dom";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import CertificadoNivel from "../../../Components/Admin/Certificacion/CertificadoNivel/CertificadoNivel";

export default function ViewCertificadoNivel() {
  const [selectedTab] = useState("Ceritificados");
  const { nivelId, grupoId } = useParams();
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarAdmin selectedTab={selectedTab} />
        </div>
        <CertificadoNivel nivelId={nivelId} grupoId={grupoId} />
      </div>
    </div>
  );
}