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
import UserActivity from "./UserActivity";

function UsersGrupo({ nivelId, grupoId }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activityModalIsOpen, setActivityModalIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  if (loading) {
    return <div>Cargando Usuarios...</div>;
  }

  return (
    <div className="overflow-x-auto translate-y-4 w-3/4">
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
      {usuarios.length === 0 ? (
        <div className="text-center mt-4 text-gray-600">
          Aún no hay usuarios agregados al grupo.
        </div>
      ) : (
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr className="text-left bg-blue-200 text-gray-800">
              <th className="py-2 px-3 font-semibold">Nombre</th>
              <th className="py-2 px-3 font-semibold">Apellido</th>
              <th className="py-2 px-3 font-semibold">Email</th>
              <th className="py-2 px-3 font-semibold">Teléfono</th>
              <th className="py-2 px-3 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr
                key={index}
                className={
                  (index % 2 === 0 ? "bg-gray-100 " : "bg-white ") + "text-left"
                }
              >
                <td className="py-2 px-3 font-mono">{usuario.name}</td>
                <td className="py-2 px-3 font-mono">{usuario.last_name}</td>
                <td className="py-2 px-3 font-mono">{usuario.email}</td>
                <td className="py-2 px-3 font-mono">{usuario.telefono}</td>
                <td className="py-2 px-3 font-mono ">
                  <Tooltip
                    title="Eliminar del Grupo"
                    arrow
                    placement="top"
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
                      onClick={() =>
                        handleDeleteUser(usuario.sub, usuario.name)
                      }
                      className="text-red-500 hover:bg-red-600 hover:text-white"
                    >
                      <DeleteIcon fontSize="large" />
                    </button>
                  </Tooltip>
                  <Tooltip
                    title="Ver Registro"
                    arrow
                    placement="top"
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
                      onClick={() => openActivityModal(usuario.sub)}
                      className="text-blue-500 hover:bg-blue-600 hover:text-white"
                    >
                      <PreviewIcon fontSize="large" />
                    </button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

UsersGrupo.propTypes = {
  nivelId: PropTypes.string.isRequired,
  grupoId: PropTypes.string.isRequired,
};

export default UsersGrupo;
