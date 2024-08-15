import Nav from "../../Components/Nav/Nav";
import LandingPage from "../../Components/LandingPage/LandingPage";
import ComponentesProfeticos from "../../Components/LandingPage/Profetico/ComponenteProfetico";
import Footer from "../../Components/Footer/Footer";
import BlogHome from "../../Components/Blog/BlogHome";
import Testimonios from "../../Components/Testimonios/Testimonios";
import CardObsequio from "../../Components/CardObsequio/CardObsequio";
import Egresados from "../../Components/LandingPage/Egresados/Egresados";
import EntrenamientoProfetico from "../../Components/LandingPage/EntrenammientoProfetico/EntrenamientoProfetico";
import Empresas from "../../Components/Empresas/Empresas";
import styles from "./animate.module.css";
import ContadorHome from "../../Components/Transmisiones/Contadores/ContadorHome";
import ContadorTransmision from "../../Components/Transmisiones/Contadores/ContadorTransmision";
import PlanesHome from "../../Components/Planes/PlanesHome";
import DonacionBoton from "../../Components/DonacionBoton/DonacionBoton";
import RedesSociales from "../../Components/LandingPage/RedesSociales/RedesSociales";

export default function ViewHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <ContadorHome />
      <Nav />
      <div className="bg-gray-200">
        <LandingPage />
        <div className={`${styles.component}`}>
          <Empresas className="mt-8 " />
        </div>
      </div>
      <div className="bg-gradient-to-b from-gray-200 white flex-grow">
        <div className={`${styles.component}`}>
          <RedesSociales />
        </div>
        <div className={`${styles.component}`}>
          <ContadorTransmision className="mt-8" />
        </div>

        <div className={`${styles.component}`}>
          <PlanesHome className="mt-8" />
        </div>

        <div className={`${styles.component}`}>
          <Egresados className="mt-8" />
        </div>

        <div className={`pt-20 pb-20 ${styles.component}`}>
          <ComponentesProfeticos className="mt-8" />
        </div>

        <div className={`${styles.component}`}>
          <CardObsequio className="mt-8" />
        </div>

        <div className={`${styles.component}`}>
          <EntrenamientoProfetico className="mt-8" />
        </div>

        <div className={`${styles.component}`}>
          <BlogHome className="mt-8" />
        </div>
        <div className={`${styles.component}`}>
          <Testimonios className="mt-8" />
        </div>
        <div>
          <DonacionBoton />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}