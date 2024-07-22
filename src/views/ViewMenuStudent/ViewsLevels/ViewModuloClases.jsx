import { useState } from "react";
import SidebarUser from "../../../Components/Estudiante/SidebarUser/SidebarUser";
import NavUser from "../../../Components/Estudiante/NavUser/NavUser";
import ModuloDetailsStudent from "../../../Components/Estudiante/EstudianteNiveles/ModuloDetailsStudent";

export default function ViewModuloClases() {
  const [selectedTab] = useState("Cursos");
  return (
    <div>
      <NavUser />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarUser selectedTab={selectedTab} />
        </div>
        <ModuloDetailsStudent />
      </div>
      {/* <NivelClases /> */}
    </div>
  );
}