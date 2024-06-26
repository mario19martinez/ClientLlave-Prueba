import { useState } from "react";
import { useParams } from "react-router-dom";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import EditLanding from "../../../Components/Admin/CampainsAdmin/LandingsCampains/EditLanding";

export default function ViewEditLanding() {
  const [selectedTab] = useState("Campañas");
  const { campeinId, landingId } = useParams();

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <EditLanding campeinId={campeinId} landingId={landingId} />
      </div>
    </div>
  );
}