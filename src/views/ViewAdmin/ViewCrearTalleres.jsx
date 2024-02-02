// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import CrearTaller from "../../Components/Admin/Talleres/CrearTaller";

export default function ViewCrearTalleres() {
  const [selectedTab] = useState("Cursos");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div>
        <SidebarAdmin selectedTab={selectedTab} />
        </div>
        <CrearTaller />
      </div>
    </div>
  );
}
