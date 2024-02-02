import { useState } from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import UsersDeleted from "../../Components/Admin/UsersDeleted/UsersDeleted";

export default function ViewUsersDeleted() {
    const [selectedTab] = useState("Usuarios Eliminados")
    return(
        <div>
            <NavAdmin />
            <SidebarAdmin selectedTab={selectedTab}/>
            <UsersDeleted />
        </div>
    )
}