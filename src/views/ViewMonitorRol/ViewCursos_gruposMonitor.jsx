import { useState } from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import MonitorGrupos from "../../Components/Monitor/MonitorGrupos";
import SidebarMonitor from "../../Components/Monitor/SidebarMonitor";

export default function ViewCursos_gruposMonitor() {
  const [selectedTab] = useState("Cursos");
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarMonitor selectedTab={selectedTab} />
        <MonitorGrupos />
      </div>
    </div>
  );
}