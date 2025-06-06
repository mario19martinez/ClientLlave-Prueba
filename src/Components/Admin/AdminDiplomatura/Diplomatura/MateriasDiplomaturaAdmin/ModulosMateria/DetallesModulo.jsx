import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
  Tooltip,
  Box,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PeopleIcon from "@mui/icons-material/People";
import axios from "axios";

export default function DetallesModulo() {
  const { diplomaturaId, materiaId, moduloId } = useParams();
  const navigate = useNavigate();

  const [clase, setClase] = useState(null);
  const [verMas, setVerMas] = useState(false);

  useEffect(() => {
    const fetchClase = async () => {
      try {
        const res = await axios.get(`/materia/${materiaId}/clase/${moduloId}`);
        setClase(res.data);
      } catch (error) {
        console.error("Error al obtener detalles de la clase:", error);
      }
    };

    fetchClase();
  }, [materiaId, moduloId]);

  if (!clase) {
    return (
      <Box className="flex justify-center items-center h-48">
        <Typography variant="body1">Cargando clase...</Typography>
      </Box>
    );
  }

  return (
    <Box className="p-6 w-full">
      <IconButton
        onClick={() =>
          navigate(`/admin/diplomaturas/${diplomaturaId}/materia/${materiaId}`)
        }
        sx={{ mb: 3 }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Card className="rounded-xl shadow-md">
        <CardContent>
          <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={3}>
            <Box flex={1} minWidth={260}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {clase.titulo}
              </Typography>

              <Typography variant="body1" color="text.secondary" paragraph>
                <strong>Descripción:</strong>{" "}
                {verMas || clase.descripcion?.length <= 200
                  ? clase.descripcion
                  : `${clase.descripcion?.slice(0, 200)}...`}
                {clase.descripcion?.length > 200 && (
                  <Button
                    onClick={() => setVerMas((prev) => !prev)}
                    size="small"
                    sx={{ ml: 1, fontSize: "0.85rem" }}
                  >
                    {verMas ? "Ver menos" : "Ver más"}
                  </Button>
                )}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                <strong>Contenido:</strong> {clase.contenido?.slice(0, 100)}...
              </Typography>

              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                <strong>Precio:</strong> ${Number(clase.precio).toFixed(2)}
              </Typography>
            </Box>

            <Box display="flex" gap={1} flexWrap="wrap" alignItems="flex-start">
              <Tooltip title="Ver ventas o estadísticas">
                <IconButton sx={{ color: "#555" }}>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Gestión de usuarios">
                <IconButton sx={{ color: "#555" }}>
                  <PeopleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Editar clase">
                <IconButton sx={{ color: "#555" }}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar clase">
                <IconButton sx={{ color: "#c00" }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}