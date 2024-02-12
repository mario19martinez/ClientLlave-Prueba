import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Importa Link desde react-router-dom
import axios from "axios";

function Detailentrenamiento() {
  const [infoDetalle, setInfoDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchInfoDetalle = async () => {
      try {
        const response = await axios.get(`/informacion/${id}`);
        setInfoDetalle(response.data);
      } catch (error) {
        console.error(
          "Hubo un error al obtener el detalle de la información:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInfoDetalle();
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-200 rounded-lg shadow-md">
      <Link to="/" className="block mb-4 text-blue-700 hover:underline font-bold">Atrás</Link>
      {loading ? (
        <p className="text-center">Cargando detalle de la información...</p>
      ) : infoDetalle ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">{infoDetalle.titulo}</h2>
          <p className="text-gray-800">{infoDetalle.content}</p>
        </div>
      ) : (
        <p className="text-center">
          No se encontró el detalle de la información.
        </p>
      )}
    </div>
  );
}

export default Detailentrenamiento;
