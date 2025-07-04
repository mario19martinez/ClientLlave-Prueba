import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import CursosEliminados from "../../Components/Admin/Cursos/CursosEliminados";
import { useState } from "react";

export default function ViewCursosEliminados() {
  const [selectedTab] = useState("Cursos Eliminados");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
      <SidebarAdmin selectedTab={selectedTab} />
        <CursosEliminados />
      </div>
    </div>
  );
}
