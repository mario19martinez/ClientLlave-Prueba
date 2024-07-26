import { useState } from "react";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import PlanesAdmin from "../../../Components/Admin/Planes/PlanesAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewPlanesAdmin() {
  const [selectedTab] = useState("Ventas");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <PlanesAdmin />
      </div>
    </div>
  );
}