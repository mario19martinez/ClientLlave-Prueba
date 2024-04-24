// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Nav from "../../Components/Nav/Nav";
import Transmision from "../../Components/Transmisiones/Transmision";
import Footer from "../../Components/Footer/Footer";

export default function ViewTransmision() {
  useEffect(() => {
    // Scroll hacia arriba cuando se monta el componente
    window.scrollTo(0, 0);
}, []);
  return (
    <div>
      <Nav />
      <Transmision />
      <Footer />
    </div>
  );
}
