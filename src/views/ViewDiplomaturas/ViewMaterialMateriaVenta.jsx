import ClasesYContenido from "../../Components/Diplomaturas/ClasesYContenido";
import MiniaturaDiplomatura from "../../Components/Diplomaturas/MiniatruraDiplomatrua";
import MaterialMateriaVenta from "../../Components/Diplomaturas/MterialMateria";
import Footer from "../../Components/Footer/Footer";
import Nav from "../../Components/Nav/Nav";

export default function ViewMaterialMateriaVenta() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <div className="relative flex-1">
        {/* Miniatura sticky */}
        <div className="sticky top-0 z-30">
          <MiniaturaDiplomatura />
        </div>

        <div className="px-4 md:px-8 py-6">
          <MaterialMateriaVenta />
        </div>

        <div className="px-4 md:px-8 py-6">
          <ClasesYContenido />
        </div>
      </div>

      <Footer />
    </div>
  );
}
