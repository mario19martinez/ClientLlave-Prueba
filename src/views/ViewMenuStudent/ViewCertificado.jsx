import { useState } from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import Certificados from "../../Components/Estudiante/DataUser/Certificados";


export default function ViewCertificado() {
  const [selectedTab ] = useState("Mis Certificados");
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarUser selectedTab={selectedTab} />
        <Certificados />
      </div>
    </div>
  );
}