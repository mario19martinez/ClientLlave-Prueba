import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import Ajustes from "../../Components/Estudiante/DataUser/Ajustes";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";

export default function ViewAjustes() {
    const [selectedTab, /*setSelectedTab*/] = useState("Ajustes");
    return (
        <div className="flex flex-col">
      <div>
        <NavUser />
      </div>
      <div className="flex">
        <SidebarUser selectedTab={selectedTab} />
        <div className="pt-8">
          <Ajustes />
        </div>
      </div>
      <Footer />
    </div>
    )
}