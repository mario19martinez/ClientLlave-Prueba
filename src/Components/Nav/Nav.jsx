import { useState, useEffect } from "react";
import logo from "../../assets/logo2.png";
import LoginForm from "../InicioSesion/InicioSesion.jsx";
import { getUserData } from "../../Redux/features/Users/usersSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const location = useLocation();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.users.userData);

  const storedEmail = localStorage.getItem("email");
  const superAdmin = localStorage.getItem("SuperAdmin");

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleLoginForm = () => setIsLoginFormOpen(!isLoginFormOpen);
  const openRegistrationModal = () => navigate("/RegistroUser");

  useEffect(() => {
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

  const redirect = () => {
    if ((isLoggedIn && userData?.rol === "client") || userData?.rol === "client") {
      navigate("/estudiante/Escritorio");
    } else if ((isLoggedIn && userData?.rol === "admin") || userData?.rol === "admin") {
      navigate("/admin");
    } else if (isLoggedIn && !userData) {
      navigate("/admin");
    } else if (isLoggedIn && superAdmin) {
      navigate("/admin");
    } else if ((isLoggedIn && userData?.rol === "editor") || userData?.rol === "admin") {
      navigate("/Editor");
    }
  };

  const renderNavLink = (path, label) => (
    <Link
      to={path}
      className={`hover:text-gray-300 transition-colors ${location.pathname === path ? "border-b-2 border-white" : ""}`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-blue-900 py-2 lg:py-3 px-8 lg:px-12 shadow-md">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto">
        <div className="w-1/4 lg:w-2/12">
          <img src={logo} alt="logo" className="h-auto" />
        </div>

        <div className="w-1/4 lg:hidden flex justify-end">
          <div className="flex space-x-2">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={redirect}
                className="py-2 px-4 w-28 bg-blue-600 text-white hover:bg-blue-800 transition-colors rounded-md"
              >
                Mi cuenta
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="py-2 px-4 bg-blue-600 text-sm text-white hover:bg-blue-800 transition-colors rounded-md"
                  onClick={toggleLoginForm}
                >
                  Iniciar Sesión
                </button>
                <button
                  type="button"
                  className="py-2 px-4 bg-blue-600 text-sm text-white hover:bg-blue-800 transition-colors rounded-md"
                  onClick={openRegistrationModal}
                >
                  Crear cuenta
                </button>
              </>
            )}
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
        </div>

        <div className="hidden lg:flex justify-center items-center gap-8 text-white font-medium">
          {renderNavLink("/", "Inicio")}
          {renderNavLink("/Blogs", "Blog")}
          {renderNavLink("/entrenamiento", "Entrenamiento")}
          {renderNavLink("/Comunidad", "Comunidad")}
          {renderNavLink("/Nosotros", "Nosotros")}
        </div>

        <div className="hidden lg:flex justify-center items-center gap-8">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={redirect}
              className="py-2 px-4 bg-blue-600 text-white hover:bg-blue-800 transition-colors rounded-md"
            >
              Mi cuenta
            </button>
          ) : (
            <>
              <button
                type="button"
                className="py-2 px-4 bg-blue-600 text-white hover:bg-blue-800 transition-colors rounded-md"
                onClick={toggleLoginForm}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                className="py-2 px-4 bg-blue-600 text-white hover:bg-blue-800 transition-colors rounded-md"
                onClick={openRegistrationModal}
              >
                Crear cuenta
              </button>
            </>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="max-w-screen-lg mx-auto mt-4">
          <nav className="flex flex-col text-white font-medium space-y-2">
            {renderNavLink("/", "Inicio")}
            {renderNavLink("/Blogs", "Blog")}
            {renderNavLink("/entrenamiento", "Entrenamiento")}
            {renderNavLink("/Comunidad", "Comunidad")}
            {renderNavLink("/Nosotros", "Nosotros")}
          </nav>
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
