import { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarEditor from "../../Components/ComponentEditor/SidebarEditor";
import CursosDetailsEditor from "../../Components/ComponentEditor/EditorCurso/CursosDetailsEditor";
import Clases from "../../Components/Admin/Clases/Clases";

export default function ViewCursosDetailsEditor() {
  const [selectedTab] = useState("Cursos");

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarEditor selectedTab={selectedTab} />
        <div className="flex flex-col">
          <CursosDetailsEditor />
          <Clases />
        </div>
      </div>
    </div>
  );
}