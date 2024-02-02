import CursoDetail from "../../Components/CursoDetail/CursoDetail";
import Cursos from "../../Components/Cursos/Cursos";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";

export default function ViewClases() {
    const [selectedTab, /*setSelectedTab*/] = useState("Ajustes");
  return (
     <div className="flex flex-col">
     <div>
       <NavUser />
     </div>
     <div className="flex">
       <SidebarUser selectedTab={selectedTab} />
       <div className="pt-8">
       <CursoDetail />
       <Cursos />
       </div>
     </div>
     <Footer />
   </div>
  );
}