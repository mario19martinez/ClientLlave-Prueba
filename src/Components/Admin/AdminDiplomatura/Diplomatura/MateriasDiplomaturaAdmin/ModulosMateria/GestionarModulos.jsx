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
  const [modulos, setModulos] = useState([]);
  const [selectedAvailable, setSelectedAvailable] = useState([]);
  const [selectedAssigned, setSelectedAssigned] = useState([]);
  const [showCrearModal, setShowCrearModal] = useState(false);
  const [moduloAEditar, setModuloAEditar] = useState(null);
  const [moduloAEliminar, setModuloAEliminar] = useState(null);

  const fetchModulos = async () => {
    try {
      const res = await axios.get(`/materia/${materiaId}/modulos`);
      setModulos(res.data);
    } catch (err) {
      console.error("Error al obtener los módulos:", err);
    }
  };

  useEffect(() => {
    if (isOpen) fetchModulos();
  }, [isOpen]);

  const toggleAvailable = (modulo) => {
    setSelectedAvailable((prev) =>
      prev.some((m) => m.id === modulo.id)
        ? prev.filter((m) => m.id !== modulo.id)
        : [...prev, modulo]
    );
  };

  const toggleAssigned = (modulo) => {
    setSelectedAssigned((prev) =>
      prev.some((m) => m.id === modulo.id)
        ? prev.filter((m) => m.id !== modulo.id)
        : [...prev, modulo]
    );
  };

  const handleActivar = async () => {
    try {
      await Promise.all(
        selectedAvailable.map((modulo) =>
          axios.put(`/materia/${materiaId}/modulo/${modulo.id}`, { activo: true })
        )
      );
      toast.success("✅ Módulos activados correctamente");
      setSelectedAvailable([]);
      fetchModulos();
      onModulosUpdate?.();
    } catch (err) {
      console.error("Error al activar módulos:", err);
      toast.error("❌ Error al activar módulos");
    }
  };

  const handleDesactivar = async () => {
    try {
      await Promise.all(
        selectedAssigned.map((modulo) =>
          axios.put(`/materia/${materiaId}/modulo/${modulo.id}`, { activo: false })
        )
      );
      toast.success("✅ Módulos desactivados correctamente");
      setSelectedAssigned([]);
      fetchModulos();
      onModulosUpdate?.();
    } catch (err) {
      console.error("Error al desactivar módulos:", err);
      toast.error("❌ Error al desactivar módulos");
    }
  };

  const handleEliminarModulo = async () => {
    try {
      await axios.delete(`/materia/${materiaId}/modulo/${moduloAEliminar.id}`);
      toast.success("✅ Módulo eliminado");
      setModuloAEliminar(null);
      fetchModulos();
      onModulosUpdate?.();
    } catch (err) {
      console.error("Error al eliminar módulo:", err);
      toast.error("❌ Error al eliminar módulo");
    }
  };

  const modulosDisponibles = modulos.filter((m) => !m.activo);
  const modulosAsignados = modulos.filter((m) => m.activo);

  const renderModuloItem = (modulo, selectedList, toggleFn, isAsignado) => {
    const isSelected = selectedList.some((m) => m.id === modulo.id);
    return (
      <ListItemButton
        key={modulo.id}
        selected={isSelected}
        onClick={() => toggleFn(modulo)}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "&.Mui-selected": {
            bgcolor: "#DBEAFE",
          },
          "&:hover .modulo-actions": {
            opacity: 1,
          },
        }}
      >
        <ListItemText
          primary={
            <div className="flex items-center justify-between w-full">
              <span>{modulo.titulo}</span>
              {isSelected && <CheckCircleIcon sx={{ color: "#3B82F6", fontSize: 20 }} />}
            </div>
          }
        />
        <div className="modulo-actions opacity-0 transition-opacity duration-150 flex gap-2">
          <Tooltip title="Editar módulo">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              setModuloAEditar(modulo);
            }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar módulo">
            <IconButton size="small" onClick={(e) => {
              e.stopPropagation();
              setModuloAEliminar(modulo);
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
            Gestión de Módulos
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            Crear, asignar o desasignar módulos de la materia
          </Typography>
        </div>

        <div className="mb-6">
          <Tooltip title="Crear nuevo módulo">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ backgroundColor: "#3B82F6", color: "#fff" }}
              onClick={() => setShowCrearModal(true)}
            >
              Crear Módulo
            </Button>
          </Tooltip>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <Typography variant="subtitle1" className="mb-2 font-semibold text-gray-700">
              Módulos Disponibles
            </Typography>
            <Paper variant="outlined" className="h-72 overflow-auto">
              <List>
                {modulosDisponibles.map((modulo) =>
                  renderModuloItem(modulo, selectedAvailable, toggleAvailable, false)
                )}
                {modulosDisponibles.length === 0 && (
                  <Typography variant="body2" color="textSecondary" className="px-4 py-2">
                    No hay módulos disponibles.
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
              sx={{ backgroundColor: "#3B82F6", color: "#fff" }}
              disabled={selectedAvailable.length === 0}
              onClick={handleActivar}
            >
              Agregar
            </Button>

            <Button
              variant="contained"
              startIcon={<ArrowForwardIcon sx={{ transform: "rotate(180deg)" }} />}
              sx={{ backgroundColor: "#EF4444", color: "#fff" }}
              disabled={selectedAssigned.length === 0}
              onClick={handleDesactivar}
            >
              Quitar
            </Button>
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography variant="subtitle1" className="mb-2 font-semibold text-gray-700">
              Módulos de la Materia
            </Typography>
            <Paper variant="outlined" className="h-72 overflow-auto">
              <List>
                {modulosAsignados.map((modulo) =>
                  renderModuloItem(modulo, selectedAssigned, toggleAssigned, true)
                )}
                {modulosAsignados.length === 0 && (
                  <Typography variant="body2" color="textSecondary" className="px-4 py-2">
                    No hay módulos asignados.
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

      {/* Crear */}
      <CrearModulos
        isOpen={showCrearModal}
        onRequestClose={() => {
          setShowCrearModal(false);
          fetchModulos();
          onModulosUpdate?.();
        }}
      />

      {/* Editar */}
      {moduloAEditar && (
        <EditarModulo
          isOpen={!!moduloAEditar}
          onClose={() => setModuloAEditar(null)}
          modulo={moduloAEditar}
          onUpdate={() => {
            setModuloAEditar(null);
            fetchModulos();
            onModulosUpdate?.();
          }}
        />
      )}

      {/* Confirmar Eliminar */}
      <Dialog open={!!moduloAEliminar} onClose={() => setModuloAEliminar(null)}>
        <DialogTitle>¿Eliminar módulo?</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar el módulo <strong>{moduloAEliminar?.titulo}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModuloAEliminar(null)}>Cancelar</Button>
          <Button color="error" onClick={handleEliminarModulo} variant="contained">
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