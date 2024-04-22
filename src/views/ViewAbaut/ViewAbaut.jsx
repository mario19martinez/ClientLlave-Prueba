// eslint-disable-next-line no-unused-vars
import React from 'react';
import Nav from '../../Components/Nav/Nav';
import About from '../../Components/Abaut/Abaut';
import Footer from '../../Components/Footer/Footer';
import ContadorHome from '../../Components/Transmisiones/Contadores/ContadorHome';


export default function ViewAbaut() {
    return (
        <div>
            <ContadorHome />
            <Nav />
            <About />
            <Footer />
        </div>
    );
}