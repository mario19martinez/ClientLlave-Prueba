import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import UsersSinActividad from "../../../Components/Admin/NivelAdmin/RegistroActividad/UsersSinActividad";

export default function ViewUserSinActividad() {
    return (
        <div>
            <NavAdmin />
            <div className="flex">
                <SidebarAdmin selectedTab="defaultTab"/>
                <UsersSinActividad />
            </div>
        </div>
    )
}