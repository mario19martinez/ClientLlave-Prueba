import { useState } from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import EscritorioMonitor from "../../Components/Monitor/EscritorioMonitor";
import SidebarMonitor from "../../Components/Monitor/SidebarMonitor";

export default function ViewEscritorioMonitor() {
    const [selectedTab] = useState("Escritorio");
  return (
    <div>
      <NavUser />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarMonitor selectedTab={selectedTab}/>
        </div>
        <EscritorioMonitor />
      </div>
    </div>
  );
}