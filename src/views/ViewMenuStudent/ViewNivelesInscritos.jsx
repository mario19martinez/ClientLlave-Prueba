// eslint-disable-next-line no-unused-vars
import React from "react";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import NivelesInscritos from "../../Components/Estudiante/DataUser/NivelesInscritos";

export default function ViewNivelesInscitos () {
    return (
        <div>
            <NavUser />
            <div className="flex">
                <SidebarUser selectedTab="defaultTab"/>
                <NivelesInscritos />
            </div>
        </div>
    );
}