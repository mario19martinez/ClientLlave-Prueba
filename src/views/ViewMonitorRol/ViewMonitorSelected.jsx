import { useState } from "react";
import { useParams } from "react-router-dom";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import MonitorSelected from "../../Components/Monitor/MonitorSelected";
import SidebarMonitor from "../../Components/Monitor/SidebarMonitor";

export default function ViewMonitorSelected() {
  const { grupoId, nivelId, userSub } = useParams();
  const [selectedTab] = useState("Cursos");
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarMonitor selectedTab={selectedTab} />
        <MonitorSelected grupoId={grupoId} nivelId={nivelId} userSub={userSub} />
      </div>
    </div>
  );
}