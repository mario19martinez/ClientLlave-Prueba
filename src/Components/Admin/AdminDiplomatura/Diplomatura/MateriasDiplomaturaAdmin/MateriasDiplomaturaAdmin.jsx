import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import PaginadoDiplomatura from "../PaginadoDiplomatura";
import EditarMateria from "./EditarMateria";
import { toast } from "react-toastify";

// Utilidad para convertir números romanos a decimales
function extractRomanNumber(name) {
  const match = name.match(/(?:materia\s*)?([ivxlcdm]+)/i);
  if (!match) return 0;

  const roman = match[1].toUpperCase();
  const romanMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

  let total = 0, prev = 0;
  for (let i = roman.length - 1; i >= 0; i--) {
    const current = romanMap[roman[i]];
    total += current < prev ? -current : current;
    prev = current;
  }

  return total;
}

export default function MateriasDiplomaturaAdmin({ search = "", filter = "", reloadTrigger }) {
  const { diplomaturaId } = useParams();
  const navigate = useNavigate();
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [materiaToDelete, setMateriaToDelete] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const ITEMS_PER_PAGE = 6;

  const fetchMaterias = async () => {
    try {
      const res = await axios.get(`/diplomatura/${diplomaturaId}/materias`);
      setMaterias(res.data);
    } catch (err) {
      console.error("Error al obtener materias:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterias();
  }, [diplomaturaId, reloadTrigger]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const filteredMaterias = useMemo(() => {
    let result = [...materias];

    if (search.trim()) {
      result = result.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (filter) {
      case "precio_asc":
        result.sort((a, b) => a.precio - b.precio);
        break;
      case "precio_desc":
        result.sort((a, b) => b.precio - a.precio);
        break;
      case "nombre_az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nombre_za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "creacion_asc":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "creacion_desc":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "orden_romano":
        result.sort((a, b) => extractRomanNumber(a.name) - extractRomanNumber(b.name));
        break;
    }

    return result;
  }, [materias, search, filter]);

  const totalPages = Math.ceil(filteredMaterias.length / ITEMS_PER_PAGE);
  const paginatedMaterias = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMaterias.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMaterias, currentPage]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/diplomatura/${diplomaturaId}/materia/${materiaToDelete?.id}`);
      toast.success("Materia eliminada correctamente");
      setDeleteDialogOpen(false);
      setMateriaToDelete(null);
      fetchMaterias();
    } catch (error) {
      console.error("Error al eliminar materia:", error);
      toast.error("No se pudo eliminar la materia");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (filteredMaterias.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
        <InfoOutlinedIcon sx={{ fontSize: 60 }} className="text-blue-500 mb-4" />
        <p className="text-xl font-semibold">No hay materias que coincidan.</p>
        <p className="text-sm mt-1">Prueba con otro filtro o término de búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="bg-white px-6 py-6 w-full shadow-md rounded-lg mt-4">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Materias de la Diplomatura
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {paginatedMaterias.map((materia) => (
          <div
            key={materia.id}
            onClick={() => navigate(`/admin/diplomaturas/${diplomaturaId}/materia/${materia.id}`)}
            className="group relative flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow transition duration-200 bg-gray-50 cursor-pointer"
          >
            <img
              src={materia.image || "https://via.placeholder.com/100x100?text=Sin+imagen"}
              alt={materia.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800">{materia.name}</h4>
              <p className="text-blue-600 font-medium mt-1">
                ${Number(materia.precio).toFixed(2)}
              </p>
            </div>

            <div
              className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <Tooltip title="Ver ventas">
                <IconButton size="small" className="text-blue-600 hover:bg-blue-50">
                  <ShowChartIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Editar">
                <IconButton
                  size="small"
                  className="text-yellow-600 hover:bg-yellow-50"
                  onClick={() => {
                    setSelectedMateria(materia);
                    setIsEditOpen(true);
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar">
                <IconButton
                  size="small"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setMateriaToDelete(materia);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <PaginadoDiplomatura
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {selectedMateria && (
        <EditarMateria
          isOpen={isEditOpen}
          onRequestClose={() => setIsEditOpen(false)}
          diplomaturaId={diplomaturaId}
          materiaData={selectedMateria}
          onUpdated={() => {
            setIsEditOpen(false);
            fetchMaterias();
          }}
        />
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle className="text-lg font-bold">¿Eliminar materia?</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar{" "}
            <strong>{materiaToDelete?.name}</strong>? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

MateriasDiplomaturaAdmin.propTypes = {
  search: PropTypes.string,
  filter: PropTypes.string,
  reloadTrigger: PropTypes.bool,
};