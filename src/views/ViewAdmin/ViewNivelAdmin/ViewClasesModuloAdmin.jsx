import { useState } from "react";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import ClasesDetailModulo from "../../../Components/Admin/ClasesModuloAdmin/ClasesDetailModulo";

export default function ViewClasesModuloAdmin() {
  const [selectedTab] = useState("Niveles");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <ClasesDetailModulo />
      </div>
    </div>
  );
}