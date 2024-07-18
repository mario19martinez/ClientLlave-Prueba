import { useState } from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarMonitor from "../../Components/Monitor/SidebarMonitor";
import MiPerfil from "../../Components/Estudiante/DataUser/MiPerfil";

export default function ViewPerfilMonitor() {
  const [selectedTab] = useState("Mi Perfil");
  return (
    <div>
      <NavUser />
      <div className="flex">
        <SidebarMonitor selectedTab={selectedTab} />
        <MiPerfil />
      </div>
    </div>
  );
}