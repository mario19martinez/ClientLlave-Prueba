import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { toast } from "react-toastify";
import {
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Close,
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
  PersonAdd,
} from "@mui/icons-material";
import InscribirEstudianteDiplomatura from "./InscribirEstudianteDiplomatura";

Modal.setAppElement("#root");

export default function AllEstudiantesDiplomatura({ isOpen, onClose }) {
  const { diplomaturaId } = useParams();
  const [estudiantes, setEstudiantes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalInscribirOpen, setModalInscribirOpen] = useState(false);

  const ESTUDIANTES_POR_PAGINA = 8;

  const fetchEstudiantes = async () => {
    try {
      const { data } = await axios.get(`/diplomatura/${diplomaturaId}/usuarios`);
      if (data.success) {
        setEstudiantes(data.users);
        setFiltered(data.users);
      } else {
        toast.error("No se pudieron cargar los estudiantes inscritos.");
      }
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
      toast.error("Error al obtener la lista de estudiantes.");
    }
  };

  useEffect(() => {
    if (isOpen) fetchEstudiantes();
  }, [isOpen, diplomaturaId]);

  useEffect(() => {
    const term = search.toLowerCase();
    const result = estudiantes.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.last_name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    setFiltered(result);
    setCurrentPage(1);
  }, [search, estudiantes]);

  const totalPages = Math.ceil(filtered.length / ESTUDIANTES_POR_PAGINA);
  const startIndex = (currentPage - 1) * ESTUDIANTES_POR_PAGINA;
  const currentUsers = filtered.slice(startIndex, startIndex + ESTUDIANTES_POR_PAGINA);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const before = Math.max(2, currentPage - 1);
      const after = Math.min(totalPages - 1, currentPage + 1);
      for (let i = before; i <= after; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="max-w-6xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-xl outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Estudiantes inscritos</h2>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre, apellido o correo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Tooltip title="Inscribir estudiante">
          <IconButton
            onClick={() => setModalInscribirOpen(true)}
            className="text-blue-600 hover:bg-blue-100"
          >
            <PersonAdd />
          </IconButton>
        </Tooltip>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Imagen</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Apellido</th>
              <th className="p-3 text-left">Correo</th>
              <th className="p-3 text-left">Accesos</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.last_name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.totalAccesos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2 mt-6">
        <IconButton disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
          <FirstPage />
        </IconButton>
        <IconButton disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
          <NavigateBefore />
        </IconButton>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2 text-gray-500">...</span>
          ) : (
            <button
              key={page}
              className={`px-3 py-1 rounded-md ${
                page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          )
        )}

        <IconButton
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          <NavigateNext />
        </IconButton>
        <IconButton
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
        >
          <LastPage />
        </IconButton>
      </div>

      {modalInscribirOpen && (
        <InscribirEstudianteDiplomatura
          isOpen={modalInscribirOpen}
          onClose={() => {
            setModalInscribirOpen(false);
            fetchEstudiantes(); // Refrescar al cerrar
          }}
        />
      )}
    </Modal>
  );
}