/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import ClaseDetail from "../../Components/Admin/Clases/ClaseDetail";

export default function ViewAdminClasesTalleresPDF() {
  const [selectedTab] = useState("Cursos");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <div>
        <SidebarAdmin selectedTab={selectedTab} />
        </div>
        <ClaseDetail />
      </div>
    </div>
  );
}