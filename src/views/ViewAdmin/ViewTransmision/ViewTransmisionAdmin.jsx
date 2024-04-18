// eslint-disable-next-line no-unused-vars
import React from "react";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import TransmisionAdmin from "../../../Components/Admin/Transmiciones/TransmisionesAdmin";

export default function ViewTransmisionAdmin() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <TransmisionAdmin />
      </div>
    </div>
  );
}