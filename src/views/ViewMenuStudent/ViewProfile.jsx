// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import MiPerfil from "../../Components/Estudiante/DataUser/MiPerfil";

export default function ViewProfile() {
  const [selectedTab /*setSelectedTab*/] = useState("Mi Perfil");
  return (
    <div className="flex flex-col">
      <div>
        <NavUser />
      </div>
      <div className="flex">
        <SidebarUser selectedTab={selectedTab} />

        <MiPerfil />
      </div>
    </div>
  );
}
