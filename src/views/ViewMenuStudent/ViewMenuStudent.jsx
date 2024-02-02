// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
//import DashBoardStudent from '../DashboartStudent/DashBordStudent'
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import Escritorio from "../../Components/Estudiante/DataUser/Escritorio";
import Footer from "../../Components/Footer/Footer";

export default function MenuStudent() {
  const [selectedTab /*setSelectedTab*/] = useState("Escritorio");
  return (
    <div className="flex flex-col">
      <div>
        <NavUser />
      </div>
      <div className="flex">
        <SidebarUser selectedTab={selectedTab} />
        <div className="pt-8">
        <Escritorio />
        </div>
      </div>
      <Footer />
    </div>
  );
}
