import Nav from "../../Components/Nav/Nav";
//import Entrenamiento from "../../Components/Entrenamiento/Entrenamiento";
import Footer from "../../Components/Footer/Footer";
import Banners from "../../Components/Entrenamiento/Banners";
//import Niveles from "../../Components/Niveles/Niveles";

export default function ViewEntrenamiento() {
    return(
        <div>
            <Nav />
            {/* <Entrenamiento /> */}
            {/* <Niveles /> */}
            <Banners />
            <Footer /> 
        </div>
    )
}