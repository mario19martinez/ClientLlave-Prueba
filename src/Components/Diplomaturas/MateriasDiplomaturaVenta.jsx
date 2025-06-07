import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Fade,
} from "@mui/material";
import axios from "axios";

export default function MateriasDiplomaturaVenta() {
  const { diplomaturaId } = useParams();
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    axios
      .get(`/diplomatura/${diplomaturaId}/materias`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          // Solo materias activas
          const activas = res.data.filter((m) => m.activo !== false); // admite undefined como true
          setMaterias(activas);
        } else {
          console.warn("Respuesta inesperada:", res.data);
        }
      })
      .catch((err) => console.error("Error al cargar materias:", err));
  }, [diplomaturaId]);

  return (
    <Box px={{ xs: 2, md: 8 }} py={6}>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        mb={4}
        color="primary"
      >
        Materias incluidas en esta diplomatura
      </Typography>

      <Grid container spacing={4}>
        {materias.map((materia, i) => (
          <Grid item xs={12} sm={6} md={4} key={materia.id}>
            <Fade in timeout={400 + i * 100}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 4,
                  boxShadow: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={materia.image || "https://via.placeholder.com/300x180"}
                  alt={materia.name}
                  sx={{ objectFit: "cover" }}
                />

                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: "3rem",
                    }}
                  >
                    {materia.name}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="success.main"
                    gutterBottom
                  >
                    {Number(materia.precio) > 0
                      ? `$${Number(materia.precio).toLocaleString()}`
                      : "Gratis"}
                  </Typography>

                  <Box mt="auto">
                    <Button
                      variant="contained"
                      fullWidth
                      color="primary"
                      sx={{
                        fontWeight: "bold",
                        textTransform: "none",
                        borderRadius: 2,
                        transition: "all 0.2s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.02)",
                        },
                      }}
                      onClick={() =>
                        alert(`Ir al detalle de la materia: ${materia.name}`)
                      }
                    >
                      Ver materia
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {materias.length === 0 && (
        <Typography mt={6} textAlign="center" color="text.secondary">
          No hay materias activas registradas para esta diplomatura.
        </Typography>
      )}
    </Box>
  );
}