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
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.users.userData);

  const storedEmail = localStorage.getItem("email");
  const superAdmin = localStorage.getItem("SuperAdmin");

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "isLoggedIn") {
        setIsLoggedIn(e.newValue === "true");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  useEffect(() => {
    if (isLoggedIn && userData?.tokenExpiration) {
      const tokenExpirationDate = new Date(userData.tokenExpiration);
      if (new Date() > tokenExpirationDate) setIsSessionExpired(true);
    }
  }, [isLoggedIn, userData]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleLoginForm = () => setIsLoginFormOpen(!isLoginFormOpen);
  const openRegistrationModal = () => navigate("/RegistroUser");

  const handleSessionExpiration = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsSessionExpired(false);
    navigate("/");
    window.location.reload();
  };

  const redirect = () => {
    const rol = userData?.rol;
    if (rol === "client") return navigate("/estudiante/Escritorio");
    if (rol === "admin" || superAdmin || rol === "editor") return navigate("/admin");
    navigate("/");
  };

  const renderNavLink = (path, label) => (
    <Link
      to={path}
      className={`hover:text-gray-300 transition-all duration-300 ${
        location.pathname === path ? "border-b-2 border-white" : ""
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-blue-900 shadow-md relative">
      <style>
        {`
          .fade-in {
            animation: fadeIn 0.3s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div className="max-w-screen-xl mx-auto px-4 py-3 lg:py-4 flex justify-between items-center">
        {/* Botón menú móvil */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-gray-300 transition-colors focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center lg:justify-start w-full lg:w-2/12">
          <img src={logo} alt="logo" className="h-10 sm:h-12" />
        </div>

        {/* Botones responsive */}
        <div className="lg:hidden flex justify-end w-1/3">
          {isLoggedIn ? (
            <button
              onClick={redirect}
              className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-800 transition-all"
            >
              Mi cuenta
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={toggleLoginForm}
                className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-800 transition-all"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={openRegistrationModal}
                className="bg-blue-600 text-white text-xs px-3 py-1 rounded-md hover:bg-blue-800 transition-all"
              >
                Crear cuenta
              </button>
            </div>
          )}
        </div>

        {/* Menú desktop */}
        <div className="hidden lg:flex gap-8 text-white font-medium">
          {renderNavLink("/", "Inicio")}
          {renderNavLink("/Blogs", "Blog")}
          {renderNavLink("/Planes", "Planes")}
          {renderNavLink("/Comunidad", "Comunidad")}
          {renderNavLink("/Nosotros", "Nosotros")}
        </div>

        {/* Botones desktop */}
        <div className="hidden lg:flex gap-4">
          {isLoggedIn ? (
            <button
              onClick={redirect}
              className="bg-white flex items-center text-black font-semibold px-4 py-2 rounded-md shadow-md hover:text-blue-600 border hover:border-blue-600 transition-all"
            >
              {userData?.image && (
                <img src={userData.image} alt="user" className="w-6 h-6 rounded-full mr-2" />
              )}
              Mi cuenta
            </button>
          ) : (
            <>
              <button
                onClick={toggleLoginForm}
                className="bg-white text-black font-semibold px-4 py-2 rounded-md shadow-md hover:text-blue-600 border hover:border-blue-600 transition-all"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={openRegistrationModal}
                className="bg-white text-black font-semibold px-4 py-2 rounded-md shadow-md hover:text-blue-600 border hover:border-blue-600 transition-all"
              >
                Crear cuenta
              </button>
            </>
          )}
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-blue-900 text-white px-8 pb-4 fade-in">
          <div className="flex flex-col space-y-2 font-medium">
            {renderNavLink("/", "Inicio")}
            {renderNavLink("/Blogs", "Blog")}
            {renderNavLink("/Planes", "Planes")}
            {renderNavLink("/Comunidad", "Comunidad")}
            {renderNavLink("/Nosotros", "Nosotros")}
          </div>
        </div>
      )}

      {/* Modal de login */}
      {isLoginFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <LoginForm onClose={toggleLoginForm} />
          </div>
        </div>
      )}

      {/* Modal de sesión expirada */}
      {isSessionExpired && (
        <ReactModal
          isOpen={isSessionExpired}
          onRequestClose={handleSessionExpiration}
          className="bg-white rounded-lg p-4 max-w-lg mx-auto mt-20 text-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4">Sesión Expirada</h2>
          <p>Tu sesión ha expirado. Por favor, inicia sesión nuevamente.</p>
          <button
            onClick={handleSessionExpiration}
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition"
          >
            Aceptar
          </button>
        </ReactModal>
      )}
    </nav>
  );
}