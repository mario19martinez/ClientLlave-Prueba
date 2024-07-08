import Nav from "../../Components/Nav/Nav";
//import Entrenamiento from "../../Components/Entrenamiento/Entrenamiento";
import Footer from "../../Components/Footer/Footer";
import Banners from "../../Components/Entrenamiento/Banners";
import ContadorHome from "../../Components/Transmisiones/Contadores/ContadorHome";
import Niveles from "../../Components/Niveles/Niveles";

export default function ViewEntrenamiento() {
    return(
        <div>
            <ContadorHome />
            <Nav />
            {/* <Entrenamiento /> */}
            <Banners />
            <Niveles />
            <Footer /> 
        </div>
    )
}