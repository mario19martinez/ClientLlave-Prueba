import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import ClaseModuloCreate from "./ClasesModuloCreate";

function ClaseModuloAdmin({ moduloId }) {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

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

  const handleDelete = async (claseId) => {
    // Mostrar una alerta de confirmación
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta clase? Esta acción no se puede deshacer."
    );

    if (confirmDelete) {
      try {
        await axios.delete(`/modulo/${moduloId}/clase/${claseId}`);
        // Actualiza el estado de las clases después de eliminar
        setClases((prevClases) =>
          prevClases.filter((clase) => clase.id !== claseId)
        );
      } catch (error) {
        console.error("Error al eliminar la clase:", error);
      }
    }
  };

  const navigateToClaseDetail = (claseId) => {
    navigate(`/admin/modulo/${moduloId}/clase/${claseId}`);
  };

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
            <button
              className="absolute top-2 right-2 text-gray-200"
              onClick={toggleModal}
            >
              <CancelIcon fontSize="large" />
            </button>
            <ClaseModuloCreate moduloId={moduloId} />
          </div>
        </div>
      )}
      {clases.length > 0 ? (
        <ul className="divide-y divide-gray-400">
          {clases.map((clase) => (
            //<Link to={`/admin/modulo/${moduloId}/clase/${clase.id}`} key={clase.id}>
            <li
              key={clase.id}
              className=" flex items-center justify-between ml-0 font-hammersmithOne text-lg border-b-4 border-gray-500 bg-gray-300 rounded-full h-auto py-4 flex-grow"
            >
              <h1
                className="w-96"
                onClick={() => navigateToClaseDetail(clase.id)}
              >
                {clase.name}
              </h1>
              <button
                onClick={() => handleDelete(clase.id)}
                className="ml-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              >
                Eliminar
              </button>
              {/* Botón Delete */}
            </li>
            // </Link>
          ))}
        </ul>
      ) : (
        <p className="text-center">No hay clases disponibles en este módulo.</p>
      )}
    </div>
  );
}

export default ClaseModuloAdmin;
