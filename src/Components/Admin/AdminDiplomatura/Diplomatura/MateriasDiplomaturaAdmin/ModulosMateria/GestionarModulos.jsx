import Modal from "react-modal";
import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Button,
  Tooltip,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CrearModulos from "./CrearMoudulos"; 
import EditarModulo from "./EditarModulo";  
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

Modal.setAppElement("#root");

export default function GestionarModulos({ isOpen, onRequestClose, onModulosUpdate }) {
  const { materiaId } = useParams();
  const [clases, setClases] = useState([]);
  const [selectedAvailable, setSelectedAvailable] = useState([]);
  const [selectedAssigned, setSelectedAssigned] = useState([]);
  const [showCrearModal, setShowCrearModal] = useState(false);
  const [claseAEditar, setClaseAEditar] = useState(null);
  const [claseAEliminar, setClaseAEliminar] = useState(null);

  const fetchClases = async () => {
    try {
      const res = await axios.get(`/materia/${materiaId}/clases`);
      setClases(res.data);
    } catch (err) {
      console.error("Error al obtener las clases:", err);
    }
  };

  useEffect(() => {
    if (isOpen) fetchClases();
  }, [isOpen]);

  const toggleAvailable = (clase) => {
    setSelectedAvailable((prev) =>
      prev.some((m) => m.id === clase.id)
        ? prev.filter((m) => m.id !== clase.id)
        : [...prev, clase]
    );
  };

  const toggleAssigned = (clase) => {
    setSelectedAssigned((prev) =>
      prev.some((m) => m.id === clase.id)
        ? prev.filter((m) => m.id !== clase.id)
        : [...prev, clase]
    );
  };

  const handleActivar = async () => {
    try {
      await Promise.all(
        selectedAvailable.map((clase) =>
          axios.put(`/materia/${materiaId}/clase/${clase.id}`, { activo: true })
        )
      );
      toast.success("✅ Clases activadas correctamente");
      setSelectedAvailable([]);
      fetchClases();
      onModulosUpdate?.();
    } catch (err) {
      console.error("Error al activar clases:", err);
      toast.error("❌ Error al activar clases");
    }
  };

  const handleDesactivar = async () => {
    try {
      await Promise.all(
        selectedAssigned.map((clase) =>
          axios.put(`/materia/${materiaId}/clase/${clase.id}`, { activo: false })
        )
      );
      toast.success("✅ Clases desactivadas correctamente");
      setSelectedAssigned([]);
      fetchClases();
      onModulosUpdate?.();
    } catch (err) {
      console.error("Error al desactivar clases:", err);
      toast.error("❌ Error al desactivar clases");
    }
  };

  const handleEliminarClase = async () => {
    try {
      await axios.delete(`/materia/${materiaId}/clase/${claseAEliminar.id}`);
      toast.success("✅ Clase eliminada");
      setClaseAEliminar(null);
      fetchClases();
      onModulosUpdate?.();
    } catch (err) {
      console.error("Error al eliminar clase:", err);
      toast.error("❌ Error al eliminar clase");
    }
  };

  const clasesDisponibles = clases.filter((m) => !m.activo);
  const clasesAsignadas = clases.filter((m) => m.activo);

  const renderClaseItem = (clase, selectedList, toggleFn) => {
    const isSelected = selectedList.some((m) => m.id === clase.id);
    return (
      <ListItemButton
        key={clase.id}
        selected={isSelected}
        onClick={() => toggleFn(clase)}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "&.Mui-selected": {
            bgcolor: "#DBEAFE",
          },
          "&:hover .clase-actions": {
            opacity: 1,
          },
        }}
      >
        <ListItemText
          primary={
            <div className="flex items-center justify-between w-full">
              <span>{clase.titulo}</span>
              {isSelected && <CheckCircleIcon sx={{ color: "#3B82F6", fontSize: 20 }} />}
            </div>
          }
        />
        <div className="clase-actions opacity-0 transition-opacity duration-150 flex gap-2">
          <Tooltip title="Editar clase">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              setClaseAEditar(clase);
            }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar clase">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              setClaseAEliminar(clase);
            }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </ListItemButton>
    );
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="z-50 w-[95%] max-w-5xl bg-white rounded-lg p-6 relative shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
      >
        <div className="mb-6">
          <Typography variant="h5" className="font-bold text-gray-800">
            Gestión de Clases
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            Crear, asignar o desasignar clases de la materia
          </Typography>
        </div>

        <div className="mb-6">
          <Tooltip title="Crear nueva clase">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ backgroundColor: "#3B82F6", color: "#fff", borderRadius: "10px" }}
              onClick={() => setShowCrearModal(true)}
            >
              Crear Clase
            </Button>
          </Tooltip>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Typography variant="subtitle1" className="mb-2 font-semibold text-gray-700">
              Clases Disponibles
            </Typography>
            <Paper variant="outlined" className="h-72 overflow-auto rounded-lg">
              <List>
                {clasesDisponibles.map((clase) =>
                  renderClaseItem(clase, selectedAvailable, toggleAvailable)
                )}
                {clasesDisponibles.length === 0 && (
                  <Typography variant="body2" color="textSecondary" className="px-4 py-2">
                    No hay clases disponibles.
                  </Typography>
                )}
              </List>
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={2}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Button
              variant="contained"
              startIcon={<ArrowForwardIcon />}
              sx={{ backgroundColor: "#3B82F6", color: "#fff", borderRadius: "10px" }}
              disabled={selectedAvailable.length === 0}
              onClick={handleActivar}
            >
              Agregar
            </Button>

            <Button
              variant="contained"
              startIcon={<ArrowForwardIcon sx={{ transform: "rotate(180deg)" }} />}
              sx={{ backgroundColor: "#EF4444", color: "#fff", borderRadius: "10px" }}
              disabled={selectedAssigned.length === 0}
              onClick={handleDesactivar}
            >
              Quitar
            </Button>
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography variant="subtitle1" className="mb-2 font-semibold text-gray-700">
              Clases Asignadas
            </Typography>
            <Paper variant="outlined" className="h-72 overflow-auto rounded-lg">
              <List>
                {clasesAsignadas.map((clase) =>
                  renderClaseItem(clase, selectedAssigned, toggleAssigned)
                )}
                {clasesAsignadas.length === 0 && (
                  <Typography variant="body2" color="textSecondary" className="px-4 py-2">
                    No hay clases asignadas.
                  </Typography>
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>

        <div className="mt-6 flex justify-end">
          <Button onClick={onRequestClose} variant="outlined" color="error">
            Cerrar
          </Button>
        </div>
      </Modal>

      {/* Crear Clase */}
      <CrearModulos
        isOpen={showCrearModal}
        onRequestClose={() => {
          setShowCrearModal(false);
          fetchClases();
          onModulosUpdate?.();
        }}
      />

      {/* Editar Clase */}
      {claseAEditar && (
        <EditarModulo
          isOpen={!!claseAEditar}
          onClose={() => setClaseAEditar(null)}
          modulo={claseAEditar}
          onUpdate={() => {
            setClaseAEditar(null);
            fetchClases();
            onModulosUpdate?.();
          }}
        />
      )}

      {/* Confirmar Eliminar */}
      <Dialog open={!!claseAEliminar} onClose={() => setClaseAEliminar(null)}>
        <DialogTitle>¿Eliminar clase?</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar la clase <strong>{claseAEliminar?.titulo}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClaseAEliminar(null)}>Cancelar</Button>
          <Button color="error" onClick={handleEliminarClase} variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

GestionarModulos.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onModulosUpdate: PropTypes.func,
};