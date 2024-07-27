import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement('#root');

export default function Planes() {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await axios.get("/planes");
        const activePlans = response.data.filter(plan => plan.activo);
        setPlanes(activePlans);
      } catch (error) {
        console.error("Error al obtener los planes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanes();
  }, []);

  const handleMoreInfo = (id) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate(`/Planes/${id}`);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/RegistroUser');
  };

  if (loading) {
    return <div className="text-center py-20">Cargando...</div>;
  }

  if (planes.length === 0) {
    return (
      <div className="text-center py-20">
        No se encontraron planes activos.
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-blue-50">
      <div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-blue-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="2c67e949-4a23-49f7-bf27-ca140852cf21"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#2c67e949-4a23-49f7-bf27-ca140852cf21)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative">Planes</span>
            </span>
          </h2>
          <p className="text-base text-gray-800 md:text-lg">
            Mira los planes que tenemos para ti, escoge el plan que mejor se adapte a tus necesidades.
          </p>
        </div>
        <div className="grid max-w-screen-lg gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
          {planes.map((plan) => {
            const esquemaArray = typeof plan.esquema === 'string' ? plan.esquema.split(',').map(item => item.trim()) : [];
            const precio = parseFloat(plan.Precio);
            const porcentajeDescuento = parseFloat(plan.porcentaje_descuento) || 0;
            const precioConDescuento = plan.descuento ? precio * (1 - (porcentajeDescuento / 100)) : precio;

            return (
              <div
                key={plan.id}
                className="transform transition duration-500 hover:scale-105 relative"
              >
                <div className="p-8 bg-blue-900 rounded-lg shadow-lg">
                  <div className="mb-4 text-center">
                    <p className="text-xl font-medium tracking-wide text-white">
                      {plan.name}
                    </p>
                    <div className="flex items-center justify-center">
                      <p className="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                        {plan.descuento ? (
                          <>
                            {precioConDescuento.toFixed(0)}
                            <span className="text-lg text-blue-500"> USD</span>
                            <span className="block text-sm text-gray-400"> (Antes {precio.toFixed(0)} USD)</span>
                          </>
                        ) : (
                          <>
                            {precio.toFixed(0)}
                            <span className="text-lg text-blue-500"> USD</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  {plan.descuento && (
                    <div className="absolute top-0 right-0 px-4 py-2 text-base font-bold text-white bg-red-600 rounded-lg transform -rotate-12 -translate-y-1/2">
                      ¡OFERTA!
                    </div>
                  )}
                  <ul className="mb-8 space-y-2">
                    {esquemaArray.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="mr-3">
                          <svg
                            className="w-4 h-4 text-teal-400"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeWidth="2"
                          >
                            <polyline
                              fill="none"
                              stroke="currentColor"
                              points="6,12 10,16 18,8"
                            />
                            <circle
                              cx="12"
                              cy="12"
                              fill="none"
                              r="11"
                              stroke="currentColor"
                            />
                          </svg>
                        </div>
                        <p className="font-medium text-blue-300">{feature}</p>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleMoreInfo(plan.id)}
                    className="inline-flex items-center justify-center text-center w-full h-12 px-6 font-medium tracking-wide text-blue-900 transition duration-200 rounded shadow-md bg-teal-400 hover:bg-teal-700 focus:shadow-outline focus:outline-none"
                  >
                    Más Información
                  </button>
                </div>
                <div className="w-11/12 h-2 mx-auto bg-blue-900 rounded-b opacity-75 mt-2" />
                <div className="w-10/12 h-2 mx-auto bg-blue-900 rounded-b opacity-50 mt-1" />
                <div className="w-9/12 h-2 mx-auto bg-blue-900 rounded-b opacity-25 mt-1" />
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto text-center">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition duration-150"
          >
            &times;
          </button>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Iniciar sesión o registrarse</h2>
          <p className="text-gray-600 mb-6">Para ver más información sobre el plan, debe iniciar sesión o registrarse. ¡Es totalmente gratis!</p>
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow flex items-center justify-center space-x-2 hover:bg-blue-600 transition duration-300"
            >
              <FaSignInAlt className="w-5 h-5" />
              <span>Iniciar sesión</span>
            </button>
            <button
              onClick={handleRegister}
              className="bg-green-500 text-white py-2 px-4 rounded-lg shadow flex items-center justify-center space-x-2 hover:bg-green-600 transition duration-300"
            >
              <FaUserPlus className="w-5 h-5" />
              <span>Registrarse</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}