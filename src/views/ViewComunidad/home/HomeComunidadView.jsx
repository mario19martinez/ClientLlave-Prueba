// eslint-disable-next-line no-unused-vars
import React from "react";
import NavSocial from "../../../Components/Comunidad/NavSocial/NavSocial";
import Publicacion from "../../../Components/Comunidad/Publicacion/Publicacion";
import Posts from "../../../Components/Comunidad/posts/Posts";

export default function HomeComunidadView () {
    return (
        <div>
            <NavSocial />
            <Publicacion />
            <Posts />
        </div>
    );
}