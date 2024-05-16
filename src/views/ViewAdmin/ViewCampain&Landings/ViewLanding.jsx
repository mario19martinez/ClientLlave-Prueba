import Nav from "../../../Components/Nav/Nav";
import TemplateCampain1 from "../../../Components/Admin/CampainsAdmin/LandingsCampains/TemplatesCampains/TemplateCampain1";
import TemplateCampain2 from "../../../Components/Admin/CampainsAdmin/LandingsCampains/TemplatesCampains/TemplateCampain2";
import Footer from "../../../Components/Footer/Footer";
import { useParams } from "react-router-dom";

export default function ViewLanding() {
  const { landingId, campeinId, template } = useParams();

  return (
    <div>
      <Nav />
      {template === "1" && (
        <TemplateCampain1
          campeinId={campeinId}
          landingId={landingId}
          template={template}
        />
      )}
      {template === "2" && (
        <TemplateCampain2
          campeinId={campeinId}
          landingId={landingId}
          template={template}
        />
      )}
      <Footer />
    </div>
  );
}