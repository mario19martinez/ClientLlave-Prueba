import { useState } from "react";
import { useParams } from "react-router-dom";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import CreateLandingCursos from "../../../Components/Admin/CampainsAdmin/LandingsCampains/createLandingCursos";

export default function ViewCreateLandingCursos() {
  const [selectedTab] = useState("Campañas");
  const { campeinId, template } = useParams();

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin selectedTab={selectedTab} />
        <CreateLandingCursos campeinId={campeinId} templateProp={template} />
      </div>
    </div>
  );
}