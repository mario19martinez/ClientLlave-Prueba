// eslint-disable-next-line no-unused-vars
import React from "react";
import Nav from "../../Components/Nav/Nav";
import TransmisionDetails from "../../Components/Transmisiones/TransmisionDetails";
import Footer from "../../Components/Footer/Footer";
import { useParams } from "react-router-dom";

export default function ViewTransmisionDetails() {
  const { id } = useParams();
  return (
    <div>
      <Nav />
      <TransmisionDetails id={id} />
      <Footer />
    </div>
  );
}