// eslint-disable-next-line no-unused-vars
import React from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import EgresadosAdmin from "../../Components/Admin/Egresados/EgresadosAdmin";

export default function ViewEgresadosAdmin() {
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <EgresadosAdmin />
      </div>
    </div>
  );
}