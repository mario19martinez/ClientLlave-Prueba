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
    <nav className="bg-blue-700 shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-6 py-3">
        {/* Logo */}
        <div className="w-36 sm:w-44 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className="w-full h-auto object-contain" />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none transition-all duration-200"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 text-white font-semibold text-sm tracking-wide">
          <NavLink label="Inicio" path="/" navigate={navigate} />
          <NavLink label="Blog" path="/Blogs" navigate={navigate} />
          <NavLink label="Planes" path="/Planes" navigate={navigate} />
          <NavLink label="Comunidad" path="/Comunidad" navigate={navigate} />
          <NavLink label="Nosotros" path="/Nosotros" navigate={navigate} />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-blue-600 px-6 pb-4 transition-all duration-300">
          <div className="flex flex-col space-y-3 text-white font-medium text-sm">
            <NavLink label="Inicio" path="/" navigate={navigate} mobile closeMenu={() => setMobileMenuOpen(false)} />
            <NavLink label="Blog" path="/Blogs" navigate={navigate} mobile closeMenu={() => setMobileMenuOpen(false)} />
            <NavLink label="Planes" path="/Planes" navigate={navigate} mobile closeMenu={() => setMobileMenuOpen(false)} />
            <NavLink label="Comunidad" path="/Comunidad" navigate={navigate} mobile closeMenu={() => setMobileMenuOpen(false)} />
            <NavLink label="Nosotros" path="/Nosotros" navigate={navigate} mobile closeMenu={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  );
}

// Componente reutilizable de enlace
const NavLink = ({ label, path, navigate, mobile = false, closeMenu = () => {} }) => {
  return (
    <button
      onClick={() => {
        navigate(path);
        closeMenu();
      }}
      className={`transition-colors duration-200 hover:text-gray-300 ${
        mobile ? "text-left w-full py-1" : ""
      }`}
    >
      {label}
    </button>
  );
};