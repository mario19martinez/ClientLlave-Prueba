import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ClaseModuloAdmin() {
  const { moduloId } = useParams();
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta clase? Esta acción no se puede deshacer."
    );

    if (confirmDelete) {
      try {
        await axios.delete(`/modulo/${moduloId}/clase/${claseId}`);
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
    <div>
      <button
        onClick={() => navigate(`/admin/modulo/${moduloId}/clase/create`)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Agregar Clase
      </button>
      {clases.length > 0 ? (
        <ul>
          {clases.map((clase, index) => (
            <li
              key={clase.id}
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} p-4 flex justify-between items-center transition duration-300 ease-in-out transform hover:scale-105`}
            >
              <h1
                onClick={() => navigateToClaseDetail(clase.id)}
                className="cursor-pointer"
              >
                {clase.name}
              </h1>
              <button
                onClick={() => handleDelete(clase.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay clases disponibles en este módulo.</p>
      )}
    </div>
  );
}

export default ClaseModuloAdmin;