//import AgregarClases from "../../Components/Admin/Clases/AgregarClases";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Clases from "../../Components/Admin/Clases/Clases";
//import CursoDetail from "../../Components/CursoDetail/CursoDetail";
import CursoDetail from "../../Components/Admin/Cursos/CursoDetail";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewClasesAdmin() {
  const [selectedTab] = useState("Cursos");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <div>
          <CursoDetail />
          <Clases />
        </div>
      </div>
    </div>
  );
}