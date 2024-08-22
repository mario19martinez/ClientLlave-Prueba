import { useState } from "react";
import NavUser from "../../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../../Components/Estudiante/SidebarUser/SidebarUser";
import AllCertificadoModulo from "../../../Components/Estudiante/DataUser/Certificados/AllCertificadoModulo";


export default function ViewAllCertificadoModulo () {
    const [selectedTab ] = useState("Mis Certificados");
    return (
      <div>
        <NavUser />
        <div className="flex">
          <SidebarUser selectedTab={selectedTab} />
          <AllCertificadoModulo />
        </div>
      </div>
    );
}