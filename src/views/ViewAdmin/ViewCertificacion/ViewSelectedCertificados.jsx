import { useState } from "react";
import CursoOrNivel from "../../../Components/Admin/Certificacion/CursoOrNivel";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewSelectedCertificado() {
  const [selectedTab] = useState("Certificados");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <CursoOrNivel />
      </div>
    </div>
  );
}