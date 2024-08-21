import { useState } from "react";
import NavUser from "../../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../../Components/Estudiante/SidebarUser/SidebarUser";
import SelectedCertificado from "../../../Components/Estudiante/DataUser/Certificados/SelectedCertificado";

export default function ViewCertificadoSelected() {
  const [selectedTab ] = useState("Mis Certificados");
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarUser selectedTab={selectedTab} />
        <SelectedCertificado />
      </div>
    </div>
  );
}