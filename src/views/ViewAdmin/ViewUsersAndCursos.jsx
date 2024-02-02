// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import UserAndCursos from "../../Components/Admin/UserAndCursos/UserAndCursos";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewUsersAndCursos() {
  const [selectedTab] = useState("Cursos");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <div>
            <UserAndCursos />
        </div>
      </div>
    </div>
  );
}