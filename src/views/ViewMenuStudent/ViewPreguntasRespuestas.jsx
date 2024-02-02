import { useState } from "react";
import SidebarUser from "../../Components/Estudiante/SidebarUser/SidebarUser";
import NavUser from "../../Components/Estudiante/NavUser/NavUser";
import PreguntasRespueestas from "../../Components/Estudiante/DataUser/PreguntasRespuestas";
import Footer from "../../Components/Footer/Footer";

export default function ViewPreguntasRespuestas() {
    const [selectedTab, /*setSelectedTab*/] = useState("Preguntas & Respuestas");
    return(
        <div>
            <NavUser />
            <SidebarUser selectedTab={selectedTab}/>
            <PreguntasRespueestas />
            <Footer />
        </div>
    )
}