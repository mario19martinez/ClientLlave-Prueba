import { useState } from "react";
import NavUser from "../../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../../Components/Estudiante/SidebarUser/SidebarUser";
import AllCertificadosNivel from "../../../Components/Estudiante/DataUser/Certificados/AllCertificadosNivel";


export default function ViewAllCertificadosNivel() {
  const [selectedTab ] = useState("Mis Certificados");
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarUser selectedTab={selectedTab} />
        <AllCertificadosNivel />
      </div>
    </div>
  );
}