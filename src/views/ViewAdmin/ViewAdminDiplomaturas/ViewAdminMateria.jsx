import { useState } from "react";
import DetallesMateriaAdmin from "../../../Components/Admin/AdminDiplomatura/Diplomatura/MateriasDiplomaturaAdmin/DetallesMateriasAdmin";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";

export default function ViewAdminMateria () {
    const [selectedTab] = useState("Diplomaturas");
    return (
        <div>
            <NavAdmin />
            <div className="flex">
                <SidebarAdmin selectedTab={selectedTab} />
                <DetallesMateriaAdmin />
            </div>
        </div>
    );
}