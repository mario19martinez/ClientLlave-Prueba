import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PeopleIcon from "@mui/icons-material/People";
import HelpIcon from "@mui/icons-material/Help";
import axios from "axios";

export default function DetallesModulo() {
  const { diplomaturaId, materiaId, moduloId } = useParams();
  const navigate = useNavigate();

  const [modulo, setModulo] = useState(null);
  const [verMas, setVerMas] = useState(false);
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false);

  useEffect(() => {
    const fetchModulo = async () => {
      try {
        const res = await axios.get(`/materia/${materiaId}/modulo/${moduloId}`);
        setModulo(res.data);
      } catch (error) {
        console.error("Error al obtener detalles del módulo:", error);
      }
    };

    fetchModulo();
  }, [materiaId, moduloId]);

  if (!modulo) {
    return (
      <div className="flex justify-center items-center h-48">
        <Typography>Cargando módulo...</Typography>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
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
          <Box display="flex" justifyContent="space-between" gap={4} flexWrap="wrap">
            <Box flex={1} minWidth={250}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {modulo.titulo}
              </Typography>

              <Typography variant="body1" color="text.secondary" paragraph>
                <strong>Descripción:</strong>{" "}
                {verMas || modulo.descripcion.length <= 200
                  ? modulo.descripcion
                  : `${modulo.descripcion.slice(0, 200)}... `}
                {modulo.descripcion.length > 200 && (
                  <Button
                    onClick={() => setVerMas((prev) => !prev)}
                    size="small"
                    sx={{ ml: 1, fontSize: "0.85rem" }}
                  >
                    {verMas ? "Ver menos" : "Ver más"}
                  </Button>
                )}
              </Typography>

              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                <strong>Precio:</strong> ${Number(modulo.precio).toFixed(2)}
              </Typography>

              <Button
                variant="outlined"
                startIcon={<HelpIcon />}
                onClick={() => setMostrarPreguntas(true)}
              >
                Ver preguntas
              </Button>
            </Box>

            <Box display="flex" gap={1} flexWrap="wrap" alignItems="start">
              <Tooltip title="Ver ventas">
                <IconButton sx={{ color: "#888" }}>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Gestión de usuarios">
                <IconButton sx={{ color: "#888" }}>
                  <PeopleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Editar módulo">
                <IconButton sx={{ color: "#888" }}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar módulo">
                <IconButton sx={{ color: "#888" }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Modal de preguntas */}
      <Dialog
        open={mostrarPreguntas}
        onClose={() => setMostrarPreguntas(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Preguntas del Módulo</DialogTitle>
        <DialogContent dividers>
          {modulo.preguntas?.length > 0 ? (
            <List>
              {modulo.preguntas.map((p, i) => (
                <ListItem key={i} alignItems="flex-start">
                  <ListItemText
                    primary={`${i + 1}. ${p.enunciado}`}
                    secondary={
                      p.tipo === "multiple"
                        ? `Opciones: ${p.opciones.join(", ")} | Respuesta: ${p.respuesta}`
                        : `Respuesta: ${p.respuesta ? "Verdadero" : "Falso"}`
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="text.secondary">
              Este módulo no tiene preguntas registradas.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarPreguntas(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}