import { useState } from "react";
import SelectetNivelOrModulo from "../../../Components/Admin/Certificacion/CertificadoNivel/SelectedNivelOrModulo";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewNivelOrModulo() {
  const [selectedTab] = useState("Certificados");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <SelectetNivelOrModulo />
      </div>
    </div>
  );
}