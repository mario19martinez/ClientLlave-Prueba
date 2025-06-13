import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function MiniaturaDiplomatura() {
  const { diplomaturaId } = useParams();
  const navigate = useNavigate();
  const [diplomatura, setDiplomatura] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiplomatura = async () => {
      try {
        const { data } = await axios.get(`/diplomatura/${diplomaturaId}`);
        setDiplomatura(data);
      } catch (error) {
        console.error("Error al obtener diplomatura:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiplomatura();
  }, [diplomaturaId]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-28 w-full bg-black/60 backdrop-blur-md">
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (!diplomatura) {
    return (
      <Box className="text-center mt-6">
        <Typography variant="h6" color="error">
          Diplomatura no encontrada
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box className="w-full bg-black/60 backdrop-blur-md shadow-md">
      <Box className="max-w-7xl mx-auto flex items-center h-24 px-4 sm:px-6 lg:px-8 text-white">
        {/* Botón volver */}
        <Tooltip title="Volver">
          <IconButton
            onClick={() => navigate(-1)}
            className="mr-4 bg-white/20 hover:bg-white/30"
            size="small"
          >
            <ArrowBackIcon className="text-white" />
          </IconButton>
        </Tooltip>

        {/* Imagen */}
        <Box className="w-24 h-16 relative mr-4 flex-shrink-0">
          <img
            src={diplomatura.image || "https://via.placeholder.com/300x200?text=Sin+imagen"}
            alt={diplomatura.name}
            className="object-cover h-full w-full rounded-md"
          />
          <Box className="absolute top-1 left-1 bg-yellow-400 text-black text-[10px] font-bold px-1 py-0.5 rounded">
            TOP VENTAS
          </Box>
        </Box>

        {/* Título */}
        <Box className="flex-1">
          <Typography variant="subtitle1" fontWeight="bold" className="line-clamp-2">
            {diplomatura.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}