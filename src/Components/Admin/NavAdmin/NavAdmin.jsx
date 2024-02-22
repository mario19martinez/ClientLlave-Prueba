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
    <div className="bg-blue-700 py-2 lg:py-3 px-8 lg:px-12 shadow-md w-screen top-0 z-50">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto">
        <div className="w-1/4 lg:w-2/12">
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
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12h18M3 6h18M3 18h18"
              />
            </svg>
          </button>
        </div>

        <nav className="hidden lg:flex justify-center items-center gap-2 text-white font-medium">
          <a
            href="#"
            onClick={() => navigate("/")}
            className="hover:text-gray-300 transition-colors px-4 py-2 rounded"
          >
            Inicio
          </a>
          <a
            href="#"
            className="hover:text-gray-300 transition-colors px-4 py-2 rounded"
          >
            Blog
          </a>
          <a
            href="#"
            onClick={() => navigate("/entrenamiento")}
            className="hover:text-gray-300 transition-colors px-4 py-2 rounded"
          >
            Entrenamiento
          </a>
          <a
            href="#"
            className="hover:text-gray-300 transition-colors px-4 py-2 rounded"
          >
            Miembros
          </a>
          <a
            href="#"
            className="hover:text-gray-300 transition-colors px-4 py-2 rounded"
          >
            Nosotros
          </a>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="mt-4 max-w-screen-lg mx-auto">
          <nav className="flex flex-col text-white font-medium">
            <a
              href="#"
              className="hover:text-gray-300 transition-colors px-4 py-2"
            >
              Inicio
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors px-4 py-2"
            >
              Blog
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors px-4 py-2"
            >
              Entrenamiento
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors px-4 py-2"
            >
              Miembros
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors px-4 py-2"
            >
              Nosotros
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}