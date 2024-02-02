// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import llave from "../../../../logos/llaveblanca.png";
import { useNavigate } from "react-router-dom";

export default function NavAdmin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-blue-700 py-2 lg:py-3 px-8 lg:px-12 shadow-md w-full top-0 z-50">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto">
        <div className="w-1/4 lg:w-2/12 -translate-x-36">
          <img src={llave} alt="logo" className="h-auto" />
        </div>

        <div className="w-1/4 lg:hidden flex justify-end">
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
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>
        </div>

        <nav className="hidden lg:flex justify-center items-center gap-2 text-white font-medium">
          <a href="" 
          onClick={() => navigate("/")}
          className="hover:text-gray-300 transition-colors hover:bg-blue-500 px-4 py-1 rounded">
            Inicio
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors hover:bg-blue-500 px-4 py-1 rounded">
            Blog
          </a>
          <a href="" 
          onClick={() => navigate("/entrenamiento")}
          className="hover:text-gray-300 transition-colors hover:bg-blue-500 px-4 py-1 rounded">
            Entrenamiento
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors hover:bg-blue-500 px-4 py-1 rounded">
            Miembros
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors hover:bg-blue-500 px-4 py-1 rounded">
            Nosotros
          </a>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="mt-4 max-w-screen-lg mx-auto">
          <nav className="flex flex-col text-white font-medium">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Inicio
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Blog
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Entrenamiento
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Miembros
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Nosotros
            </a>
          </nav>
        </div>
      )}
    </nav>
  );
}
