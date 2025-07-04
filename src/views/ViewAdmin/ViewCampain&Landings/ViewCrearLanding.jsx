import { useState } from "react";
import { useParams } from "react-router-dom";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import CreateLanding from "../../../Components/Admin/CampainsAdmin/LandingsCampains/createLanding";

export default function ViewCrearLanding() {
  const [selectedTab] = useState("Campañas");
  const { campeinId, template } = useParams();
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <CreateLanding campeinId={campeinId} templateProp={template} /> 
      </div>
    </div>
  );
}