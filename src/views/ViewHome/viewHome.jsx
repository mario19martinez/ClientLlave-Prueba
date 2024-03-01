// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSpring, animated } from "react-spring";
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
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <animated.div style={fadeIn}>
        <LandingPage />
      </animated.div>
      <animated.div style={fadeIn}>
        <Empresas className="mt-8" />
      </animated.div>
      <div className="bg-gradient-to-b from-gray-200 white flex-grow">
        <animated.div style={fadeIn}>
          <Egresados className="mt-8" />
        </animated.div>
        <div className="pt-20 pb-20">
          <animated.div style={fadeIn}>
            <ComponentesProfeticos className="mt-8" />
          </animated.div>
        </div>
        <animated.div style={fadeIn}>
          <CardObsequio className="mt-8" />
        </animated.div>
        <animated.div style={fadeIn}>
          <EntrenamientoProfetico className="mt-8" />
        </animated.div>
        <animated.div style={fadeIn}>
          <BlogHome className="mt-8" />
        </animated.div>
        <animated.div style={fadeIn}>
          <Testimonios className="mt-8" />
        </animated.div>
      </div>
      <Footer />
    </div>
  );
}
