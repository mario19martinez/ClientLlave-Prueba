import { useState, useEffect } from "react";
import axios from "axios";

function ModulosDelGrupo({ grupoId }) {
  const [modulos, setModulos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get(`/grupo/${grupoId}/modulos`);
        setModulos(response.data.modulos);
      } catch (error) {
        setError("Error al obtener los modulos del grupo");
        console.error("Error al obtener los modulos de este grupo:", error);
      }
    };

    fetchModulos();
  }, [grupoId]);

  return (
    <div className="bg-blue-600 shadow-md rounded-md p-6 translate-x-10 translate-y-20 w-40">
      <h2 className="text-xl font-bold text-white mb-4">Modulos</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <ul>
        {modulos.map((modulo) => (
          <li key={modulo.id} className="border-b border-gray-200 py-4">
            <p className="text-lg font-semibold mb-2 text-white">{modulo.titulo}</p>
            <p className="text-white mb-1">{modulo.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModulosDelGrupo;
