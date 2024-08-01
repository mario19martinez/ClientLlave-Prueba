import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";

export default function CompraRespuesta() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("Cargando...");

  useEffect(() => {
    const fetchUserAndPurchases = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        const userResponse = await axios.get(`/users?email=${storedEmail}`);
        const user = userResponse.data;

        if (!user || !user.sub) {
          setMessage("No se ha detectado que ha hecho una compra.");
          return;
        }

        const purchasesResponse = await axios.get("/purchases");
        const purchases = purchasesResponse.data;

        const userPurchases = purchases.filter(
          (purchase) => purchase.userSub === user.sub
        );

        if (userPurchases.length > 0) {
          const latestPurchase = userPurchases.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )[0];
          setStatus(latestPurchase.status);
        } else {
          setMessage("No se ha detectado que ha hecho una compra.");
        }
      } catch (error) {
        console.error("Error fetching purchases or user:", error);
        setMessage("Error al cargar la información de compras.");
      }
    };

    fetchUserAndPurchases();
  }, []);

  const handleContinuar = () => {
    navigate("/estudiante/cursosInscritos");
  };

  const handleHablaConAsesor = () => {
    window.open(
      "https://api.whatsapp.com/send?phone=573126096603&text=Hola%2C%20Quiero%20mas%20informaci%C3%B3n%20sobre%20Llave%20Para%20Las%20Naciones.",
      "_blank"
    );
  };

  if (status === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-500">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center transform transition-transform duration-300 scale-95 hover:scale-100">
        {status === "completed" ? (
          <>
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ¡Compra Exitosa!
            </h2>
            <p className="text-gray-600 mb-4">
              Tu compra se ha completado exitosamente. Gracias por tu compra.
            </p>
            <p className="text-gray-600 mb-6">
              Serás redirigido a tu dashboard o perfil de usuario.
            </p>
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handleContinuar}
                className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-600 transition duration-300 text-lg"
              >
                Continuar
              </button>
              <button
                onClick={handleHablaConAsesor}
                className="bg-green-500 text-white py-2 px-4 rounded-lg shadow flex items-center space-x-2 hover:bg-green-600 transition duration-300"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>Habla con un asesor</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Compra Rechazada
            </h2>
            <p className="text-gray-600 mb-4">
              Tu compra no pudo ser completada. Por favor, intenta nuevamente.
            </p>
            <p className="text-gray-600 mb-6">
              Si el problema persiste, contacta a nuestro soporte.
            </p>
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={handleHablaConAsesor}
                className="bg-green-500 text-white py-2 px-4 rounded-lg shadow flex items-center space-x-2 hover:bg-green-600 transition duration-300"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>Habla con un asesor</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}