import { useState } from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import MonitorGruposDetails from "../../Components/Monitor/MonitorGruposDetails";
import SidebarMonitor from "../../Components/Monitor/SidebarMonitor";

export default function ViewMonitorGrupoDelails() {
  const [selectedTab] = useState("Cursos");
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarMonitor selectedTab={selectedTab} />
        <MonitorGruposDetails />
      </div>
    </div>
  );
}