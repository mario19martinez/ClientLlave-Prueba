import { useState } from "react";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SeguimientoGeneralGrupo from "../../../Components/Admin/NivelAdmin/SeguimientoGeneral/SeguimientoGeneralGrupo";

export default function ViewSeguimientoGeneral() {
  const [selectedTab] = useState("Niveles");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <SeguimientoGeneralGrupo />
      </div>
    </div>
  );
}