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
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { toast } from "react-toastify";
import PayPalButtonsComponent from "../PaypalButton/PayPalButtonsComponent";

export default function DetallesVentaDiplomatura() {
  const { diplomaturaId } = useParams();
  const navigate = useNavigate();
  const [diplomatura, setDiplomatura] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchDiplomatura = async () => {
      try {
        const { data } = await axios.get(`/diplomatura/${diplomaturaId}`);
        setDiplomatura(data);
      } catch (error) {
        console.error("Error al cargar diplomatura:", error);
        toast.error("No se pudo cargar la información de la diplomatura.");
      } finally {
        setLoading(false);
      }
    };

    if (diplomaturaId) fetchDiplomatura();
  }, [diplomaturaId]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("/user-info", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserInfo(response.data);
      } catch (error) {
        console.error("Error al obtener información del usuario:", error);
      }
    };

    getUserInfo();
  }, []);

  const handleBuy = async () => {
    try {
      if (!userInfo || !userInfo.sub) {
        toast.warning("Debes iniciar sesión para comprar.");
        return;
      }

      const { data } = await axios.post("/crear-preferencia", {
        userSub: userInfo.sub,
        diplomaturaId,
      });

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        toast.error("No se pudo generar el enlace de pago.");
      }
    } catch (error) {
      console.error("Error al generar preferencia:", error);
      toast.error("Error al iniciar el proceso de pago.");
    }
  };

  const handlePaymentSuccess = () => {
    // La notificación de éxito ya la muestra el PayPalButtonsComponent.
    // Aquí solo gestionamos la redirección.
    // Usamos un timeout para dar tiempo al usuario a leer el toast.
    setTimeout(() => {
      navigate("/mis-cursos"); // Redirige al usuario a su dashboard o a la página de "mis cursos"
    }, 3000);
  };

  if (loading) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <CircularProgress />
    </Box>
  );
}

if (!diplomatura) {
  return (
    <Box textAlign="center" mt={6}>
      <Typography variant="h6" color="error">
        No se pudo encontrar esta diplomatura.
      </Typography>
      <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
        Volver
      </Button>
    </Box>
  );
}

// ✅ Ya es seguro acceder a diplomatura.precio
const isPaidCourse = Number(diplomatura.precio) > 0;

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
        {/* Columna izquierda - Detalles */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {diplomatura.name}
          </Typography>

          <Typography variant="body1" color="text.secondary" gutterBottom>
            Diplomado profesional abierto a todos los niveles y públicos.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="medium" gutterBottom>
            Descripción
          </Typography>

          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-line", color: "text.primary" }}
          >
            {diplomatura.description?.trim() ||
              "Esta diplomatura aún no tiene descripción detallada."}
          </Typography>

          <Divider sx={{ my: 3 }} />
        </Grid>

        {/* Columna derecha - Card de compra */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={5}
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
              image={
                diplomatura.image ||
                "https://via.placeholder.com/400x250?text=Sin+Imagen"
              }
              alt={diplomatura.name}
              sx={{ objectFit: "cover" }}
            />

            <CardContent>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Precio del diplomado
              </Typography>

              <Typography variant="h5" fontWeight="bold" color="primary">
                {Number(diplomatura.precio) > 0
                  ? `$${Number(diplomatura.precio).toLocaleString()}`
                  : "Gratis"}
              </Typography>

              <a
                href="https://wa.link/868j4o"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="success"
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
                      boxShadow: 6,
                    },
                  }}
                >
                  {Number(diplomatura.precio) > 0
                    ? "Comprar ahora"
                    : "Inscribirse gratis"}
                </Button>
              </a>

              {/* Métodos de pago online solo para cursos de pago y usuarios logueados */}
              {isPaidCourse && userInfo && (
                <>
                  {/* Botón de Mercado Pago */}
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{
                      mt: 2,
                      fontWeight: "medium",
                      borderRadius: 3,
                      textTransform: "none",
                    }}
                    onClick={handleBuy}
                  >
                    Pagar con Mercado Pago
                  </Button>
                  
                  {/* 3. Divider y componente de PayPal */}
                  <Divider sx={{ my: 2, fontSize: "0.8rem", color: "text.secondary" }}>
                    o
                  </Divider>

                  <PayPalButtonsComponent
                    diplomaturaId={diplomaturaId}
                    userSub={userInfo.sub}
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </>
              )}

              {/* Mensaje para iniciar sesión */}
              {isPaidCourse && !userInfo && (
                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
                  <a href="/login" style={{textDecoration: 'none'}}>Inicia sesión</a> para ver las opciones de pago online.
                </Typography>
              )}

              
              
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
