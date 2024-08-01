import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function PlanesDetails() {
  const { idPlan } = useParams();
  const navigate = useNavigate(); // Hook para navegar
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const epaycoButtonRef = useRef(null);

  const { VITE_PUBLIC_KEY } = import.meta.env;

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/user-info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error al obtener informacion del usuario:", error);
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(`/plan/${idPlan}`);
        setPlan(response.data);
      } catch (error) {
        console.error("Error al obtener el plan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [idPlan]);

  useEffect(() => {
    if (userInfo && plan) {
      if (epaycoButtonRef.current) {
        epaycoButtonRef.current.innerHTML = ""; // Limpiar el contenido previo

        const script = document.createElement("script");
        script.src = "https://checkout.epayco.co/checkout.js";
        script.setAttribute("data-epayco-key", VITE_PUBLIC_KEY);
        script.setAttribute("class", "epayco-button");
        script.setAttribute("data-epayco-amount", precioConDescuento);
        script.setAttribute("data-epayco-tax", "0.00");
        script.setAttribute("data-epayco-tax-ico", "0.00");
        script.setAttribute("data-epayco-tax-base", precioConDescuento);
        script.setAttribute("data-epayco-name", plan.name || "Botón para pruebas");
        script.setAttribute("data-epayco-description", plan.descripcion || "Botón para pruebas");
        script.setAttribute("data-epayco-currency", "usd");
        script.setAttribute("data-epayco-country", "CO");
        script.setAttribute("data-epayco-test", "false");
        script.setAttribute("data-epayco-external", "false");
        script.setAttribute("data-epayco-response", "https://www.llaveparalasnaciones.com/Compra_Status/");
        script.setAttribute("data-epayco-confirmation", "https://apillave-ebd57605aa78.herokuapp.com/epayco/confirmation");
        script.setAttribute("data-epayco-button", "https://multimedia.epayco.co/dashboard/btns/btn10.png");
        script.setAttribute("data-epayco-customer_id", userInfo.sub || "");
        script.setAttribute("data-epayco-extra1", userInfo.sub || "");

        epaycoButtonRef.current.appendChild(script);
      }
    }
  }, [plan, userInfo]);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">Cargando...</div>
    );
  }

  if (!plan) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        No se encontró el plan.
      </div>
    );
  }

  const precio = parseFloat(plan.Precio);
  const porcentajeDescuento = parseFloat(plan.porcentaje_descuento) || 0;
  const precioConDescuento = plan.descuento
    ? precio * (1 - porcentajeDescuento / 100)
    : precio;

  return (
    <div className="w-full h-full bg-blue-50 py-16">
      <div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center text-blue-700 hover:text-blue-900 focus:outline-none"
        >
          <svg
            className="w-6 h-6 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-lg font-medium">Atrás</span>
        </button>
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <h2 className="text-3xl font-bold leading-tight text-gray-800 sm:text-4xl">
            {plan.name}
          </h2>
          <p className="text-base text-gray-600 md:text-lg mt-4">
            {plan.descripcion ||
              "No hay descripción disponible para este plan."}
          </p>
        </div>
        <div className="max-w-screen-lg mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 lg:p-8">
            <div className="relative mb-6">
              <div className="flex items-center justify-center mb-4">
                <p className="text-3xl lg:text-5xl font-bold text-teal-600">
                  {plan.descuento ? (
                    <>
                      ${precioConDescuento.toFixed(2)}
                      <span className="text-xl text-teal-400"> USD</span>
                      <span className="block text-lg text-gray-500 line-through">
                        {" "}
                        ${precio.toFixed(2)} USD
                      </span>
                    </>
                  ) : (
                    <>
                      ${precio.toFixed(2)}
                      <span className="text-xl text-teal-400"> USD</span>
                    </>
                  )}
                </p>
              </div>
              {plan.descuento && (
                <div className="absolute top-0 right-0 px-4 py-2 text-base font-bold text-white bg-red-500 rounded-lg transform -rotate-12 -translate-y-1/2">
                  ¡OFERTA!
                </div>
              )}
              <ul className="space-y-4 mt-6">
                {plan.esquema &&
                  plan.esquema.split(",").map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="mr-3">
                        <svg
                          className="w-5 h-5 text-teal-500"
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
                      <p className="text-base lg:text-lg font-medium text-gray-700">
                        {feature.trim()}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="flex justify-center mt-8">
              <a
                href="https://api.whatsapp.com/send?phone=573126096603&text=Hola%2C%20Quiero%20mas%20informaci%C3%B3n%20sobre%20Llave%20Para%20Las%20Naciones."
                className="inline-flex items-center justify-center text-center h-10 lg:h-10 px-2 lg:px-2 font-semibold tracking-wide text-white transition duration-200 rounded-lg shadow-lg bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Comprar Ahora
              </a>
              <div ref={epaycoButtonRef} className="mt-0 ml-4 flex justify-center">
                {/* Aquí se renderiza el botón de ePayco */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
