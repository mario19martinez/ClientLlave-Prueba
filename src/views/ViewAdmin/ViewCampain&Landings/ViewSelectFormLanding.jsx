import { useParams } from "react-router-dom";
import NavAdmin from "../../../Components/Admin/NavAdmin/NavAdmin";
import SidebarAdmin from "../../../Components/Admin/SidebarAdmin/SidebarAdmin";
import SelectForm from "../../../Components/Admin/CampainsAdmin/LandingsCampains/SelectForm";

export default function ViewSelectFormLanding() {
  const { campeinId } = useParams();

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <SelectForm campeinId={campeinId} />
      </div>
    </div>
  );
}
