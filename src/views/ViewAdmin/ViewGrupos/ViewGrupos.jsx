import Grupos from "../../../Components/Admin/NivelAdmin/Grupos/Grupos"
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin"
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin"


export default function ViewGrupos() {
    return (
        <div>
            <NavAdmin />
            <SidebarAdmin />
            <div className="">
            <Grupos />
            </div>
        </div>
    )
}