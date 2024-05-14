//import { useState } from 'react'
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NivelesDeleteAdmin from "../../../Components/Admin/NivelAdmin/NivelesDeleteAdmin";

export default function ViewNivelDeleteAdmin() {
  //const [selectedTab] = useState('Nivel Eliminado')
  return (
    <div>
      <NavAdmin />
      <SidebarAdmin selectedTab="defaultTab"/>
      <div>
        <NivelesDeleteAdmin />
      </div>
    </div>
  );
}
