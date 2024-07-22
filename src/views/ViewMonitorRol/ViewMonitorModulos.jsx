import { useState } from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import ModuloMonitor from "../../Components/Monitor/ModuloMonitor";
import SidebarMonitor from "../../Components/Monitor/SidebarMonitor";

export default function ViewMonitorModulos() {
  const [selectedTab] = useState("Cursos");
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarMonitor selectedTab={selectedTab} />
        <ModuloMonitor />
      </div>
    </div>
  );
}