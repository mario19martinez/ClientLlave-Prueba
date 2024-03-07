// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Nav from "../../Components/Nav/Nav";
import Llamamiento from "../../Components/LandingPage/Profetico/ComponetsPro/Llamamiento/Llamiento";
import Footer from "../../Components/Footer/Footer";

export default function ViewLlamamiento () {
    useEffect(() => {
        // Scroll hacia arriba cuando se monta el componente
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Nav />
            <Llamamiento />
            <Footer />
        </div>
    );
}