import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Tooltip,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { toast } from "react-toastify";
import EditarDiplomatura from "./EditarDiplomatura";

export default function DetallesDiplomatura() {
  const { diplomaturaId } = useParams();
  const navigate = useNavigate();
  const [diplomatura, setDiplomatura] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchDiplomatura = async () => {
      try {
        const res = await axios.get(`/diplomatura/${diplomaturaId}`);
        setDiplomatura(res.data);
      } catch (err) {
        console.error("Error al obtener diplomatura:", err);
        toast.error("Error al cargar la diplomatura");
      } finally {
        setLoading(false);
      }
    };

    fetchDiplomatura();
  }, [diplomaturaId]);

  const handleUpdated = () => {
    setEditOpen(false);
    toast.success("Diplomatura actualizada");
    setLoading(true);
    axios
      .get(`/diplomatura/${diplomaturaId}`)
      .then((res) => setDiplomatura(res.data))
      .finally(() => setLoading(false));
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/diplomatura/${diplomaturaId}`);
      toast.success("Diplomatura eliminada con éxito");
      setConfirmDeleteOpen(false);
      setTimeout(() => {
        navigate("/admin/diplomaturas");
      }, 2000);
    } catch (error) {
      console.error("Error al eliminar diplomatura:", error);
      toast.error("No se pudo eliminar la diplomatura");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (!diplomatura) {
    return (
      <div className="text-center text-gray-600 py-10">
        <p className="text-xl font-semibold">Diplomatura no encontrada.</p>
      </div>
    );
  }

  const isLongDescription = diplomatura.description?.length > 250;

  return (
    <section className="bg-white shadow-lg rounded-2xl w-full p-6 md:p-8 mb-8">
      {/* Barra superior con acciones */}
      <div className="flex justify-end gap-3 mb-4">
        <Tooltip title="Ver ventas">
          <IconButton className="hover:bg-blue-100 text-blue-600">
            <ShowChartIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Editar">
          <IconButton
            onClick={() => setEditOpen(true)}
            className="hover:bg-yellow-100 text-yellow-600"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton
            onClick={() => setConfirmDeleteOpen(true)}
            className="hover:bg-red-100 text-red-600"
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>

      {/* Contenido */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Imagen */}
        <div className="w-full md:w-1/3">
          <img
            src={
              diplomatura.image ||
              "https://via.placeholder.com/400x300?text=Sin+imagen"
            }
            alt={diplomatura.name}
            className="rounded-xl shadow-md w-full h-64 object-contain bg-gray-50 border"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            {diplomatura.name}
          </h2>

          <div className="text-gray-700 leading-relaxed">
            <span className="font-medium text-gray-900">Descripción:</span>{" "}
            <Collapse in={showFullDescription} collapsedSize={90}>
              <span>
                {diplomatura.description || "Sin descripción disponible."}
              </span>
            </Collapse>
            {isLongDescription && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-blue-600 hover:underline text-sm mt-1 block"
              >
                {showFullDescription ? "Ver menos" : "Ver más"}
              </button>
            )}
          </div>

          <div className="text-lg font-semibold text-blue-700 mt-4">
            Precio: ${Number(diplomatura.precio).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Modales */}
      {editOpen && (
        <EditarDiplomatura
          isOpen={editOpen}
          onRequestClose={() => setEditOpen(false)}
          diplomaturaData={diplomatura}
          onUpdated={handleUpdated}
        />
      )}

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle className="text-lg font-semibold">
          ¿Eliminar esta diplomatura?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}
