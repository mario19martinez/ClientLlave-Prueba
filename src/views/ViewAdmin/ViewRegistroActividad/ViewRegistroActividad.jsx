import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import RegistroActividad from "../../../Components/Admin/NivelAdmin/RegistroActividad/RegistroActividad";

export default function ViewRegistroActividad() {
    return (
        <div>
            <NavAdmin />
            <div className="flex">
            <SidebarAdmin selectedTab="defaultTab" />
            <RegistroActividad />
            </div>
        </div>
    )
}