import { useState } from "react";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import ModuloDetailAdmin from "../../../Components/Admin/ModuloAdmin/ModuloDetailAdmin";
export default function ViewModuloDetailAdmin() {
  const [selectedTab] = useState("Niveles");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab}/>
        <ModuloDetailAdmin />
      </div>
    </div>
  );
}