import { useState } from "react";
import CursosCertificar from "../../../Components/Admin/Certificacion/CursosCertificar";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewCursosCerticar() {
  const [selectedTab] = useState("Ceritificados");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarAdmin selectedTab={selectedTab} />
        </div>
        <CursosCertificar />
      </div>
    </div>
  );
}