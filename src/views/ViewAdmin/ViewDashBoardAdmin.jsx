// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import AllUsersAdmin from "../../Components/Admin/AllUsersAdmin/AllUsersAdmin";

export default function ViewDashBoardAdmin() {
  const [selectedTab] = useState("Usuarios");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <AllUsersAdmin />
      </div>
    </div>
  );
}
