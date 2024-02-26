// eslint-disable-next-line no-unused-vars
import React from "react";
import CrearProfeticos from "../../Components/Admin/Profeticos/CrearProfeticos";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewFormProfetico() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <CrearProfeticos />
      </div>
    </div>
  );
}
