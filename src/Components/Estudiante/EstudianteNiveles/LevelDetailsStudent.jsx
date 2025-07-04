// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ModulosNivelStudent from "./ModulosNivelStudent";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// NO SE ESTA USANDO ESTE COMPONENTE

function LevelDetailsStudent() {
  const [nivel, setNivel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchNivel = async () => {
      try {
        if (!id) {
          setLoading(false);
          return;
        }
        const response = await axios.get(`/nivel/${id}`);
        setNivel(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos del nivel:", error);
        setLoading(false);
      }
    };
    fetchNivel();
  }, [id]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!nivel) {
    return <NotFoundScreen />;
  }

  return (
    <div className="container mx-auto">
      <div className="px-5 py-5 lg:px-0">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8">{nivel.name}</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-16">
          <div className="w-full md:w-1/2">
            <img
              src={nivel.image}
              alt="Imagen del nivel"
              className="mx-auto mb-8 rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-lg font-semibold">Descripción:</p>
            {showFullDescription ? (
              <p className="text-lg mb-2">{nivel.description}</p>
            ) : (
              <p className="text-lg mb-2">
                {nivel.description.slice(0, 150)}
                {nivel.description.length > 150 && (
                  <span>
                    ...{" "}
                    <button
                      className="text-blue-500"
                      onClick={toggleDescription}
                    >
                      Ver más
                    </button>
                  </span>
                )}
              </p>
            )}
            <div className="pb-4">
              <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-400 text-white font-semibold rounded-lg focus:outline-none focus:shadow-outline-blue">
                <WhatsAppIcon className="mr-2" />
                Contacto Administración
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModulosNivelStudent nivelId={nivel.id} />
    </div>
  );
}

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl font-semibold">Cargando...</p>
    </div>
  );
};

const NotFoundScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl font-semibold">No se encontró el nivel.</p>
    </div>
  );
};

export default LevelDetailsStudent;