import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/FondoInicio.png";
import ImgPortada from "../../assets/ImgInicio.png";

export default function LandingPage() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className="relative w-full text-center items-center justify-center px-5 lg:px-10">
        <div className="pt-10 pb-24 space-y-6 lg:space-y-0 lg:space-x-10 flex flex-col lg:flex-row items-center lg:items-center">
          <div className="flex-1 mb-6 lg:mb-0">
            <img
              src={ImgPortada}
              alt="Portada"
              className="mx-auto lg:mx-0 w-full md:w-2/3 lg:w-full"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center lg:text-left">
            <div className="mb-8 justify-center text-center items-center space-y-4">
              <p className="text-xl md:text-2xl font-semibold">
                ESCUELA DE ENTRENAMIENTO PROFÉTICO
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mt-2">
                DESCUBRE EL PODER DE LA PROFECÍA
              </h1>
            </div>
            <div className="flex flex-col space-y-3 w-full items-center justify-center text-center lg:flex-row lg:space-y-0 lg:space-x-4 lg:w-auto">
              {isLoggedIn ? (
                <button
                  onClick={() => navigate("/cuenta")}
                  className="bg-white text-black font-bold py-3 px-8 w-3/4 md:w-1/2 lg:w-auto lg:py-4 lg:px-10 rounded hover:bg-gray-200 transition duration-300 text-sm lg:text-lg"
                >
                  Ir a la cuenta
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-white text-black font-bold py-2 px-6 w-3/4 md:w-1/2 lg:w-auto h-12 lg:h-auto lg:py-4 lg:px-10 rounded hover:bg-gray-200 transition duration-300 text-sm lg:text-lg"
                  >
                    Iniciar sesión
                  </button>
                  <button
                    onClick={() => navigate("/RegistroUser")}
                    className="bg-white text-black font-bold py-2 px-6 w-3/4 md:w-1/2 lg:w-auto h-12 lg:h-auto lg:py-4 lg:px-10 rounded hover:bg-gray-200 transition duration-300 text-sm lg:text-lg"
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