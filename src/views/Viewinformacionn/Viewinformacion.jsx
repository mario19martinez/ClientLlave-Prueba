import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import Informacion from "../../Components/Admin/Informacion/Informacion";
import { useState } from "react";

export default function Viewinformacion () {
    const [selectedTab] = useState("Informacion")
  return (
    <div>
      <NavAdmin />
      <SidebarAdmin selectedTab={selectedTab}/>
      <Informacion  classname="-translate-y-96"/>
    </div>
  );
}
