import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import Ajustes from "../../Components/Estudiante/DataUser/Ajustes";
import { useState } from "react";

export default function ViewAjustes() {
  const [selectedTab /*setSelectedTab*/] = useState("Ajustes");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <NavUser />

      {/* Contenido principal */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="sticky top-0 h-screen">
          <SidebarUser selectedTab={selectedTab} />
        </div>

        {/* Contenido de Ajustes centrado */}
        <main className="flex-1 flex items-start justify-center p-6 md:p-10">
          <div className="w-full max-w-4xl">
            <Ajustes />
          </div>
        </main>
      </div>
    </div>
  );
}