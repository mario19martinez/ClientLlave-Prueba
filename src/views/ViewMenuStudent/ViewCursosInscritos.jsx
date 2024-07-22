import { useState } from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import CursosInscritos from "../../Components/Estudiante/DataUser/CursosInscritos";
import ContadorHome from "../../Components/Transmisiones/Contadores/ContadorHome";

export default function ViewCursosInscritos() {
  const [selectedTab] = useState("Cursos Inscritos");
  return (
    <div className="flex flex-col">
      <div>
        <NavUser />
      </div>
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarUser selectedTab={selectedTab} />
        </div>
        <div className=" bg-gray-100">
          <ContadorHome />
          <CursosInscritos />
        </div>
      </div>
    </div>
  );
}