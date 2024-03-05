import { useState, useEffect } from "react";
import axios from "axios";
import NivelesCard from "./NivelesCard";

function Niveles() {
  const [niveles, setNiveles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage] = useState(1);
  const cursosPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/niveles", {
          params: {
            page: currentPage,
            perPage: cursosPerPage,
          },
        });
        setNiveles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Hubo un error al obtener los niveles");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="text-center mt-8">
            <h1 className="text-xl font-semibold">Cargando ...</h1>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          niveles.map((nivel) => (
            <NivelesCard
              key={nivel.id}
              name={nivel.name}
              image={nivel.image}
              id={nivel.id}
              costo={nivel.costo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Niveles;
