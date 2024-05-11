import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import UsersDatos from "../../../Components/Admin/AllUsersAdmin/UsersDatos/UsersDatos";

export default function ViewUserDatos () {
    return(
        <div>
            <NavAdmin />
            <SidebarAdmin />
            <UsersDatos />
        </div>
    )
}