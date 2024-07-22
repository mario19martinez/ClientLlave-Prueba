import { useState } from "react";
import ModuloDetailsStudent from "../../Components/Estudiante/EstudianteNiveles/ModuloDetailsStudent";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarMonitor from "../../Components/Monitor/SidebarMonitor";

export default function ViewMonitorClases() {
  const [selectedTab] = useState("Cursos");
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarMonitor selectedTab={selectedTab} />
        <ModuloDetailsStudent />
      </div>
    </div>
  );
}