import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import EditarAbout from "../../Components/Admin/AdminAbaut/EditarAbaut";
import { useState } from "react";

export default function ViewAdminAbautActualizar() {
    const [selectedTab] = useState("Nosotros");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div>
          <SidebarAdmin />
        </div>
        <div className="pt-3 pl-10">
          <EditarAbout selectedTab={selectedTab}/>
        </div>
      </div>
    </div>
  );
}