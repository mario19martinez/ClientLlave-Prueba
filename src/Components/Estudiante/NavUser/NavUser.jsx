// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import logo from "../../../assets/logo2.png";
import { useNavigate } from "react-router-dom";

export default function NavUser() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-blue-900 py-2 lg:py-3 px-8 lg:px-12 shadow-md">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto">
        <div className="w-1/4 lg:w-2/12">
          <img src={logo} alt="logo" className="h-auto" />
        </div>

        {/* Botón de menú para pantallas pequeñas */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12h18M3 6h18M3 18h18"
              />
            </svg>
          </button>
        </div>

        {/* Menú para pantallas grandes */}
        <nav className="hidden lg:flex justify-center items-center gap-8 text-white font-medium">
          <a
            href=""
            onClick={() => navigate("/")}
            className="hover:text-gray-300 transition-colors"
          >
            Inicio
          </a>
          <a
            href=""
            className="hover:text-gray-300 transition-colors"
            onClick={() => navigate("/blogs")}
          >
            Blog
          </a>
          <a
            href=""
            onClick={() => navigate("/Error404")}
            className="hover:text-gray-300 transition-colors"
          >
            Entrenamiento
          </a>
          <a
            href=""
            onClick={() => navigate("/Comunidad")}
            className="hover:text-gray-300 transition-colors"
          >
            Comunidad
          </a>
          <a
            href=""
            className="hover:text-gray-300 transition-colors"
            onClick={() => navigate("/Nosotros")}
          >
            Nosotros
          </a>
        </nav>
      </div>

      {/* Menú desplegable para pantallas pequeñas */}
      {mobileMenuOpen && (
        <div className="max-w-screen-lg mx-auto mt-4">
          <nav className="flex flex-col text-white font-medium">
            <a
              href="#"
              onClick={() => navigate("/")}
              className="hover:text-gray-300 transition-colors"
            >
              Inicio
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors"
              onClick={() => navigate("/blogs")}
            >
              Blog
            </a>
            <a
              href="#"
              onClick={() => navigate("/Error404")}
              className="hover:text-gray-300 transition-colors"
            >
              Entrenamiento
            </a>
            <a
              href=""
              onClick={() => navigate("/Comunidad")}
              className="hover:text-gray-300 transition-colors"
            >
              Comunidad
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors"
              onClick={() => navigate("/Nosotros")}
            >
              Nosotros
            </a>
          </nav>
        </div>
      )}
    </nav>
  );
}