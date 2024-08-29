// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CardEntrenamiento = () => {
  const [informacion, setInformacion] = useState(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      try {
        const response = await axios.get("/informacion");
        setInformacion(response.data);
      } catch (error) {
        console.error("Error al obtener la información:", error);
      }
    };

    obtenerInformacion();
  }, []);

  const recortarTexto = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <div className="w-full">
      {informacion ? (
        informacion.map((info) => (
          <Link to={`/informacion/${info.id}`} key={info.id} className="block mb-4">
            <div className="max-w-md rounded overflow-hidden shadow-lg border border-gray-300 bg-gray-200">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-800">
                  {info.titulo}
                </div>
                <p className="text-gray-700 text-base">
                  {recortarTexto(info.content, 380)} 
                </p>
                <div className="text-right mt-2 pt-3">
                  <Link
                    to={`/informacion/${info.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Leer más
                  </Link>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-gray-700 text-base">No hay información disponible.</p>
      )}
    </div>
  );
};

export default CardEntrenamiento;