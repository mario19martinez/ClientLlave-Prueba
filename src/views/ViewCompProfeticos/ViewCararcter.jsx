// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Nav from "../../Components/Nav/Nav";
import Caracter from "../../Components/LandingPage/Profetico/ComponetsPro/Caracter/Caracter";
import Footer from "../../Components/Footer/Footer";

export default function ViewCaracter() {
    useEffect(() => {
        // Scroll hacia arriba cuando se monta el componente
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Nav />
            <Caracter />
            <Footer />
        </div>
    );
}