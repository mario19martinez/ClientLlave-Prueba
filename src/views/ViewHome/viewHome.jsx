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
//import Viewcardhome from "../ViewCardHome/ViewCardHome";
//import Videoshome from "../../Components/Videoshome/Videoshome";
import Empresas from "../../Components/Empresas/Empresas";

export default function ViewHome() {
  return (
    <div>
      <Nav />
      <LandingPage />
      <Empresas />
      <div className="bg-gradient-to-b from-gray-200 white">
        <Egresados />
        <ComponentesProfeticos />
        <CardObsequio />
        <BlogHome />
        <Testimonios />
      </div>
      <Footer />
    </div>
  );
}