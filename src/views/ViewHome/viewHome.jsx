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
    <div className="flex flex-col min-h-screen">
      <Nav />
      <LandingPage />
      <div className="flex flex-col md:flex-row flex-grow w-full">
        <div className="w-full md:w-3/4 md:pr-4">
          <div className="pl-2 pr-2">
          <Videoshome />
          </div>
          <ComponentesProfeticos />
          <div className="pl-2 pr-2"> 
          <BlogHome />
          <Testimonios />
          </div>
        </div>
        <div className="w-full md:w-1/4 mt-4 md:mt-0 md:pl-4">
          <Viewcardhome />
        </div>
      </div>
      <Footer />
    </div>
  );
}
