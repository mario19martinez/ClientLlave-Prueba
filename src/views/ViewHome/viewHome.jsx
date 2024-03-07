// eslint-disable-next-line no-unused-vars
import React from "react";
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

export default function ViewHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <LandingPage />

      <div className={`${styles.component}`}>
        <Empresas className="mt-8 " />
      </div>

      <div className="bg-gradient-to-b from-gray-200 white flex-grow">
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
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}