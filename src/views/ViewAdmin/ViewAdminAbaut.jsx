import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import AdminAbout from "../../Components/Admin/AdminAbaut/AdminAbaut";
import { useState } from "react";

export default function ViewAdminAbaut() {
    const [selectedTab] = useState("Nosotros");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div>
          <SidebarAdmin />
        </div>
        <div className="pt-3 pl-10">
          <AdminAbout selectedTab={selectedTab}/>
        </div>
      </div>
    </div>
  );
}
