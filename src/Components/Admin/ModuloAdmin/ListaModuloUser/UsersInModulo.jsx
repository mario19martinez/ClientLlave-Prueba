import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

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
      const updatedUsers = users.filter((user) => user.sub !== userSub);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error al eliminar usuario del módulo:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div>
        <p>Cargando Usuarios...</p>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
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

export default UsersInModulo;
