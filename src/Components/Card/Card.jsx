// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//import axios from "axios";

const Card = ({ id, image, name, costo, nivel, fechaInicio }) => {
  // const [cursos, setCursos] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/cursos");
  //       console.log(response, "Soy el Card")
  //       setCursos(response.data);
  //     } catch (error) {
  //       console.error("Error al obtener cursos:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const notify = () => {
    toast.success("Se agregó correctamente", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div className="max-w-xs bg-white shadow-lg rounded-md overflow-hidden mx-auto border-2 border-blue-400">
      <Link to={`/curso/${id}`}>
        <img src={image} alt={name} className="object-contain w-full h-64" />
        <div className="px-6 py-4">
          <div>
            <h1 className="font-bold text-xl mb-2 text-gray-800">{name}</h1>
          </div>
          <p className="text-gray-700 text-base font-semibold">
            Nivel: {nivel}
          </p>
          {fechaInicio && (
            <p className="text-gray-700 text-base font-semibold">
              Fecha de Inicio: {fechaInicio}
            </p>
          )}
        </div>
      </Link>
      <Stack>
        <div className="flex flex-no-wrap bg-gray-300 p-2 pt-2 pl-2 pr-2">
          <div className="px-6 py-2 flex-1 text-gray-700 text-base font-semibold">
            {costo}
          </div>
          <div className="flex items-center">
            <span
              onClick={notify}
              className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
            >
              Agregar al Carrito
              <AddShoppingCartIcon className="text-white text-2xl" />
            </span>
          </div>
        </div>
      </Stack>
      <ToastContainer />
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  costo: PropTypes.string.isRequired,
  nivel: PropTypes.string,
  fechaInicio: PropTypes.string,
};

export default Card;
