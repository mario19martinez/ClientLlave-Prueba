import Nav from "../../../Components/Nav/Nav";
import TemplateCurso1 from "../../../Components/Admin/CampainsAdmin/LandingsCampains/TemplatesCursos/TemplateCurso1";
import TemplateCurso2 from "../../../Components/Admin/CampainsAdmin/LandingsCampains/TemplatesCursos/TemplateCurso2";
import Footer from "../../../Components/Footer/Footer";
import { useParams } from "react-router-dom";

export default function ViewLandingCursos() {
  const { landingId, campeinId, template, idcurso } = useParams();

  return (
    <div>
      <Nav />
      {template === "3" && (
        <TemplateCurso1
          campeinId={campeinId}
          landingId={landingId}
          template={template}
          idCurso={idcurso}
        />
      )}

      {template === "4" && (
        <TemplateCurso2
          campeinId={campeinId}
          landingId={landingId}
          template={template}
          idCurso={idcurso}
        />
      )}
      <Footer />
    </div>
  );
}