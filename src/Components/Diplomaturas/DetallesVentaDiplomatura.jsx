import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export default function DetallesVentaDiplomatura() {
  const { diplomaturaId } = useParams();
  const navigate = useNavigate();
  const [diplomatura, setDiplomatura] = useState(null);

  useEffect(() => {
    axios.get(`/diplomatura/${diplomaturaId}`)
      .then((res) => setDiplomatura(res.data))
      .catch((err) => console.error("Error al cargar diplomatura:", err));
  }, [diplomaturaId]);

  if (!diplomatura) return <Typography>Loading...</Typography>;

  return (
    <Box px={{ xs: 2, md: 8 }} py={4}>
      {/* Botón de volver */}
      <Box mb={3}>
        <Tooltip title="Volver">
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "50%",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                transform: "scale(1.1)",
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={4}>
        {/* Columna izquierda */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {diplomatura.name}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Diplomado profesional disponible para todos los niveles.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Descripción
          </Typography>

          <Typography variant="body1" sx={{ whiteSpace: "pre-line", color: "text.primary" }}>
            {diplomatura.description || "Esta diplomatura aún no tiene descripción detallada."}
          </Typography>

          <Divider sx={{ my: 3 }} />
        </Grid>

        {/* Columna derecha */}
        <Grid item xs={12} md={4}>
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
              image={diplomatura.image || "https://via.placeholder.com/300x200"}
              alt={diplomatura.name}
              sx={{ objectFit: "cover" }}
            />

            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Precio
              </Typography>

              <Typography variant="h5" fontWeight="bold" color="success.main">
                {Number(diplomatura.precio) > 0
                  ? `$${Number(diplomatura.precio).toLocaleString()}`
                  : "Gratis"}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  mt: 3,
                  fontWeight: "bold",
                  borderRadius: 3,
                  textTransform: "none",
                  boxShadow: 3,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 5,
                  },
                }}
              >
                Comprar ahora
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}