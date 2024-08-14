import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/FondoInicio.png";
import ImgPortada from "../../assets/ImgInicio.png";

export default function LandingPage() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div
      className="flex flex-col justify-center items-center bg-cover bg-center min-h-screen text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full text-center items-center justify-center px-10">
        <div className="pt-10 pb-36 space-x-10 flex flex-col lg:flex-row items-center lg:items-center">
          <div className="flex-1 mb-8 lg:mb-0">
            <img
              src={ImgPortada}
              alt="Portada"
              className="mx-auto lg:mx-0 w-full lg:w-full"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center lg:text-left">
            <div className="mb-8 justify-center text-center items-center space-y-5">
              <p className="text-3xl font-semibold">
                ESCUELA DE ENTRENAMIENTO PROFÉTICO
              </p>
              <h1 className="text-3xl lg:text-6xl font-bold mt-2">
                DESCUBRE EL PODER DE LA PROFECÍA
              </h1>
            </div>
            <div className="flex space-x-4 items-center justify-center text-center">
              {isLoggedIn ? (
                <button
                  onClick={() => navigate("/cuenta")}
                  className="bg-white text-black font-bold py-2 px-6 rounded hover:bg-gray-200 transition duration-300"
                >
                  Ir a la cuenta
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-white text-black font-bold py-2 px-6 rounded hover:bg-gray-200 transition duration-300"
                  >
                    Iniciar sesión
                  </button>
                  <button
                    onClick={() => navigate("/RegistroUser")}
                    className="bg-white text-black font-bold py-2 px-6 rounded hover:bg-gray-200 transition duration-300"
                  >
                    Regístrate
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}