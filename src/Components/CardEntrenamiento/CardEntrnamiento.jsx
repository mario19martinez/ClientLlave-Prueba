import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CardEntrenamiento = () => {
  const [informacion, setInformacion] = useState(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      try {
        const response = await axios.get("/informacion");
        setInformacion(response.data);
        console.log("Información obtenida:", response.data);
      } catch (error) {
        console.error("Error al obtener la información:", error);
      }
    };

    obtenerInformacion();
  }, []);

  return (
    <>
      {informacion ? (
        informacion.map((info) => (
          <Link to={`/informacion/${info.id}`} key={info.id}>
            <div className="w-64 h-60 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-400 shadow-md rounded-md overflow-hidden border-solid border-2 border-gray-500">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-white">
                  {info.titulo}
                </div>
                <p className="text-white text-base">{info.content}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-gray-700 text-base">No hay información disponible.</p>
      )}
    </>
  );
};

export default CardEntrenamiento;

