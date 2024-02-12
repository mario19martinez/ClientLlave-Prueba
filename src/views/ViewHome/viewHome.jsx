// eslint-disable-next-line no-unused-vars
import React from "react";
import Nav from "../../Components/Nav/Nav";
import LandingPage from "../../Components/LandingPage/LandingPage";
import ComponentesProfeticos from "../../Components/LandingPage/Profetico/ComponenteProfetico";
import Footer from "../../Components/Footer/Footer";
import BlogHome from "../../Components/Blog/BlogHome";
import Testimonios from "../../Components/Testimonios/Testimonios";
import Viewcardhome from "../ViewCardHome/ViewCardHome";
import Videoshome from "../../Components/Videoshome/Videoshome";

export default function ViewHome() {
  return (
    <div>
      <Nav />
      <LandingPage />
      <div className="flex flex-col md:flex-row w-screen">
        <div className="w-full md:w-10/12 pr-1">
          <Videoshome />
          <ComponentesProfeticos />
        </div>
        <div className="w-full md:w-1/4 mt-4 md:mt-0">
          <Viewcardhome />
        </div>
      </div>
      <BlogHome />
      <Testimonios />
      <Footer />
    </div>
  );
}