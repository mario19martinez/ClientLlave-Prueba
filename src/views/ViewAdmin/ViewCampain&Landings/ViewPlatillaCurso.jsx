import { useParams } from "react-router-dom";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import PlantillasCursos from "../../../Components/Admin/CampainsAdmin/LandingsCampains/SelectPlantillas/PlantillasCursos";

export default function ViewPlatillaCurso() {
  const { campeinId } = useParams();
  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <PlantillasCursos campeinId={campeinId} />
      </div>
    </div>
  );
}