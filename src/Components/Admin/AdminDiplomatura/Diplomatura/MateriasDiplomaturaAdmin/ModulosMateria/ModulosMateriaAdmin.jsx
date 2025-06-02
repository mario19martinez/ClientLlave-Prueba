import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditarModulo from "./EditarModulo";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Componente individual arrastrable
function SortableItem({ modulo, index, onEdit, onDelete, onView }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: modulo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-md border border-gray-200 shadow-sm transition-all group"
    >
      {/* Título con número */}
      <div
        className="flex items-center gap-3 text-blue-800 font-semibold cursor-move"
        {...attributes}
        {...listeners}
      >
        <span className="text-gray-500">{index + 1}.</span>
        <span className="truncate max-w-xs">{modulo.titulo}</span>
      </div>

      {/* Acciones ocultas al pasar el mouse */}
      <div
        className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <Tooltip title="Ver detalles">
          <IconButton size="small" onClick={() => onView(modulo)}>
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Ver ventas">
          <IconButton size="small" className="text-blue-600 hover:bg-blue-50">
            <ShowChartIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar módulo">
          <IconButton
            size="small"
            onClick={() => onEdit(modulo)}
            className="text-yellow-600 hover:bg-yellow-50"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar módulo">
          <IconButton
            size="small"
            onClick={() => onDelete(modulo)}
            className="text-red-600 hover:bg-red-50"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </li>
  );
}

// Componente principal
export default function ModulosMateriaAdmin({ refreshTrigger, search }) {
  const { materiaId, diplomaturaId } = useParams();
  const navigate = useNavigate();
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moduloAEliminar, setModuloAEliminar] = useState(null);
  const [moduloAEditar, setModuloAEditar] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const fetchModulos = async () => {
    try {
      const res = await axios.get(`/materia/${materiaId}/modulos`);
      const activos = res.data.filter((m) => m.activo);
      const ordenados = activos.sort((a, b) => a.orden - b.orden);
      setModulos(ordenados);
    } catch (err) {
      console.error("Error al obtener módulos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchModulos();
  }, [materiaId, refreshTrigger]);

  const actualizarOrden = async (lista) => {
    try {
      const actualizada = lista.map((m, i) => ({ ...m, orden: i + 1 }));
      setModulos(actualizada);
      for (const modulo of actualizada) {
        await axios.put(`/materia/${materiaId}/modulo/${modulo.id}`, {
          orden: modulo.orden,
        });
      }
    } catch (error) {
      console.error("Error actualizando orden:", error);
      toast.error("❌ Error al actualizar orden");
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = modulos.findIndex((m) => m.id === active.id);
    const newIndex = modulos.findIndex((m) => m.id === over.id);
    const nuevos = arrayMove(modulos, oldIndex, newIndex);
    actualizarOrden(nuevos);
  };

  const eliminarModulo = async () => {
    try {
      await axios.delete(`/materia/${materiaId}/modulo/${moduloAEliminar.id}`);
      toast.success("✅ Módulo eliminado correctamente");
      setModuloAEliminar(null);
      fetchModulos();
    } catch (error) {
      console.error("Error al eliminar módulo:", error);
      toast.error("❌ Hubo un problema al eliminar el módulo");
    }
  };

  const handleViewDetails = (modulo) => {
    navigate(`/admin/diplomaturas/${diplomaturaId}/materia/${materiaId}/modulo/${modulo.id}`);
  };

  const modulosFiltrados = modulos.filter((modulo) =>
    modulo.titulo.toLowerCase().includes(search?.toLowerCase() || "")
  );

  if (loading) {
    return <div className="flex justify-center items-center h-48"><CircularProgress /></div>;
  }

  if (!modulosFiltrados.length) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
        <InfoOutlinedIcon sx={{ fontSize: 60 }} className="text-blue-500 mb-4" />
        <p className="text-xl font-semibold">No hay módulos activos en esta materia.</p>
        <p className="text-sm mt-1">Puedes crear uno desde la gestión de módulos.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <Typography variant="h5" className="font-bold text-gray-800 mb-6">
        Módulos Activos de la Materia
      </Typography>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={modulosFiltrados.map(m => m.id)} strategy={verticalListSortingStrategy}>
          <ul className="space-y-3">
            {modulosFiltrados.map((modulo, index) => (
              <SortableItem
                key={modulo.id}
                modulo={modulo}
                index={index}
                onEdit={setModuloAEditar}
                onDelete={setModuloAEliminar}
                onView={handleViewDetails}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      {/* Confirmar eliminación */}
      <Dialog open={!!moduloAEliminar} onClose={() => setModuloAEliminar(null)}>
        <DialogTitle>¿Eliminar módulo?</DialogTitle>
        <DialogContent>
          <Typography>
            Estás a punto de eliminar el módulo <strong>{moduloAEliminar?.titulo}</strong>.
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModuloAEliminar(null)} color="inherit">Cancelar</Button>
          <Button onClick={eliminarModulo} variant="contained" color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal Editar */}
      {moduloAEditar && (
        <EditarModulo
          isOpen={!!moduloAEditar}
          onClose={() => setModuloAEditar(null)}
          modulo={moduloAEditar}
          onUpdate={() => {
            fetchModulos();
            setModuloAEditar(null);
          }}
        />
      )}
    </div>
  );
}