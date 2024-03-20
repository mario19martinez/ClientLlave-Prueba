// eslint-disable-next-line no-unused-vars
import React from "react";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import AdminCampain from "../../../Components/Admin/CampainsAdmin/AdminCampains/AdminCampain";

export default function ViewCampainAdmin() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <AdminCampain />
      </div>
    </div>
  );
}