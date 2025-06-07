import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Box,
  CircularProgress,
  Pagination,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import EditarClase from "./EditarClases";
import DetallesClase from "./DetallesClase";

const obtenerMiniaturaYoutube = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/0.jpg` : null;
};

export default function ClasesDiplomaturaAdmin({ filtros }) {
  const { materiaId, moduloId: clasesmateriaId } = useParams();
  const [clasesOriginales, setClasesOriginales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [claseAEliminar, setClaseAEliminar] = useState(null);
  const [claseAEditar, setClaseAEditar] = useState(null);
  const [claseAVisualizar, setClaseAVisualizar] = useState(null);

  const clasesPorPagina = 6;

  const fetchClases = async () => {
    try {
      const res = await axios.get(`/materia/${materiaId}/clases/${clasesmateriaId}/recursos`);
      setClasesOriginales(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error al cargar recursos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchClases();
  }, [materiaId, clasesmateriaId]);

  const clasesFiltradas = clasesOriginales
    .filter((clase) =>
      filtros.busqueda
        ? clase.name.toLowerCase().includes(filtros.busqueda.toLowerCase())
        : true
    )
    .sort((a, b) =>
      filtros.orden === "recientes"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  const totalPaginas = Math.ceil(clasesFiltradas.length / clasesPorPagina);
  const inicio = (paginaActual - 1) * clasesPorPagina;
  const clasesPagina = clasesFiltradas.slice(inicio, inicio + clasesPorPagina);

  const cambiarPagina = (_, value) => {
    setPaginaActual(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmarEliminar = (clase) => {
    setClaseAEliminar(clase);
  };

  const eliminarClase = async () => {
    if (!claseAEliminar) return;
    try {
      await axios.delete(`/clase/${clasesmateriaId}/recurso/${claseAEliminar.id}`);
      setClaseAEliminar(null);
      fetchClases();
    } catch (error) {
      console.error("Error al eliminar recurso:", error);
    }
  };

  const abrirModalEdicion = (clase) => {
    setClaseAEditar({
      ...clase,
      materiaId,
      moduloId: clasesmateriaId,
    });
  };

  const abrirModalDetalles = (clase) => {
    setClaseAVisualizar({
      ...clase,
      materiaId,
      moduloId: clasesmateriaId,
    });
  };

  if (cargando) {
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!clasesFiltradas.length) {
    return (
      <Box textAlign="center" py={6} color="text.secondary">
        <SentimentDissatisfiedIcon fontSize="large" />
        <Typography variant="h6" mt={1}>
          No hay recursos que coincidan con la búsqueda.
        </Typography>
      </Box>
    );
  }

  return (
    <Box px={2} py={4}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Recursos didácticos de la clase
      </Typography>

      <Grid container spacing={3}>
        {clasesPagina.map((clase) => {
          const miniatura = obtenerMiniaturaYoutube(clase.url);
          return (
            <Grid item xs={12} sm={6} md={4} key={clase.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    ".acciones": { opacity: 1 },
                  },
                }}
              >
                {miniatura ? (
                  <CardMedia
                    component="img"
                    height="180"
                    image={miniatura}
                    alt={clase.name}
                  />
                ) : (
                  <Box
                    height={180}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ backgroundColor: "#f5f5f5" }}
                  >
                    <VideoLibraryIcon fontSize="large" color="disabled" />
                  </Box>
                )}

                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {clase.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {clase.resumen?.puntos?.length
                      ? clase.resumen.puntos.slice(0, 2).join(" • ") + "..."
                      : "Sin resumen disponible."}
                  </Typography>

                  <Box
                    className="acciones"
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 1,
                      opacity: 0,
                      transition: "opacity 0.2s",
                    }}
                  >
                    <Tooltip title="Ver">
                      <IconButton size="small" onClick={() => abrirModalDetalles(clase)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton size="small" onClick={() => abrirModalEdicion(clase)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton size="small" onClick={() => confirmarEliminar(clase)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {totalPaginas > 1 && (
        <Stack mt={5} alignItems="center">
          <Pagination
            count={totalPaginas}
            page={paginaActual}
            onChange={cambiarPagina}
            color="primary"
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
            showFirstButton
            showLastButton
          />
        </Stack>
      )}

      <Dialog open={!!claseAEliminar} onClose={() => setClaseAEliminar(null)}>
        <DialogTitle>¿Eliminar recurso?</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar el recurso "
          <strong>{claseAEliminar?.name}</strong>"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClaseAEliminar(null)}>Cancelar</Button>
          <Button onClick={eliminarClase} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <EditarClase
        open={!!claseAEditar}
        onClose={() => setClaseAEditar(null)}
        clase={claseAEditar}
        onActualizada={fetchClases}
      />

      <DetallesClase
        open={!!claseAVisualizar}
        onClose={() => setClaseAVisualizar(null)}
        clase={claseAVisualizar}
        onEditar={() => {
          abrirModalEdicion(claseAVisualizar);
          setClaseAVisualizar(null);
        }}
        onEliminar={() => {
          confirmarEliminar(claseAVisualizar);
          setClaseAVisualizar(null);
        }}
      />
    </Box>
  );
}