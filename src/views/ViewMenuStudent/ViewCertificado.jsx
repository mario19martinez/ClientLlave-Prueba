// eslint-disable-next-line no-unused-vars
import React from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import Certificado from "../../Components/Estudiante/Certificado/Certificado";

export default function ViewCertificado() {
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarUser />
        <Certificado />
      </div>
    </div>
  );
}