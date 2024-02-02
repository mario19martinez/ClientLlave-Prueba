// eslint-disable-next-line no-unused-vars
import React from "react";
import Nav from "../../Components/Nav/Nav";
import Blog from "../../Components/Blog/Blog";
import Footer from "../../Components/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";

export default function ViewBlog() {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/blogs");
  };

  return (
    <div className="flex flex-col min-h-screen">
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