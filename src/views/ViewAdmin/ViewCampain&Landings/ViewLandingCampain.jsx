// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import AdminLanding from "../../../Components/Admin/CampainsAdmin/LandingsCampains/adminLanding";

export default function ViewLandingCampain() {
  const [selectedTab] = useState("Campañas");
  const { campeinId } = useParams();
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <AdminLanding campeinId={campeinId} />
      </div>
    </div>
  );
}