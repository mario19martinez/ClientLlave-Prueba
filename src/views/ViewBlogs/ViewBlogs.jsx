// eslint-disable-next-line no-unused-vars
import React from 'react';
import Nav from '../../Components/Nav/Nav';
import Blogs from '../../Components/Blog/Blogs';
import Footer from '../../Components/Footer/Footer';
import ContadorHome from '../../Components/Transmisiones/Contadores/ContadorHome';

export default function ViewBlogs() {
    return (
        <div>
            <ContadorHome />
            <Nav />
            <Blogs />
            <Footer />
        </div>
    );
}