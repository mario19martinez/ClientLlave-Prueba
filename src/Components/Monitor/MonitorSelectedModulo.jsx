import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function MonitorSelectedModulo() {
  const [grupo, setGrupo] = useState(null);
  const [modulos, setModulos] = useState([]);
  const navigate = useNavigate();

  const { nivelId, grupoId, userSub } = useParams();

  useEffect(() => {
    const fetchGrupoDetail = async () => {
      try {
        const response = await axios.get(
          `/nivel/${nivelId}/grupo/${grupoId}/detalles`
        );
        setGrupo(response.data.grupo);

        const sortedModulos = response.data.modulos.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setModulos(sortedModulos);
      } catch (error) {
        console.error(
          "Error al obtener los detalles del grupo y los módulos:",
          error
        );
      }
    };

    fetchGrupoDetail();
  }, [grupoId, nivelId, userSub]);

  if (!grupo) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  }

  const handleCardClick = (moduloId) => {
    navigate(
      `/Monitor/Cursos/GrupoDetais/${nivelId}/${grupoId}/${moduloId}`
    );
  };

  return (
    <div className="px-5 py-5 w-full bg-gray-50 min-h-screen">
      <h2 className="text-3xl lg:text-4xl text-gray-800 font-bold mb-4">
        {grupo.name}
      </h2>
      <p className="text-lg text-gray-700 mb-6">{grupo.descripcion}</p>
      <h3 className="text-xl lg:text-2xl text-gray-800 font-semibold mb-4">
        Módulos Para Seguimiento:
      </h3>
      <div className="grid gap-6 lg:grid-cols-2">
        {modulos.map((modulo) => (
          <motion.div
            key={modulo.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => handleCardClick(modulo.id)}
            className="cursor-pointer"
          >
            <div
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 ease-in-out h-full"
            >
              <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 h-full">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-gray-800 mb-4 text-2xl lg:text-3xl">
                    {modulo.titulo.replace(/^\d{2}\s*/, "")}
                  </h5>
                </div>
                <p className="text-gray-700 mb-4">
                  {modulo.contenido && modulo.contenido.length > 100
                    ? `${modulo.contenido.substring(0, 100)}...`
                    : modulo.contenido}
                </p>
                <p className="py-5 text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Click Para Ver el seguimiento
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}