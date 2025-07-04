import { useState } from "react";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import CursoOrNivel from "../../../Components/Admin/Certificacion/CursoOrNivel";

export default function ViewCursoOrUser() {
  const [selectedTab] = useState("Certificados");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarAdmin selectedTab={selectedTab} />
        </div>
        <CursoOrNivel />
      </div>
    </div>
  );
}