// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import AllUserCampain from "../../../Components/Admin/CampainsAdmin/UsersCampains/AllUserCampain";

export default function ViewAllUsersCampain () {
    const [selectedTab] = useState("Campañas")
    return (
        <div>
            <NavAdmin />
            <div className="flex">
                <SidebarAdmin selectedTab={selectedTab}/>
                <AllUserCampain />
            </div>
        </div>
    );
}