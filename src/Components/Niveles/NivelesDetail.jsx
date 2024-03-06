import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ModulosNivel from "../ModulosNivel/ModulosNivel";

function NivelesDetail() {
  const [nivel, setNivel] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  }

  if (!nivel) {
    return (
      <div className="flex justify-center items-center h-screen">
        No se encontro el nivel.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-4">{nivel.name}</h2>
      {/* <img
        src={nivel.image}
        alt="image"
        className="mb-4 rounded-lg shadow-lg"
      /> */}
      <p className="text-lg mb-4">{nivel.description}</p>
      <p className="text-lg mb-2">Duracion: {nivel.duracion}</p>
      <p className="text-lg mb-6">Costo: {nivel.costo}</p>
      {/* <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Comprar
        </button>
      </div> */}
      <ModulosNivel nivelId={nivel.id} />
    </div>
  );
}

export default NivelesDetail;
