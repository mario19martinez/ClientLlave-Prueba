import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

function GrupoDetailUser() {
  const [grupo, setGrupo] = useState(null);
  const [modulos, setModulos] = useState([]);
  const navigate = useNavigate();

  const { nivelId, grupoId } = useParams();

  useEffect(() => {
    const fetchGrupoDetail = async () => {
      try {
        const response = await axios.get(`/nivel/${nivelId}/grupo/${grupoId}/detalles`);
        setGrupo(response.data.grupo);

        // Ordenar los módulos por createdAt
        const sortedModulos = response.data.modulos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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

  const handleCardClick = (moduloId) => {
    navigate(`/nivel/${nivelId}/grupo/${grupoId}/modulo/${moduloId}/detalles`);
  };

  return (
    <div className="px-5 py-5 w-full bg-gray-50 min-h-screen">
      <h2 className="text-3xl lg:text-4xl text-gray-800 font-bold mb-4">{grupo.name}</h2>
      <p className="text-lg text-gray-700 mb-6">{grupo.descripcion}</p>
      <h3 className="text-xl lg:text-2xl text-gray-800 font-semibold mb-4">Módulos:</h3>
      <div className="grid gap-6 lg:grid-cols-2">
        {modulos.map((modulo) => (
          <motion.div
            key={modulo.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => handleCardClick(modulo.id)}
            className="cursor-pointer"
          >
            <Card className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 ease-in-out h-full">
              <CardContent className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 h-full">
                <Typography variant="h5" component="div" className="font-semibold text-gray-800 mb-4">
                  {modulo.titulo.replace(/^\d{2}\s*/, "")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {modulo.contenido && modulo.contenido.length > 100
                    ? `${modulo.contenido.substring(0, 100)}...`
                    : modulo.contenido}
                </Typography>
                <Typography variant="body2" color="textPrimary" className="mt-4 text-blue-600">
                  Haga clic en el módulo para ver más detalles.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default GrupoDetailUser;