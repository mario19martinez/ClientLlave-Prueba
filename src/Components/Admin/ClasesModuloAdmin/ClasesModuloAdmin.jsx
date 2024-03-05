import { useState, useEffect } from "react";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';
import ClaseModuloCreate from "./ClasesModuloCreate";

function ClaseModuloAdmin({ moduloId }) {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get(`/modulo/${moduloId}/clases`);
        setClases(response.data);
      } catch (error) {
        console.error("Error al obtener las clases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClases();
  }, [moduloId]);

  if (loading) {
    return <div className="text-center mt-4">Cargando...</div>;
  }

  return (
    <div className="mt-4">
         <button
      onClick={toggleModal}
      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mb-4 hover:bg-blue-600 transition duration-300"
      >
        Agregar Clase
      </button>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-blue-500 p-4 rounded-md shadow-md max-w-lg h-full w-3/4">
            <button className="absolute top-2 right-2 text-gray-200" onClick={toggleModal}>
            <CancelIcon fontSize="large" />
            </button>
            <ClaseModuloCreate moduloId={moduloId} />
          </div>
        </div>
      )}
      {clases.length > 0 ? (
        <ul className="divide-y divide-gray-400">
          {clases.map((clase) => (
            <li key={clase.id} className="py-4 ">
              <h1 className="ml-0 font-hammersmithOne text-lg border-b-4 border-gray-500 bg-gray-300 rounded-full h-auto py-4">{clase.name}</h1>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No hay clases disponibles en este modulo.</p>
      )}
    </div>
  );
}

export default ClaseModuloAdmin;
