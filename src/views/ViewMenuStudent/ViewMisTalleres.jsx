import { useState } from "react";
import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import MisTalleres from "../../Components/Estudiante/DataUser/MisTalleres";
import Footer from "../../Components/Footer/Footer";

export default function ViewMisTalleres() {
  const [selectedTab, /*setSelectedTab*/] = useState("Mis Talleres");
  return (
    <div>
      <NavUser />
      <SidebarUser selectedTab={selectedTab}/>
      <MisTalleres />
      <Footer />
    </div>
  );
}
