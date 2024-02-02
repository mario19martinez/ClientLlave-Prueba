// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import Cursos from "../../Components/Admin/Cursos/Cursos";

export default function ViewAdminCursos() {
  const [selectedTab] = useState("Cursos")
  return (
    <div>
      <NavAdmin />
      <SidebarAdmin selectedTab={selectedTab}/>
      <Cursos />
    </div>
  );
}
