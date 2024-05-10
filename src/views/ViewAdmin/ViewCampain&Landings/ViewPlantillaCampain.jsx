import { useParams } from "react-router-dom";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import PlantillasCampains from "../../../Components/Admin/CampainsAdmin/LandingsCampains/SelectPlantillas/PlantillasCampains";

export default function ViewPlantillaCampain() {
    const { campeinId } = useParams();
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <PlantillasCampains campeinId={campeinId}/>
      </div>
    </div>
  );
}