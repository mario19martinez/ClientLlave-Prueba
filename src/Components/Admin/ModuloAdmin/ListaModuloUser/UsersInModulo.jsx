import { useEffect, useState, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function UsersInModulo({ moduloId }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/modulo/${moduloId}/users`);
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [moduloId]);

  const handleDeleteUser = async (userSub) => {
    try {
      await axios.delete(`/usuario/${userSub}/${moduloId}`);
      // Actualizar la lista de usuarios después de eliminar
      setUsers((prevUsers) => prevUsers.filter((user) => user.sub !== userSub));
    } catch (error) {
      console.error("Error al eliminar usuario del módulo:", error);
      setError(error.message);
    }
  };

  const handleTogglePaidStatus = async (userSub, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await axios.put(`/usuario/${userSub}/modulo/${moduloId}/hasPaid`, {
        hasPaid: newStatus,
      });
      // Actualizar el estado del usuario localmente después de la actualización
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.sub === userSub
            ? {
                ...user,
                usermodulo: { ...user.usermodulo, hasPaid: newStatus },
              }
            : user
        )
      );
    } catch (error) {
      console.error("Error al actualizar estado de pago:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-2 text-gray-500 text-xl">Cargando Usuarios...</p>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }
 

  


  return (
    <div className="container mt-8">
      <h4 className="text-2xl font-bold mb-4 text-gray-800">
        Usuarios del Módulo
      </h4>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Correo Electrónico
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Teléfono
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                País
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Fecha de Agregado
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Pagó
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.sub}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{`${user.name} ${user.last_name}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.telefono}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.pais}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.usermodulo
                    ? new Date(user.usermodulo.createdAt).toLocaleString()
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Tooltip title="Estado de Pago" arrow placement="top">
                    <button
                      onClick={() =>
                        handleTogglePaidStatus(
                          user.sub,
                          user.usermodulo.hasPaid
                        )
                      }
                      className={`px-0 py-0 rounded-md focus:outline-none ${
                        user.usermodulo.hasPaid
                          ? "text-green-500 hover:border-solid hover:border-2 hover:border-green-500 hover:w-8 hover:h-auto"
                          : "text-red-500 hover:border-solid hover:border-2 hover:border-red-500 hover:w-8 hover:h-auto"
                      }`}
                    >
                      {user.usermodulo.hasPaid ? (
                        <CheckCircleIcon />
                      ) : (
                        <CancelIcon />
                      )}
                    </button>
                  </Tooltip>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Tooltip
                    title="Eliminar usuario"
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
                      onClick={() => handleDeleteUser(user.sub)}
                      className="px-0 py-0 text-red-500 hover:text-white rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-600"
                    >
                      <DeleteIcon fontSize="large" />
                    </button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

UsersInModulo.propTypes = {
  moduloId: PropTypes.string.isRequired,
};

export default UsersInModulo;
