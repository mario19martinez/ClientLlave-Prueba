import { useState, useEffect } from "react";
import axios from "axios";

const CardEntrenamiento = () => {
  const [informacion, setInformacion] = useState(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      try {
        const response = await axios.get("/informacion");
        setInformacion(response.data[0]); // Acceder al primer elemento del array
        console.log("Información obtenida:", response.data[0]);
      } catch (error) {
        console.error("Error al obtener la información:", error);
      }
    };

    obtenerInformacion();
  }, []);

  return (
    <div className=" ">
      <div className="w-64 h-60 bg-white shadow-md rounded-md overflow-hidden border-solid border-2 border-blue-500">
        <div className="px-6 py-4">
          {informacion ? (
            <>
              <div className="font-bold text-xl mb-2 text-gray-700">
                {informacion.titulo}
              </div>
              <p className="text-gray-700 text-base">{informacion.content}</p>
            </>
          ) : (
            <p className="text-gray-700 text-base">No hay información disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardEntrenamiento;

