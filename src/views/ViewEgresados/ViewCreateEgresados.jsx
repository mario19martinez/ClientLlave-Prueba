// eslint-disable-next-line no-unused-vars
import React from "react";
import NavAdmin from "../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../Components/Admin/SidebarAdmin/SidebarAdmin";
import CreateEgresadoForm from "../../Components/Admin/Egresados/CreateEgresadoForm";

export default function ViewCreateEgresados () {
    return (
        <div>
            <NavAdmin />
            <div className="flex">
                <SidebarAdmin />
                <CreateEgresadoForm />
            </div>
        </div>
    );
}