// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Nav from "../../Components/Nav/Nav";
import TransmisionDetails from "../../Components/Transmisiones/TransmisionDetails";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";

export default function ViewTransmisionDetails() {
  useEffect(() => {
    // Scroll hacia arriba cuando se monta el componente
    window.scrollTo(0, 0);
}, []);

  const { id } = useParams();
  
  return (
    <div>
      <Nav />
      <TransmisionDetails id={id} />
      <Footer />
    </div>
  );
}