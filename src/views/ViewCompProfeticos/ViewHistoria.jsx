// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import Historia from "../../Components/LandingPage/Profetico/ComponetsPro/Historia/Historia";

export default function ViewHistria () {
    useEffect(() => {
        // Scroll hacia arriba cuando se monta el componente
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Nav />
            <Historia />
            <Footer />
        </div>
    );
}