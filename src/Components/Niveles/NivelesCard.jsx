// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
//import { useEffect, useRef } from "react";

function NivelesCard({ id, image, name, costo }) {
  const navigate = useNavigate();
  //const epaycoButtonRef = useRef(null); // Esto comentado se usa para el boton de epayco

  const redirect = () => {
    navigate(`/niveldetail/${id}`);
    window.location.reload();
  };

  // useEffect(() => { // Esto comentado se usa para el boton de epayco
  //   if (epaycoButtonRef.current) {
  //     // Limpiar el contenido antes de agregar el script
  //     epaycoButtonRef.current.innerHTML = "";
      
  //     const script = document.createElement("script");
  //     script.src = "https://checkout.epayco.co/checkout.js";
  //     script.setAttribute("data-epayco-key", "71e21621508a9e6b107778f67e08860e");
  //     script.className = "epayco-button";
  //     script.setAttribute("data-epayco-amount", costo.toString());
  //     script.setAttribute("data-epayco-tax", "0.00");
  //     script.setAttribute("data-epayco-tax-ico", "0.00");
  //     script.setAttribute("data-epayco-tax-base", costo.toString());
  //     script.setAttribute("data-epayco-name", name);
  //     script.setAttribute("data-epayco-description", name);
  //     script.setAttribute("data-epayco-currency", "cop");
  //     script.setAttribute("data-epayco-country", "CO");
  //     script.setAttribute("data-epayco-test", "true");
  //     script.setAttribute("data-epayco-external", "false");
  //     // Opcional: Puedes agregar las URLs de respuesta y confirmación si las tienes
  //     script.setAttribute("data-epayco-response", "http://localhost:3001/epayco/response");
  //     script.setAttribute("data-epayco-confirmation", "http://localhost:3001/epayco/confirmation");
  //     script.setAttribute("data-epayco-button", "https://multimedia.epayco.co/dashboard/btns/btn6.png");
      
  //     epaycoButtonRef.current.appendChild(script);
  //   }
  // }, [costo, name]);

  return (
    <div className="max-w-xs bg-white shadow-lg rounded-md overflow-hidden mx-auto border-2 border-blue-400">
      <div onClick={redirect}>
        <img src={image} alt={name} className="object-cover w-full h-64" />
        <div className="px-6 py-4">
          <h1 className="font-bold text-xl mb-2 text-gray-800">{name}</h1>
          <div className="flex justify-between items-center">
            <div className="text-gray-700 text-lg font-semibold">${costo}</div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-4">
        <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-400 text-white font-semibold rounded-lg focus:outline-none focus:shadow-outline-blue">
          <WhatsAppIcon className="mr-2" />
          Comprar Nivel
        </button>
         {/* Esto comentado se usa para el boton de epayco */}
        {/* <div ref={epaycoButtonRef} className="w-full flex items-center justify-center mt-4"></div> */} 
      </div>
    </div>
  );
}

NivelesCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  costo: PropTypes.number.isRequired,
};

export default NivelesCard;
