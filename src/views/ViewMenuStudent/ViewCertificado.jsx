// eslint-disable-next-line no-unused-vars
import React from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import Certificados from "../../Components/Estudiante/DataUser/Certificados";


export default function ViewCertificado() {
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarUser />
        <Certificados />
      </div>
    </div>
  );
}