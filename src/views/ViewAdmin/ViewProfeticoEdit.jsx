// eslint-disable-next-line no-unused-vars
import React from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import ProfeticoEdit from "../../Components/Admin/Profeticos/ProfeticoEdit";
import { useParams } from "react-router-dom";

export default function ViewProfeticoEdit() {
    const { id } = useParams();

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <ProfeticoEdit profeticoId={id}/>
      </div>
    </div>
  );
}