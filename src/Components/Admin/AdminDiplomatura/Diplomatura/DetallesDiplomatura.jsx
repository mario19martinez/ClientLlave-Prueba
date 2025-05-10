import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 👈 importamos useNavigate
import axios from "axios";
import {
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import EditarDiplomatura from "./EditarDiplomatura";

export default function DetallesDiplomatura() {
  const { diplomaturaId } = useParams();
  const navigate = useNavigate(); // 👈 inicializamos navigate
  const [diplomatura, setDiplomatura] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

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
  
      // Espera 2 segundos para que el usuario vea el mensaje antes de redirigir
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

  return (
    <section className="bg-white shadow-lg rounded-2xl w-full p-6 md:p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <img
            src={
              diplomatura.image ||
              "https://via.placeholder.com/400x300?text=Sin+imagen"
            }
            alt={diplomatura.name}
            className="rounded-xl shadow-md w-full h-64 object-cover"
          />
        </div>

        <div className="w-full md:w-2/3 relative">
          <div className="absolute top-0 right-0 flex gap-2">
            <Tooltip title="Editar">
              <IconButton
                onClick={() => setEditOpen(true)}
                size="small"
                className="hover:bg-blue-100"
              >
                <EditIcon className="text-blue-600" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                onClick={() => setConfirmDeleteOpen(true)}
                size="small"
                className="hover:bg-red-100"
              >
                <DeleteIcon className="text-red-500" />
              </IconButton>
            </Tooltip>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            {diplomatura.name}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            <span className="font-medium text-gray-800">Descripción:</span>{" "}
            {diplomatura.description || "Sin descripción disponible."}
          </p>
          <div className="text-lg font-semibold text-blue-700 mt-2">
            Precio: ${Number(diplomatura.precio).toFixed(2)}
          </div>
        </div>
      </div>

      {editOpen && (
        <EditarDiplomatura
          isOpen={editOpen}
          onRequestClose={() => setEditOpen(false)}
          diplomaturaId={diplomaturaId}
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
