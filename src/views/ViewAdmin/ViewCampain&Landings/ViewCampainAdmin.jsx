// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import AdminCampain from "../../../Components/Admin/CampainsAdmin/AdminCampains/AdminCampain";

export default function ViewCampainAdmin() {
  const [selectedTab] = useState("Campañas")
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab}/>
        <AdminCampain />
      </div>
    </div>
  );
}