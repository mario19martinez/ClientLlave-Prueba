import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import Roles from "../../Components/Admin/Roles/Roles";
import { useState } from "react";

export default function ViewRoles() {
    const [selectedTab] = useState("Roles")
    return(
        <div>
            <NavAdmin />
            <SidebarAdmin selectedTab={selectedTab}/>
            <Roles />
        </div>
    )
}