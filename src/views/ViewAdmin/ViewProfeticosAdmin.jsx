// eslint-disable-next-line no-unused-vars
import React from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import ProfeticoAdmin from "../../Components/Admin/Profeticos/ProfeticoAdmin";

export default function ViewProfeticosAdmin() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <ProfeticoAdmin />
      </div>
    </div>
  );
}