import { useState, useEffect } from "react";
import logo from "../../assets/logo2.png";
import LoginForm from "../InicioSesion/InicioSesion.jsx";
import { getUserData } from "../../Redux/features/Users/usersSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactModal from "react-modal";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
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

  useEffect(() => {
    if (isLoggedIn && userData?.tokenExpiration) {
      const tokenExpirationDate = new Date(userData.tokenExpiration);
      const currentDate = new Date();

      if (currentDate > tokenExpirationDate) {
        setIsSessionExpired(true);
      }
    }
  }, [isLoggedIn, userData]);

  const handleSessionExpiration = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsSessionExpired(false);
    navigate("/");
    window.location.reload();
  };

  const redirect = () => {
    if (
      (isLoggedIn && userData?.rol === "client") ||
      userData?.rol === "client"
    ) {
      navigate("/estudiante/Escritorio");
    } else if (
      (isLoggedIn && userData?.rol === "admin") ||
      userData?.rol === "admin"
    ) {
      navigate("/admin");
    } else if (isLoggedIn && !userData) {
      navigate("/admin");
    } else if (isLoggedIn && superAdmin) {
      navigate("/admin");
    } else if (
      (isLoggedIn && userData?.rol === "editor") ||
      userData?.rol === "admin"
    ) {
      navigate("/Editor");
    }
  };

  const renderNavLink = (path, label) => (
    <Link
      to={path}
      className={`hover:text-gray-300 transition-colors ${
        location.pathname === path ? "border-b-2 border-white" : ""
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-blue-900 py-2 lg:py-3 px-8 lg:px-12 shadow-md">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto">
        <div className="flex lg:hidden">
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

        <div className="flex justify-center w-full lg:w-2/12">
          <img
            src={logo}
            alt="logo"
            className="h-10 sm:h-12 lg:h-auto mx-auto"
          />
        </div>

        <div className="w-1/4 lg:hidden flex justify-end">
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={redirect}
                className="py-1 items-center px-2 text-xs bg-blue-600 text-white hover:bg-blue-800 transition-colors rounded-md"
              >
                Mi cuenta
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="py-1 px-2 text-xs bg-blue-600 text-white hover:bg-blue-800 transition-colors rounded-md"
                  onClick={toggleLoginForm}
                >
                  Iniciar Sesión
                </button>
                <button
                  type="button"
                  className="py-1 px-2 text-xs bg-blue-600 text-white hover:bg-blue-800 transition-colors rounded-md"
                  onClick={openRegistrationModal}
                >
                  Crear cuenta
                </button>
              </>
            )}
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center gap-8 text-white font-medium">
          {renderNavLink("/", "Inicio")}
          {renderNavLink("/Blogs", "Blog")}
          {renderNavLink("/Planes", "Planes")}
          {renderNavLink("/Comunidad", "Comunidad")}
          {renderNavLink("/Nosotros", "Nosotros")}
        </div>

        <div className="hidden lg:flex justify-center items-center gap-8">
          {isLoggedIn ? (
            <button
              type="button"
              onClick={redirect}
              className="py-2 px-4 flex space-x-2 bg-white text-black font-bold hover:text-blue-600 border border-gray-300 hover:border-blue-600 transition-all rounded-md shadow-md"
            >
              {userData?.image && (
                <img
                  src={userData.image}
                  alt="user"
                  className="w-6 h-6 rounded-full mr-2"
                />
              )}
              Mi cuenta
            </button>
          ) : (
            <>
              <button
                type="button"
                className="py-2 px-4 bg-white text-black font-bold hover:text-blue-600 border border-gray-300 hover:border-blue-600 transition-all rounded-md shadow-md"
                onClick={toggleLoginForm}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                className="py-2 px-4 bg-white text-black font-bold hover:text-blue-600 border border-gray-300 hover:border-blue-600 transition-all rounded-md shadow-md"
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
            {renderNavLink("/Planes", "Planes")}
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

      {isSessionExpired && (
        <ReactModal
          isOpen={isSessionExpired}
          onRequestClose={handleSessionExpiration}
          contentLabel="Session Expired"
          className="bg-white rounded-lg p-4 max-w-lg mx-auto mt-20 text-center" // Centrado de contenido
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Sesión Expirada
          </h2>
          <p>Tu sesión ha expirado. Por favor, inicia sesión nuevamente.</p>
          <button
            onClick={handleSessionExpiration}
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md"
          >
            Aceptar
          </button>
        </ReactModal>
      )}
    </nav>
  );
}
