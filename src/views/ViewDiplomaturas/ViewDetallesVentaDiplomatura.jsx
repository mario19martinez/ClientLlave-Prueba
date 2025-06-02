import DetallesVentaDiplomatura from "../../Components/Diplomaturas/DetallesVentaDiplomatura";
import MateriasDiplomaturaVenta from "../../Components/Diplomaturas/MateriasDiplomaturaVenta";
import Footer from "../../Components/Footer/Footer";
import Nav from "../../Components/Nav/Nav";

export default function ViewDetallesVentaDiplomatura () {
    return (
        <div>
            <Nav />
            <DetallesVentaDiplomatura />
            <MateriasDiplomaturaVenta />
            <Footer />
        </div>
    );
}