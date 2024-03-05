import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ModulosNivel({ nivelId }) {
  const [modulos, setModulos] = useState([]);

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get(`/niveles/${nivelId}/modulos`);
        setModulos(response.data);
      } catch (error) {
        console.error("Error al obtener los modulos:", error);
      }
    };
    fetchModulos();
  }, [nivelId]);

  return (
    <div className="max-w-4xl mx-auto ">
      <h1 className="text-3xl font-semibold mb-4">Modulos</h1>
      <div className="grid grid-cols-3 gap-8">
        {modulos.map((modulo) => (
          <div key={modulo.id} className="bg-white shadow-2xl p-4 rounded-lg ring ring-blue-500 ring-offset-4">
            <Link to={`/home/nivel/${nivelId}/modulo/${modulo.id}`}>
            <h2 className="text-xl font-semibold">{modulo.titulo}</h2>
            <p className="text-gray-700 overflow-hidden h-20">{modulo.descripcion}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModulosNivel;
