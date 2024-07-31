import { useState } from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import MonitorSelectedModulo from "../../Components/Monitor/MonitorSelectedModulo";
import SidebarMonitor from "../../Components/Monitor/SidebarMonitor";

export default function ViewMonitorSelectedModulo() {
  const [selectedTab] = useState("Cursos");
  return (
    <div>
      <NavUser />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarMonitor selectedTab={selectedTab} />
        </div>
        <MonitorSelectedModulo />
      </div>
    </div>
  );
}