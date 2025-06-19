import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  CircularProgress,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

export default function ClasesYContenido() {
  const { materiaId } = useParams();
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const res = await axios.get(`/materia/${materiaId}/clases`);
        const activas = res.data.filter((clase) => clase.activo);
        const ordenadas = activas.sort((a, b) => a.orden - b.orden);
        setClases(ordenadas);
      } catch (err) {
        console.error("Error al obtener clases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClases();
  }, [materiaId]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-40">
        <CircularProgress />
      </Box>
    );
  }

  if (clases.length === 0) {
    return (
      <Box className="flex flex-col items-center justify-center text-center py-10 text-gray-600">
        <InfoOutlinedIcon sx={{ fontSize: 48 }} className="text-blue-500 mb-3" />
        <Typography variant="h6" fontWeight="bold">
          No hay clases activas en esta materia.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          El contenido aún no ha sido publicado.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      className="mt-10 p-6 rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-md"
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        className="mb-4 text-blue-800 text-xl border-b pb-2 border-blue-200"
      >
        🎓 Contenido de la materia
      </Typography>

      <List className="space-y-2">
        {clases.map((clase, index) => (
          <ListItem
            key={clase.id}
            className="bg-white hover:bg-blue-100 transition-all rounded-lg shadow-sm border-l-4 border-blue-500 p-3"
          >
            <ListItemIcon>
              <PlayCircleFilledWhiteIcon className="text-blue-600 text-3xl" />
            </ListItemIcon>
            <ListItemText
              primary={`${index + 1}. ${clase.titulo}`}
              primaryTypographyProps={{
                className: "text-gray-800 font-semibold",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}