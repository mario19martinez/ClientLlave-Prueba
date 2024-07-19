import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import PropTypes from "prop-types";
import PreviewIcon from "@mui/icons-material/Preview";
import Tooltip from "@mui/material/Tooltip";
import UserActivity from "../Admin/NivelAdmin/UserGrupo/UserActivity";
import Pagination from "@mui/material/Pagination";
import { TextField } from "@mui/material";

function UsersGrupoMonitor({ nivelId, grupoId }) {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activityModalIsOpen, setActivityModalIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(
          `/nivel/${nivelId}/grupos/${grupoId}/usuarios`
        );
        setUsuarios(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    };

    fetchUsuarios();
  }, [nivelId, grupoId]);

  useEffect(() => {
    setFilteredUsuarios(usuarios);
  }, [usuarios]);

  useEffect(() => {
    filterUsuarios();
  }, [searchTerm]);

  const filterUsuarios = () => {
    let filteredData = usuarios;

    if (searchTerm.trim() !== "") {
      filteredData = filteredData.filter(
        (usuario) =>
          usuario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.telefono.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsuarios(filteredData);
  };

  const handleDeleteUser = async (userSub, userName) => {
    try {
      const confirmDelete = window.confirm(
        `¿Estás seguro de eliminar al usuario ${userName} del grupo?`
      );
      if (confirmDelete) {
        await axios.delete(`/usuario/${userSub}/grupo/${grupoId}`);
        const updatedUsers = usuarios.filter(
          (usuario) => usuario.sub !== userSub
        );
        setUsuarios(updatedUsers);
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const openActivityModal = (userId) => {
    setSelectedUserId(userId);
    setActivityModalIsOpen(true);
  };

  const closeActivityModal = () => {
    setActivityModalIsOpen(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsuarios.slice(startIndex, endIndex);

  if (loading) {
    return <div>Cargando Usuarios...</div>;
  }

  return (
    <div className="overflow-x-auto translate-y-4 w-full">

      <Modal
        isOpen={activityModalIsOpen}
        onRequestClose={closeActivityModal}
        className="flex justify-center items-center"
        overlayClassName="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75"
      >
        {selectedUserId && (
          <UserActivity
            userSub={selectedUserId}
            grupoId={grupoId}
            closeModal={closeActivityModal}
          />
        )}
      </Modal>

      <div className="flex space-x-4 mb-4">
        <TextField
          label="Buscar por Nombre, Apellido, Correo o Teléfono"
          variant="outlined"
          className="flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuario
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((usuario) => (
            <tr key={usuario.sub}>
              <td className="py-3 px-4 border-b border-gray-200 text-sm">
                {usuario.name} {usuario.last_name}
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-sm">
                {usuario.telefono}
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-sm">
                <Tooltip title="Ver Actividad" arrow>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => openActivityModal(usuario.sub)}
                  >
                    <PreviewIcon />
                  </button>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        count={Math.ceil(filteredUsuarios.length / usersPerPage)}
        page={page}
        onChange={handlePageChange}
        className="my-4"
      />
    </div>
  );
}

UsersGrupoMonitor.propTypes = {
  nivelId: PropTypes.string.isRequired,
  grupoId: PropTypes.string.isRequired,
};

export default UsersGrupoMonitor;