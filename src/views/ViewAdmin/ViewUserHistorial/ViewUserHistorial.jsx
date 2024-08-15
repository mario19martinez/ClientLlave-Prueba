import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import UserHistorial from "../../../Components/Admin/AllUsersAdmin/UserHistorial/UserHistorial";

export default function ViewUserHistorial() {
    return(
        <div>
            <NavAdmin />
            <SidebarAdmin selectedTab="defaultTab" />
            <UserHistorial />
        </div>
    )
}