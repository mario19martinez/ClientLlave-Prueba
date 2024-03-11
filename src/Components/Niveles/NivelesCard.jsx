// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function NivelesCard({ id, image, name, costo }) {
  const navigate = useNavigate();

  const redirect = () => {
    navigate(`/niveldetail/${id}`);
    window.location.reload();
  };
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
