// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import NavUser from '../../Components/Estudiante/NavUser/NavUser';
import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import CursosInscritos from "../../Components/Estudiante/DataUser/CursosInscritos";
import Footer from "../../Components/Footer/Footer";

export default function ViewCursosInscritos () {
    const [selectedTab, /*setSelectedTab*/] = useState("Cursos Inscritos")
    return (
        <div className="flex flex-col">
      <div>
        <NavUser />
      </div>
      <div className="flex">
        <SidebarUser selectedTab={selectedTab} />
        <div className="pt-8">
          <CursosInscritos />
        </div>
      </div>
      <Footer />
    </div>
    );
}