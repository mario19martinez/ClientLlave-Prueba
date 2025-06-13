import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { IconButton, Tooltip } from "@mui/material";
import {
  Close,
  FirstPage,
  LastPage,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

Modal.setAppElement("#root");

export default function InscribirEstudianteDiplomatura({ isOpen, onClose }) {
  const { diplomaturaId } = useParams();
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [agregados, setAgregados] = useState(new Set());

  const USERS_PER_PAGE = 6;

  useEffect(() => {
    const fetchUsersYInscritos = async () => {
      try {
        const [allUsersRes, inscritosRes] = await Promise.all([
          axios.get("/user"),
          axios.get(`/diplomatura/${diplomaturaId}/usuarios`),
        ]);

        const allUsers = allUsersRes.data;
        const inscritos = inscritosRes.data.users || [];

        const inscritosSubSet = new Set(inscritos.map((u) => u.sub));

        setUsers(allUsers);
        setFiltered(allUsers);
        setAgregados(inscritosSubSet);
      } catch (error) {
        console.error("Error al obtener usuarios o inscritos:", error);
        toast.error("No se pudieron cargar los usuarios o estudiantes ya inscritos.");
      }
    };

    if (isOpen) {
      fetchUsersYInscritos();
    }
  }, [isOpen, diplomaturaId]);

  useEffect(() => {
    const term = search.toLowerCase();
    const result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.last_name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    setFiltered(result);
    setCurrentPage(1);
  }, [search, users]);

  const totalPages = Math.ceil(filtered.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = filtered.slice(startIndex, startIndex + USERS_PER_PAGE);

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

  const handleAgregarUsuario = async (user) => {
    try {
      const { data } = await axios.post(
        `/diplomatura/${diplomaturaId}/agregar`,
        { userSub: user.sub }
      );
      toast.success(data.message || "Usuario inscrito correctamente");
      setAgregados((prev) => new Set(prev).add(user.sub));
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      toast.error(
        error.response?.data?.message ||
        "No se pudo inscribir al usuario en la diplomatura"
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-xl outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Lista de Usuarios</h2>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre, apellido o correo"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Imagen</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Apellido</th>
              <th className="p-3 text-left">Correo</th>
              <th className="p-3 text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => {
              const yaAgregado = agregados.has(user.sub);
              return (
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
                  <td className="p-3">
                    {yaAgregado ? (
                      <Tooltip title="Ya inscrito">
                        <CheckCircleIcon className="text-green-500" />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Inscribir a diplomatura">
                        <IconButton
                          onClick={() => handleAgregarUsuario(user)}
                          className="text-green-600 hover:bg-green-100"
                        >
                          <PersonAddIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </td>
                </tr>
              );
            })}
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
    </Modal>
  );
}