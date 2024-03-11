// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import NivelesCard from "./NivelesCard";

function Niveles() {
  const [niveles, setNiveles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cursosPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/niveles", {
          params: {
            perPage: cursosPerPage,
          },
        });
        setNiveles(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError(
          "Hubo un error al obtener los niveles. Por favor, inténtalo de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Cargando ...
            </h1>
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-800">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {niveles.map((nivel) => (
              <NivelesCard
                key={nivel.id}
                name={nivel.name}
                image={nivel.image}
                id={nivel.id}
                costo={nivel.costo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Niveles;