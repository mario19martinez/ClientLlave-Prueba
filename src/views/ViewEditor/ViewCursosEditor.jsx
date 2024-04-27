import { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarEditor from "../../Components/ComponentEditor/SidebarEditor";
import CursosEditor from "../../Components/ComponentEditor/EditorCurso/CursosEditor";

export default function ViewCursosEditor() {
  const [selectedTab] = useState("Cursos");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarEditor selectedTab={selectedTab} />
        <CursosEditor />
      </div>
    </div>
  );
}