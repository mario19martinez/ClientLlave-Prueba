import { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import CursosList from "../../Components/Admin/Cursos/CursosList";
//import Cursos from "../../Components/Admin/Cursos/Cursos";

export default function ViewAdminCursos() {
  const [selectedTab] = useState("Cursos")
  const cursos = [];
  const [selectedCurso, setSelectedCurso] = useState(null);
  return (
    <div>
      <NavAdmin />
      <div className="flex">
      <SidebarAdmin selectedTab={selectedTab}/>
      <CursosList cursos={cursos} onSelectCurso={setSelectedCurso} cursoSeleccionado={selectedCurso} />
      </div>
      
    </div>
  );
}
