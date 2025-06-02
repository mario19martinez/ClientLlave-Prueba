import { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Pagination,
  Box,
  Stack,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom"; // ✅ NUEVO

export default function AllDiplomaturas() {
  const [diplomaturas, setDiplomaturas] = useState([]);
  const [pagina, setPagina] = useState(1);
  const diplomaturasPorPagina = 9;

  const navigate = useNavigate(); // ✅ NUEVO

  useEffect(() => {
    axios.get("/diplomaturas")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setDiplomaturas(res.data);
        } else {
          console.warn("Formato inesperado:", res.data);
        }
      })
      .catch((err) => console.error("Error al obtener diplomaturas:", err));
  }, []);

  const handlePageChange = (_, value) => setPagina(value);

  const isNueva = (fecha) => {
    if (!fecha) return false;
    const fechaCreacion = dayjs(fecha);
    return dayjs().diff(fechaCreacion, "day") <= 15;
  };

  const cortarDescripcion = (text) => {
    if (!text) return "Sin descripción.";
    const punto = text.indexOf(".");
    if (punto !== -1) return text.slice(0, punto + 1);
    return text.length > 100 ? text.slice(0, 97) + "..." : text;
  };

  const handleVerMas = (diplomatura) => {
    navigate(`/Diplomaturas/${diplomatura.id}`); // ✅ REDIRECCIÓN
  };

  const paginadas = diplomaturas.slice(
    (pagina - 1) * diplomaturasPorPagina,
    pagina * diplomaturasPorPagina
  );

  return (
    <Box px={{ xs: 2, md: 5 }} py={4}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        textAlign={{ xs: "center", md: "left" }}
      >
        Diplomaturas disponibles
      </Typography>

      <Grid container spacing={3}>
        {paginadas.map((diplomatura) => (
          <Grid item xs={12} sm={6} md={4} key={diplomatura.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                boxShadow: 3,
                position: "relative",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                },
              }}
            >
              {isNueva(diplomatura.createdAt) && (
                <Chip
                  label="Nuevo"
                  color="primary"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    fontWeight: "bold",
                    zIndex: 1,
                  }}
                />
              )}

              <CardMedia
                component="img"
                image={diplomatura.image || "https://via.placeholder.com/300x180"}
                alt={diplomatura.name}
                sx={{ height: 180, objectFit: "cover" }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {diplomatura.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {cortarDescripcion(diplomatura.description)}
                </Typography>

                <Typography variant="subtitle1" fontWeight="bold" color="success.main">
                  {Number(diplomatura.precio) > 0
                    ? `$${Number(diplomatura.precio).toLocaleString()}`
                    : "Gratis"}
                </Typography>
              </CardContent>

              <Box px={2} pb={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: "bold",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.03)",
                    },
                  }}
                  onClick={() => handleVerMas(diplomatura)}
                >
                  Ver más información
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {diplomaturas.length > diplomaturasPorPagina && (
        <Stack alignItems="center" mt={4}>
          <Pagination
            count={Math.ceil(diplomaturas.length / diplomaturasPorPagina)}
            page={pagina}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Stack>
      )}
    </Box>
  );
}