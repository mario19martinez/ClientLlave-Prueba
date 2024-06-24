// eslint-disable-next-line no-unused-vars
import React from "react";
import NavSocial from "../../../Components/Comunidad/NavSocial/NavSocial";
import ContadorHome from '../../../Components/Transmisiones/Contadores/ContadorHome'
import Publicacion from "../../../Components/Comunidad/Publicacion/Publicacion";
import Posts from "../../../Components/Comunidad/posts/Posts";

export default function HomeComunidadView () {
    return (
        <div className="bg-gray-200">
            <NavSocial />
            <ContadorHome />
            <Publicacion />
            <Posts />
        </div>
    );
}