// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import UsersRegisterCursos from "../../Components/Admin/UserAndCursos/UsersRegisterCursos";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewCursosAndUsers() {
  const [selectedTab] = useState("Cursos");
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <div>
          <UsersRegisterCursos />
        </div>
      </div>
    </div>
  );
}
