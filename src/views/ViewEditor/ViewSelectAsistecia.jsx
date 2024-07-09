import { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import EditorTipoAsistencia from "../../Components/ComponentEditor/EditorAsistencias/EditorTipoAsistencia";
import SidebarEditor from "../../Components/ComponentEditor/SidebarEditor";

export default function ViewSelectAsistencia() {
    const [selectedTab] = useState("Asistencia");

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarEditor selectedTab={selectedTab} />
        <EditorTipoAsistencia />
      </div>
    </div>
  );
}
