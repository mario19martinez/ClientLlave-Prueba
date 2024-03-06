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
    <div className="">
      <h1 className="text-3xl font-semibold mb-4">Modulos</h1>
      <div className="grid grid-cols-3 gap-8">
        {modulos.map((modulo,) => (
          <div
            key={modulo.id}
            className={`bg-white hover:bg-gray-300 shadow-lg shadow-blue-800/50 p-4 rounded-lg border-t-4 border-blue-500 hover:border-gray-200 transition-transform transform hover:-translate-y-1 last:mr-0`}
          >
            <Link to={`/home/nivel/${nivelId}/modulo/${modulo.id}`}>
              <h2 className="text-lg font-semibold">{modulo.titulo}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModulosNivel;
