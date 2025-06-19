import { useState } from "react";
import { useNavigate } from "react-router-dom";
import llave from "../../../../logos/llaveblanca.png";

export default function NavAdmin() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Blog", path: "/Blogs" },
    { label: "Entrenamiento", path: "/entrenamiento" },
    { label: "Nosotros", path: "/Nosotros" },
  ];

  return (
    <header className="bg-blue-700 shadow-md w-full z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={llave} alt="Logo" className="h-14 w-auto lg:h-16" />
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-6 text-white font-medium">
          {navItems.map(({ label, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="hover:text-gray-200 transition-colors px-3 py-1 rounded"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile button */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="lg:hidden text-white focus:outline-none"
          aria-label="Abrir menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-blue-700 px-6 pb-4 text-white font-medium">
          {navItems.map(({ label, path }) => (
            <button
              key={label}
              onClick={() => {
                navigate(path);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:text-gray-200 transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}