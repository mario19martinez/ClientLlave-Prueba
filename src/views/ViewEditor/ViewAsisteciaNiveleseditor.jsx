import { useState } from "react";
import SidebarEditor from "../../Components/ComponentEditor/SidebarEditor";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import RegistroActividad from "../../Components/Admin/NivelAdmin/RegistroActividad/RegistroActividad";

export default function ViewAsisteciaNiveleseditor() {
    const [selectedTab] = useState("Asistencia");
    return (
        <div>
            <NavAdmin />
            <div className="flex">
            <SidebarEditor selectedTab={selectedTab} />
            <RegistroActividad />
            </div>
        </div>
    )
}