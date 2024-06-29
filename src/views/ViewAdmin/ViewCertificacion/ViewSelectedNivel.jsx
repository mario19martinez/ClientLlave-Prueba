import { useState } from "react";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import SelectedNivel from "../../../Components/Admin/Certificacion/CertificadoNivel/SelectedNivel";

export default function ViewSelectedNivel() {
  const [selectedTab] = useState("Ceritificados");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div className="sticky top-0 h-screen">
          <SidebarAdmin selectedTab={selectedTab} />
        </div>
        <SelectedNivel />
      </div>
    </div>
  );
}