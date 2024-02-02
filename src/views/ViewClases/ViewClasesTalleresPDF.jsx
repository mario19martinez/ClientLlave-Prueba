// eslint-disable-next-line no-unused-vars
import React from "react";
import Nav from "../../Components/Nav/Nav";
import ClaseDetail from "../../Components/Admin/Clases/ClaseDetail";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";

export default function ViewClasesTalleresPDF() {
  const navigate = useNavigate();
  return (
    <div>
      <Nav />
      <button
        onClick={() => navigate("/entrenamiento")}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Atrás
      </button>

      <div>
        <ClaseDetail />
      </div>
      <Footer />
    </div>
  );
}
