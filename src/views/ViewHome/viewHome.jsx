// eslint-disable-next-line no-unused-vars
import React from 'react';
import Nav from '../../Components/Nav/Nav';
import LandingPage from '../../Components/LandingPage/LandingPage'
import Footer from '../../Components/Footer/Footer';
import BlogHome from '../../Components/Blog/BlogHome';
import Testimonios from '../../Components/Testimonios/Testimonios';

export default function ViewHome() {
    return (
        <div>
            <Nav />
            <LandingPage />
            <BlogHome />
            <Testimonios />
            <Footer />
        </div>
    );
}