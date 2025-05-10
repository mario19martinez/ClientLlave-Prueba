import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import CardDiplomatura from "./CardsDiplomaras";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PaginadoDiplomatura from "./PaginadoDiplomatura";
import EditarDiplomatura from "./EditarDiplomatura";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 8;

export default function Diplomaturas({ reloadTrigger, searchTerm, sortOrder }) {
  const [diplomaturas, setDiplomaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [editingId, setEditingId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [deleteId, setDeleteId] = useState(null); // ID a eliminar
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const fetchDiplomaturas = async () => {
    try {
      const response = await axios.get("/diplomaturas");
      setDiplomaturas(response.data);
    } catch (error) {
      console.error("Error al obtener diplomaturas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiplomaturas();
  }, [reloadTrigger]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder]);

  const handleEdit = (id) => {
    setEditingId(id);
    setIsEditOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/diplomatura/${deleteId}`);
      toast.success("Diplomatura eliminada con éxito");
      setConfirmDeleteOpen(false);
      fetchDiplomaturas();
    } catch (error) {
      console.error("Error al eliminar diplomatura:", error);
      toast.error("No se pudo eliminar la diplomatura");
    }
  };

  const handleUpdated = () => {
    fetchDiplomaturas();
    setIsEditOpen(false);
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...diplomaturas];

    if (searchTerm?.trim()) {
      result = result.filter((d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOrder) {
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "recent":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "certified":
        result = result.filter((d) => d.certificacion === true);
        break;
      case "nocertified":
        result = result.filter((d) => d.certificacion === false);
        break;
    }

    return result;
  }, [diplomaturas, searchTerm, sortOrder]);

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE);
  const paginatedData = filteredAndSorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const diplomaturaToEdit = diplomaturas.find((d) => d.id === editingId);

  return (
    <div className="bg-white px-6 py-4 shadow rounded-md">
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredAndSorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
          <InfoOutlinedIcon sx={{ fontSize: 60 }} className="text-blue-500 mb-4" />
          <p className="text-xl font-semibold">No hay diplomaturas que coincidan.</p>
          <p className="text-sm mt-1">Prueba con otro término o filtro.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {paginatedData.map((d) => (
              <CardDiplomatura
                key={d.id}
                id={d.id}
                name={d.name}
                image={d.image}
                precio={d.precio}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <PaginadoDiplomatura
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Modal edición */}
      {diplomaturaToEdit && (
        <EditarDiplomatura
          isOpen={isEditOpen}
          onRequestClose={() => setIsEditOpen(false)}
          diplomaturaData={diplomaturaToEdit}
          onUpdated={handleUpdated}
        />
      )}

      {/* Modal confirmación eliminación */}
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle className="text-lg font-semibold">
          ¿Estás seguro de que deseas eliminar esta diplomatura?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="inherit">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
