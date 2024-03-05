// eslint-disable-next-line no-unused-vars
import React from "react";
import { useParams } from "react-router-dom";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import EditEgresados from "../../Components/Admin/Egresados/EditEgresados";

export default function ViewEgresadosEdit() {
    const { id } = useParams();

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <EditEgresados egresadoId={id} /> 
      </div>
    </div>
  );
}