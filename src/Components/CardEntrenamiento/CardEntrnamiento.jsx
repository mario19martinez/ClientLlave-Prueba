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

  const recortarTexto = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <>
      {informacion ? (
        informacion.map((info) => (
          <Link to={`/informacion/${info.id}`} key={info.id}>
            <div className="max-w-xs rounded overflow-hidden shadow-lg border border-gray-300 m-4 bg-gray-200">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-800">
                  {info.titulo}
                </div>
                <p className="text-gray-700 text-base">
                  {recortarTexto(info.content, 100)}
                </p>
                <div className="text-right mt-2">
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
    </>
  );
};

export default CardEntrenamiento;