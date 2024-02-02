import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import CrearAbout from "../../Components/Admin/AdminAbaut/CrearAbaut";
import { useState } from "react";

export default function ViewAdminAbautCreate() {
  const [selectedTab] = useState("Nosotros");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div>
          <SidebarAdmin />
        </div>
        <CrearAbout selectedTab={selectedTab} />
      </div>
    </div>
  );
}
