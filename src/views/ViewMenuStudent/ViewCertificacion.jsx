// eslint-disable-next-line no-unused-vars
import React from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import FormLegal from "../../Components/FormLegal/FormLegal";

export default function ViewCertificacion() {
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarUser />
        <FormLegal />
      </div>
    </div>
  );
}
