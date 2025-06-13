import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Box, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";
import { toast } from "react-toastify";

export default function MaterialMateriaVenta() {
  const { diplomaturaId, materiaId } = useParams();
  const [materia, setMateria] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMateria = async () => {
      try {
        const { data } = await axios.get(`/diplomatura/${diplomaturaId}/materia/${materiaId}`);
        setMateria(data);
      } catch (error) {
        console.error("Error al obtener los detalles de la materia:", error);
        toast.error("No se pudieron cargar los detalles de la materia.");
      } finally {
        setLoading(false);
      }
    };

    if (diplomaturaId && materiaId) {
      fetchMateria();
    }
  }, [diplomaturaId, materiaId]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-64">
        <CircularProgress />
      </Box>
    );
  }

  if (!materia) {
    return (
      <Box className="text-center text-red-500 font-semibold mt-8">
        No se pudo cargar la información de la materia.
      </Box>
    );
  }

  return (
    <Box className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start bg-transparent">
      {/* Imagen + precio + comprar */}
      <Card
        elevation={4}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          position: "sticky",
          top: 20,
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={materia.image || "https://via.placeholder.com/300x200"}
          alt={materia.name}
          sx={{ objectFit: "cover" }}
        />

        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Precio
          </Typography>
          <Typography variant="h5" fontWeight="bold" color="success.main">
            {Number(materia.precio) > 0
              ? `$${Number(materia.precio).toLocaleString()}`
              : "Gratis"}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 3,
              boxShadow: 3,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: 5,
              },
            }}
          >
            Comprar materia
          </Button>
        </CardContent>
      </Card>

      {/* Descripción y detalles */}
      <Box className="md:col-span-2">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {materia.name}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Individual disponible para todos las diplomaturas.
        </Typography>

        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-line", mt: 3 }}
        >
          {materia.description || "Sin descripción disponible."}
        </Typography>
      </Box>
    </Box>
  );
}