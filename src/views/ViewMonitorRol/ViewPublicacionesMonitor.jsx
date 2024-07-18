import { useState } from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarMonitor from "../../Components/Monitor/SidebarMonitor";
import MyPost from "../../Components/Estudiante/MyPost/MyPost";

export default function ViewPublicacionesMonitor() {
  const [selectedTab] = useState("Publicaciones");

  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarMonitor selectedTab={selectedTab} />
        <MyPost />
      </div>
    </div>
  );
}