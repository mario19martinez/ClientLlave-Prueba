// eslint-disable-next-line no-unused-vars
import React from "react";
import NavSocialNoLogued from "../../../Components/Comunidad/NavSocial/NavSocialNoLogued";
import PublicacionNoLoged from "../../../Components/Comunidad/Publicacion/PublicacionNoLoged";
import PostsNoLoged from "../../../Components/Comunidad/posts/PostsNoLoged";

export default function ViewHomeNoLogued () {
    return (
        <div>
            <NavSocialNoLogued />
            <PublicacionNoLoged />
            <PostsNoLoged />
        </div>
    );
}