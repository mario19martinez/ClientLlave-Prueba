import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function GrupoDetailUser() {
  const [grupo, setGrupo] = useState(null);
  const [modulos, setModulos] = useState([]);

  const { nivelId, grupoId } = useParams();

  useEffect(() => {
    const fetchGrupoDetail = async () => {
      try {
        const response = await axios.get(`/nivel/${nivelId}/grupo/${grupoId}/detalles`);
        setGrupo(response.data.grupo);

        const sortedModulos = response.data.modulos.sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion));
        setModulos(sortedModulos);
      } catch (error) {
        console.error("Error al obtener los detalles del grupo y los módulos:", error);
      }
    };

    fetchGrupoDetail();
  }, [grupoId, nivelId]);

  if (!grupo) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="px-4 lg:px-20 py-8">
      <h2 className="text-3xl lg:text-4xl text-gray-800 font-bold mb-4">{grupo.name}</h2>
      <p className="text-lg text-gray-700 mb-6">{grupo.descripcion}</p>
      <h3 className="text-xl lg:text-2xl text-gray-800 font-semibold mb-4">Módulos:</h3>
      <div className="grid gap-6 lg:grid-cols-2">
        {modulos.map((modulo) => (
          <div key={modulo.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100">
              <h4 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">
                {modulo.titulo.replace(/^\d{2}\s*/, "")} {/* Elimina los dos primeros caracteres si son números */}
              </h4>
              <p className="text-gray-700">
                {modulo.contenido && modulo.contenido.length > 100
                  ? `${modulo.contenido.substring(0, 100)}...`
                  : modulo.contenido}
              </p>
            </div>
            <div className="flex justify-end p-4 bg-gray-200">
              <Link
                to={`/nivel/${nivelId}/grupo/${grupoId}/modulo/${modulo.id}/detalles`}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-300 ease-in-out"
              >
                Ver Módulo
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GrupoDetailUser;