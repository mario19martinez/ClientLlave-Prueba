// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Nav from "../../Components/Nav/Nav";
import Blog from "../../Components/Blog/Blog";
import Footer from "../../Components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import ContadorHome from "../../Components/Transmisiones/Contadores/ContadorHome";

export default function ViewBlog() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/blogs");
  };

  useEffect(() => {
    // Scroll hacia arriba cuando se monta el componente
    window.scrollTo(0, 0);
}, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ContadorHome />
      <Nav />
      <div className="ml-4 mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleGoBack}
        >
          Atrás
        </button>
      </div>
      <div className="flex-1">
        <Blog blogId={blogId} />
      </div>
      <Footer />
    </div>
  );
}