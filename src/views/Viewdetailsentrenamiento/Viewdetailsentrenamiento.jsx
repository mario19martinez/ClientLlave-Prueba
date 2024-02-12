// eslint-disable-next-line no-unused-vars
import React from "react";
import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import Detailentrenamiento from "../../Components/DetailEntrenamiento/Detailentrenamiento";
import { useParams } from "react-router-dom";

export default function Viewdetailsentrenamiento() {
  const { id } = useParams();

  return (
    <div>
      <Nav />
      <Detailentrenamiento id={id} />
      <Footer />
    </div>
  );
}
