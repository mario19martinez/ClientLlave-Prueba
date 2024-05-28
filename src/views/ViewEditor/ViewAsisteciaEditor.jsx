import { useState } from "react";
import SeguimientoClases from "../../Components/Admin/AllUsersAdmin/SeguimientoClases/SeguimientoClases";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarEditor from "../../Components/ComponentEditor/SidebarEditor";

export default function ViewAsisteciaEditor() {
  const [selectedTab] = useState("Asistencia");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarEditor selectedTab={selectedTab} />
        <SeguimientoClases />
      </div>
    </div>
  );
}
