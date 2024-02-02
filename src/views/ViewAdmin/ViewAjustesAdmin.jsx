// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import AjustesAdmin from "../../Components/Admin/AjustesAdmin/AjustesAdmin";

export default function ViewAjustesAdmin() {
  const [selectedTab] = useState("Ajustes");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div>
          <SidebarAdmin selectedTab={selectedTab} />
        </div>
        <AjustesAdmin />
      </div>
    </div>
  );
}
