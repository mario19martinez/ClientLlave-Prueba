import { useState } from "react";
import Ajustes from "../../Components/Estudiante/DataUser/Ajustes";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarMonitor from "../../Components/Monitor/SidebarMonitor";

export default function ViewAjustesMonitor() {
    const [selectedTab] = useState("Ajustes");
  return (
    <div>
      <NavUser />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarMonitor selectedTab={selectedTab} />
        </div>
        <Ajustes />
      </div>
    </div>
  );
}