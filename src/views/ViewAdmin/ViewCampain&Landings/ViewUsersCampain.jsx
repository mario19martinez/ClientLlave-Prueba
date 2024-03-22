// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import UsersCampain from "../../../Components/Admin/CampainsAdmin/UsersCampains/UsersCampain";

export default function ViewUsersCampain() {
  const [selectedTab] = useState("Campañas");
  const { campeinId } = useParams();
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <UsersCampain campeinId={campeinId} />
      </div>
    </div>
  );
}
