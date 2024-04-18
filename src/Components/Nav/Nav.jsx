// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import logo from "../../assets/logo2.png";
import LoginForm from "../InicioSesion/InicioSesion.jsx";
import { getUserData } from "../../Redux/features/Users/usersSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const location = useLocation();

  const navigate = useNavigate();

  const userData = useSelector((state) => state.users.userData);

  const storedEmail = localStorage.getItem("email");
  const superAdmin = localStorage.getItem("SuperAdmin");

  console.log("El super admin es:", superAdmin);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleLoginForm = () => {
    setIsLoginFormOpen(!isLoginFormOpen);
  };

  const toggleRegistrationModal = () => {
    navigate("/RegistroUser");
  };

  useEffect(() => {
    // Escuchar cambios en localStorage y actualizar el estado de isLoggedIn
    const handleStorageChange = (e) => {
      if (e.key === "isLoggedIn") {
        setIsLoggedIn(e.newValue === "true");
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  console.log(userData);

  const redirect = () => {
    if (
      (isLoggedIn === true && userData && userData.rol === "client") ||
      userData?.rol === "client"
    ) {
      //navigate("/estudiante/Escritorio");
      navigate("/estudiante/cursosInscritos");
    } else if (
      (isLoggedIn === true && userData && userData.rol === "admin") ||
      userData?.rol === "admin"
    ) {
      navigate("/admin");
    } else if (isLoggedIn === true && userData === null) {
      // Si userData es null y el usuario está autenticado,
      // se redirige a la ruta de administrador
      navigate("/admin");
    } else if (isLoggedIn === true && superAdmin === true) {
      // Si no se detecta ningún rol específico pero el usuario es superAdmin,
      // se redirige a la ruta de administrador
      navigate("/admin");
    }
  };

  return (
    <nav className="bg-blue-900 py-2 lg:py-3 px-8 lg:px-12 shadow-md">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto">
        <div className="w-1/4 lg:w-2/12">
          <img src={logo} alt="logo" className="h-auto" />
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
                d="M3 12h18M3 6h18M3 18h18"
              />
            </svg>
          </button>
        </div>

        <nav className="hidden lg:flex justify-center items-center gap-8 text-white font-medium">
          <Link
            to="/"
            className={`hover:text-gray-300 transition-colors ${
              location.pathname === "/" ? "border-b-2 border-white" : ""
            }`}
          >
            Inicio
          </Link>
          <Link
            to="/blogs"
            className={`hover:text-gray-300 transition-colors ${
              location.pathname === "/blogs" ? "border-b-2 border-white" : ""
            }`}
          >
            Blog
          </Link>
          <Link
            to="/entrenamiento"  
            className={`hover:text-gray-300 transition-colors ${
              location.pathname === "/entrenamiento" ? "border-b-2 border-white" : ""
            }`}
          >
            Entrenamiento
          </Link>
          <Link
            to="/Comunidad"
            className={`hover:text-gray-300 transition-colors ${
              location.pathname === "/Comunidad"
                ? "border-b-2 border-white"
                : ""
            }`}
          >
            Comunidad
          </Link>
          <Link
            to="/Nosotros"
            className={`hover:text-gray-300 transition-colors ${
              location.pathname === "/Nosotros" ? "border-b-2 border-white" : ""
            }`}
          >
            Nosotros
          </Link>
        </nav>

        <div className="hidden lg:flex justify-center items-center gap-8">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={redirect}
              className="py-2 px-4 bg-blue-600 text-white hover:bg-blue-800 hover:text-white transition-colors rounded-md"
            >
              Mi cuenta
            </button>
          ) : (
            <>
              <button
                type="button"
                className="py-2 px-4 bg-blue-600 text-white hover:bg-blue-800 hover:text-white transition-colors"
                onClick={toggleLoginForm}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                className="py-2 px-4 bg-blue-600 text-white hover:bg-blue-800 hover:text-white transition-colors mx-2 rounded-md"
                onClick={toggleRegistrationModal}
              >
                Crear cuenta
              </button>
            </>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="max-w-screen-lg mx-auto mt-4">
          <nav className="flex flex-col text-white font-medium">
            <a
              href="#"
              onClick={() => navigate("/")}
              className={`hover:text-gray-300 transition-colors ${
                location.pathname === "/" ? "border-b-2 border-white" : ""
              }`}
            >
              Inicio
            </a>
            <a
              href="#"
              className={`hover:text-gray-300 transition-colors ${
                location.pathname === "/blogs" ? "border-b-2 border-white" : ""
              }`}
              onClick={() => navigate("/blogs")}
            >
              Blog
            </a>
            <a
              href="#"
              onClick={() => navigate("/Error404")}
              className={`hover:text-gray-300 transition-colors ${
                location.pathname === "/Error404"
                  ? "border-b-2 border-white"
                  : ""
              }`}
            >
              Entrenamiento
            </a>
            <a
              href=""
              onClick={() => navigate("/Comunidad")}
              className={`hover:text-gray-300 transition-colors ${
                location.pathname === "/Comunidad"
                  ? "border-b-2 border-white"
                  : ""
              }`}
            >
              Comunidad
            </a>
            <a
              href="#"
              className={`hover:text-gray-300 transition-colors ${
                location.pathname === "/Nosotros"
                  ? "border-b-2 border-white"
                  : ""
              }`}
              onClick={() => navigate("/Nosotros")}
            >
              Nosotros
            </a>
          </nav>

          <div className="flex flex-col justify-center items-center gap-4 mt-4">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={redirect}
                className="py-2 px-4 bg-blue-600 text-white hover:bg-blue-800 hover:text-white transition-colors rounded-md"
              >
                Mi cuenta
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="py-2 px-4 bg-blue-600 text-white hover:bg-blue-800 hover:text-white transition-colors rounded-md"
                  onClick={toggleLoginForm}
                >
                  Iniciar Sesión
                </button>
                <button
                  type="button"
                  className="py-2 px-4 bg-blue-600 text-white hover:bg-blue-800 hover:text-white transition-colors rounded-md"
                  onClick={toggleRegistrationModal}
                >
                  Crear cuenta
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {isLoginFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="rounded-lg p-8 w-full max-w-md">
            <LoginForm onClose={toggleLoginForm} />
          </div>
        </div>
      )}
    </nav>
  );
}