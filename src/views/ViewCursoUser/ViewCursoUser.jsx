// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
//import Cursos from "../../Components/Admin/Cursos/Cursos";
import CursoDetail from "../../Components/CursoDetail/CursoDetail";
import Cursos from "../../Components/Cursos/Cursos";
//import { useNavigate } from "react-router-dom";

export default function ViewClasesUser() {
  const [selectedTab /*setSelectedTab*/] = useState("Cursos Inscritos");
  //const navigate = useNavigate();

  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarUser selectedTab={selectedTab} />
        <div className="flex flex-col">
          <CursoDetail />
          <Cursos />
        </div>
      </div>
    </div>
  );
}
