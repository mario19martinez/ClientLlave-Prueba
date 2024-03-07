// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import CrearProfeticos from "../../Components/Admin/Profeticos/CrearProfeticos";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewFormProfetico() {
  useEffect(() => {
    // Scroll hacia arriba cuando se monta el componente
    window.scrollTo(0, 0);
}, []);
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
