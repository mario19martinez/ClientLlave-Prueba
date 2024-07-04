import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

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
      const updatedUsers = users.filter(user => user.sub !== userSub);
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
    <div className="container border-solid border-2 border-sky-500 mt-8">
      <h4 className="text-2xl font-semibold mb-4 text-gray-800">Usuarios del Módulo</h4>
      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.sub} className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-lg font-semibold text-gray-700">
                  {`${user.name} ${user.last_name}`}
                </h5>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">{user.telefono}</p>
                <p className="text-sm text-gray-500">{user.pais}</p>
              </div>
              <button
                onClick={() => handleDeleteUser(user.sub)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersInModulo;
