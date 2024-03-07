// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Nav from "../../Components/Nav/Nav";
import VerEgresados from "../../Components/LandingPage/Egresados/VerEgresados";
import Footer from "../../Components/Footer/Footer";

export default function ViewEgresados () {
    useEffect(() => {
        // Scroll hacia arriba cuando se monta el componente
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Nav />
            <VerEgresados />
            <Footer />            
        </div>
    );
}