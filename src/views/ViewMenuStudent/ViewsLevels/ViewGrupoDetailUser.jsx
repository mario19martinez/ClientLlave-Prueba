import { useState } from "react";
import NavUser from "../../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../../Components/Estudiante/SidebarUser/SidebarUser";
import GrupoDetailUser from "../../../Components/Estudiante/EstudianteNiveles/GrupoDetailUser";

export default function ViewGrupoDetailUser() {
  const [selectedTab] = useState("Cursos Inscritos");
  return (
    <div>
      <NavUser />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarUser selectedTab={selectedTab} />
        </div>
        <GrupoDetailUser />
      </div>
    </div>
  );
}