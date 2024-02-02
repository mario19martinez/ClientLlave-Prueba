// eslint-disable-next-line no-unused-vars
import React from 'react';
import Nav from '../../Components/Nav/Nav';
import NavUser from '../../Components/Estudiante/NavUser/NavUser'
import Footer from '../../Components/Footer/Footer';

export default function ViewDashStudent() {
    return (
        <div>
            <Nav />
                <NavUser />
            <Footer />
        </div>
    );
}