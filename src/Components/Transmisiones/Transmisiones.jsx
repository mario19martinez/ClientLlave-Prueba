import { useState, useEffect } from "react";
import { FiRadio } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom"; 

export default function Transmisiones() {
  const [transmisiones, setTransmisiones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [transmisionesPerPage] = useState(6);

  useEffect(() => {
    async function fetchTransmisiones() {
      try {
        const response = await axios.get("/transmisiones");
        setTransmisiones(response.data);
      } catch (error) {
        console.error("Error fetching transmisiones:", error);
      }
    }
    fetchTransmisiones();
  }, []);

  const extractYouTubeId = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const iconStyle = {
    animation: "blink 2s infinite",
    color: "red",
  };

  // Calcular índices de transmisiones para la página actual
  const indexOfLastTransmision = currentPage * transmisionesPerPage;
  const indexOfFirstTransmision = indexOfLastTransmision - transmisionesPerPage;
  const currentTransmisiones = transmisiones.slice(
    indexOfFirstTransmision,
    indexOfLastTransmision
  );

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col py-2">
      <div className="py-5 px-16 grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentTransmisiones.map((transmision) => (
          <Link
            to={`/transmisionDetails/${transmision.id}`} 
            key={transmision.id}
            className="border bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden w-72"
          >
            <img
              src={`https://img.youtube.com/vi/${extractYouTubeId(
                transmision.urltransmision
              )}/hqdefault.jpg`}
              alt={transmision.titulo}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <p>{transmision.createdAt}</p>
              <h3 className="text-lg font-semibold">{transmision.titulo}</h3>
              <p
                className={`${
                  transmision.estado ? "text-green-500" : "text-red-500"
                } font-semibold`}
              >
                {transmision.estado ? (
                  <span>
                    En vivo{" "}
                    <FiRadio style={iconStyle} className="inline-block ml-2" />
                  </span>
                ) : (
                  "Finalizada"
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {/* Paginación */}
      <div className="mt-5 flex justify-center">
        <ul className="flex">
          {Array.from({
            length: Math.ceil(transmisiones.length / transmisionesPerPage),
          }).map((_, index) => (
            <li key={index} className="mx-2">
              <button
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}