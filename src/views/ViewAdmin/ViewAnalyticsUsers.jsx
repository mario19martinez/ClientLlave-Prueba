// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import AnalyticsUsers from "../../Components/Admin/Analytics/AnalyticsUsers";

export default function ViewAnalyticsUsers() {
  const [selectedTab] = useState("Usuarios");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <AnalyticsUsers />
      </div>
    </div>
  );
}