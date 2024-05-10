import Nav from "../../../Components/Nav/Nav";
import TemplateCampain1 from "../../../Components/Admin/CampainsAdmin/LandingsCampains/TemplatesCampains/TemplateCampain1";
import Footer from "../../../Components/Footer/Footer";
import { useParams } from "react-router-dom";

export default function ViewLanding() {
  const { landingId, campeinId } = useParams();

  return (
    <div>
      <Nav />
      <TemplateCampain1 campeinId={campeinId} landingId={landingId} />
      <Footer />
    </div>
  );
}