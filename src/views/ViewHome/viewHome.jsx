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

export default function ViewHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <LandingPage />
      <Empresas className="mt-8" />
      <div className="bg-gradient-to-b from-gray-200 white flex-grow">
        <Egresados className="mt-8" />
        <ComponentesProfeticos className="mt-8" />
        <CardObsequio className="mt-8" />
        <EntrenamientoProfetico className="mt-8" />
        <BlogHome className="mt-8" />
        <Testimonios className="mt-8" />
      </div>
      <Footer />
    </div>
  );
}