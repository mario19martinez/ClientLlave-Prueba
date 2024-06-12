import { useState } from "react";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import NivelAdmin from "../../../Components/Admin/NivelAdmin/NivelAdmin";

export default function ViewNivelAdmin() {
  const [selectedTab] = useState("Nivel");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <NivelAdmin />
      </div>
    </div>
  );
}