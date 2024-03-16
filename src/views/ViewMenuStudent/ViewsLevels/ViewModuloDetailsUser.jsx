// eslint-disable-next-line no-unused-vars
import React from "react";
import NavUser from "../../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../../Components/Estudiante/SidebarUser/SidebarUser";
import ModuloDetailsStudent from "../../../Components/Estudiante/EstudianteNiveles/ModuloDetailsStudent";

export default function ViewModuloDetailsUser(){
    return (
        <div>
            <NavUser />
            <div className="flex">
                <SidebarUser />
                <ModuloDetailsStudent />
            </div>
        </div>
    );
}