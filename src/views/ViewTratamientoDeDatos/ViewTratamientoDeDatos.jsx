// eslint-disable-next-line no-unused-vars
import React from "react";
import Nav from "../../Components/Nav/Nav";
import TratamientoDeDatos from "../../Components/TratamientoDeDatos/TratamientoDeDatos";
import Footer from "../../Components/Footer/Footer";

export default function ViewTratamientoDeDatos () {
    return (
        <div>
            <Nav />
            <div className="p-6">
                <TratamientoDeDatos />
            </div>
            <Footer />
        </div>
    );
}