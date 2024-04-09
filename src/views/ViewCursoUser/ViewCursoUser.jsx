// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import Cursos from "../../Components/Cursos/Cursos";
import CursosDetailStudent from "../../Components/CursoDetail/CursosDetailStudent";

export default function ViewClasesUser() {
  const [selectedTab /*setSelectedTab*/] = useState("Cursos Inscritos");

  return (
    <div>
      <NavUser />
      <div className="flex">
        {/* Agregar la clase 'sticky' al sidebar */}
        <div className="sticky top-0 h-screen">
          <SidebarUser selectedTab={selectedTab} />
        </div>
        <div className="flex flex-col">
          <CursosDetailStudent />
          <Cursos />
        </div>
      </div>
    </div>
  );
}
