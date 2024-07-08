import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import PropTypes from "prop-types";
import AddUserGrupo from "./AddUserGrupo";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import Tooltip from "@mui/material/Tooltip";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UserActivity from "./UserActivity";
import Pagination from "@mui/material/Pagination";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { format } from "date-fns";

function UsersGrupo({ nivelId, grupoId }) {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activityModalIsOpen, setActivityModalIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all"); // "all", "today", "thisWeek", "thisMonth", "custom"
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
  }, [searchTerm, dateFilter, startDate, endDate]);

  const filterUsuarios = () => {
    let filteredData = usuarios;

    // Filter by search term
    if (searchTerm.trim() !== "") {
      filteredData = filteredData.filter(
        (usuario) =>
          usuario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.telefono.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    if (dateFilter === "today") {
      filteredData = filteredData.filter((usuario) => {
        const createdAt = new Date(usuario.grupos[0]?.usergrupo?.createdAt);
        const today = new Date();
        return (
          createdAt.getDate() === today.getDate() &&
          createdAt.getMonth() === today.getMonth() &&
          createdAt.getFullYear() === today.getFullYear()
        );
      });
    } else if (dateFilter === "thisWeek") {
      filteredData = filteredData.filter((usuario) => {
        const createdAt = new Date(usuario.grupos[0]?.usergrupo?.createdAt);
        const today = new Date();
        const startOfWeek = new Date(
          today.setDate(today.getDate() - today.getDay())
        );
        return createdAt >= startOfWeek;
      });
    } else if (dateFilter === "thisMonth") {
      filteredData = filteredData.filter((usuario) => {
        const createdAt = new Date(usuario.grupos[0]?.usergrupo?.createdAt);
        const today = new Date();
        return (
          createdAt.getMonth() === today.getMonth() &&
          createdAt.getFullYear() === today.getFullYear()
        );
      });
    } else if (dateFilter === "custom" && startDate && endDate) {
      filteredData = filteredData.filter((usuario) => {
        const createdAt = new Date(usuario.grupos[0]?.usergrupo?.createdAt);
        return createdAt >= startDate && createdAt <= endDate;
      });
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

  const toggleHasPaid = async (userSub, grupoId, hasPaid) => {
    const confirmChange = window.confirm(
      `¿Estás seguro de cambiar el estado de Pago?`
    );
    if (confirmChange) {
      try {
        await axios.put(`/usuario/${userSub}/grupo/${grupoId}/hasPaid`, {
          hasPaid,
        });
        const updatedUsers = usuarios.map((usuario) => {
          if (usuario.sub === userSub) {
            return {
              ...usuario,
              grupos: usuario.grupos.map((grupo) => {
                if (grupo.id === grupoId) {
                  return {
                    ...grupo,
                    usergrupo: {
                      ...grupo.usergrupo,
                      hasPaid,
                    },
                  };
                }
                return grupo;
              }),
            };
          }
          return usuario;
        });
        setUsuarios(updatedUsers);
      } catch (error) {
        console.error("Error al actualizar hasPaid:", error);
      }
    }
  };

  const closeModalAndReload = async () => {
    setModalIsOpen(false);
    try {
      const response = await axios.get(
        `/nivel/${nivelId}/grupos/${grupoId}/usuarios`
      );
      setUsuarios(response.data);
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error al obtener los grupos:", error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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

  const handleDateFilterChange = (event) => {
    const value = event.target.value;
    setDateFilter(value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const clearDateFilter = () => {
    setDateFilter("all");
    setStartDate(null);
    setEndDate(null);
  };

  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsuarios.slice(startIndex, endIndex);

  if (loading) {
    return <div>Cargando Usuarios...</div>;
  }

  return (
    <div className="overflow-x-auto translate-y-4 w-full">
      <Tooltip
        title="Agregar Usuario"
        arrow
        placement="right"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -6],
                },
              },
            ],
          },
        }}
      >
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-4 font-bold"
          onClick={openModal}
        >
          <PersonAddIcon />
          Usuario
        </button>
      </Tooltip>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="flex justify-center items-center w-1/2 h-full"
        overlayClassName="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75"
      >
        <Tooltip
          title="Haz clic para cerrar"
          arrow
          placement="left"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -6],
                  },
                },
              ],
            },
          }}
        >
          <button
            className="absolute top-2 right-2 text-gray-100 hover:text-gray-900"
            onClick={closeModal}
          >
            <CancelIcon fontSize="large" />
          </button>
        </Tooltip>
        <AddUserGrupo
          nivelId={nivelId}
          grupoId={grupoId}
          closeModalAndReload={closeModalAndReload}
        />
      </Modal>
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

        <FormControl variant="outlined" className="flex-1">
          <InputLabel>Filtrar por Fecha de Registro</InputLabel>
          <Select
            value={dateFilter}
            onChange={handleDateFilterChange}
            label="Filtrar por Fecha de Registro"
          >
            <MenuItem value="all">Todo</MenuItem>
            <MenuItem value="today">Hoy</MenuItem>
            <MenuItem value="thisWeek">Esta Semana</MenuItem>
            <MenuItem value="thisMonth">Este Mes</MenuItem>
            <MenuItem value="custom">Personalizado</MenuItem>
          </Select>
        </FormControl>

        {dateFilter === "custom" && (
          <>
            <TextField
              label="Fecha de Inicio"
              type="date"
              variant="outlined"
              className="flex-1"
              InputLabelProps={{
                shrink: true,
              }}
              value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
              onChange={(e) => handleStartDateChange(new Date(e.target.value))}
            />

            <TextField
              label="Fecha de Fin"
              type="date"
              variant="outlined"
              className="flex-1"
              InputLabelProps={{
                shrink: true,
              }}
              value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
              onChange={(e) => handleEndDateChange(new Date(e.target.value))}
            />

            <button
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md ml-4"
              onClick={clearDateFilter}
            >
              Limpiar
            </button>
          </>
        )}
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuario
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Correo Electrónico
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Teléfono
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Inscripcion
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
                {usuario.email}
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-sm">
                {usuario.telefono}
              </td>
              <td className="py-3 px-4 border-b border-gray-200 text-sm">
                {usuario?.grupos[0]?.usergrupo?.createdAt
                  ? new Date(
                      usuario.grupos[0].usergrupo.createdAt
                    ).toLocaleDateString()
                  : "Fecha no disponible"}
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
                <Tooltip title="Eliminar Usuario" arrow>
                  <button
                    className="text-red-500 hover:text-red-700 mr-2"
                    onClick={() => handleDeleteUser(usuario.sub, usuario.name)}
                  >
                    <DeleteIcon />
                  </button>
                </Tooltip>
                <Tooltip title="Marcar como Pagado/No Pagado" arrow>
                  <button
                    className={`${
                      usuario.grupos[0]?.usergrupo?.hasPaid
                        ? "text-green-500 hover:text-green-700"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() =>
                      toggleHasPaid(
                        usuario.sub,
                        usuario.grupos[0]?.id,
                        !usuario.grupos[0]?.usergrupo?.hasPaid
                      )
                    }
                  >
                    {usuario.grupos[0]?.usergrupo?.hasPaid ? (
                      <CheckCircleIcon />
                    ) : (
                      <CancelIcon />
                    )}
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

UsersGrupo.propTypes = {
  nivelId: PropTypes.string.isRequired,
  grupoId: PropTypes.string.isRequired,
};

export default UsersGrupo;
