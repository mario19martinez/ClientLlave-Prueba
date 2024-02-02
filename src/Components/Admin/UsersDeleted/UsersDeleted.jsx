import { useEffect, useState } from "react";
import axios from "axios";

function UsersDeleted() {
  const [usersDeleted, setUsersDeleted] = useState([]);


  const handleRestoreUser = async(identificacion) => {
    try {
        const response = await axios.put(`/restore/${identificacion}`);
        if (response.status === 200) {
            // Actualiza la lista de usuarios eliminados despues de restaurar el usuario
            const updatedUsers = usersDeleted.filter(
                (user) => user.identificacion !== identificacion
            );
            setUsersDeleted(updatedUsers);
        }else{
            console.error("Error restoring user:", response.data.message);
        }
    }catch (error) {
        console.error("Error restoring user:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/eliminados");
        setUsersDeleted(response.data);
      } catch (error) {
        console.error("Error fetching eliminated users:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="absolute top-0 left-0 mt-28 ml-96 p-4">
        <h1 className="text-2xl font-gabarito mb-4 text-gray-700">Usuarios Eliminados</h1>
        <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
            <thead>
                <tr className="text-gray-700">
                    <th className="py- px-8 border-2 border-blue-600">ID</th>
                    <th className="py-2 px-8 border-2 border-blue-600">Nombre</th>
                    <th className="py-2 px-8 border-2 border-blue-600">Apellido</th>
                    <th className="py-2 px-8 border-2 border-blue-600">Correo</th>
                    <th className="py-2 px-8 border-2 border-blue-600">Restaurar</th>
                </tr>
            </thead>
            <tbody>
                {usersDeleted.map((user) => (
                    <tr key={user.identificacion} className="text-center">
                        <td className="py-2 px-8 border">{user.identificacion}</td>
                        <td className="py-2 px-8 border">{user.name}</td>
                        <td className="py-2 px-8 border">{user.last_name}</td>
                        <td className="py-2 px-8 border">{user.correo}</td>
                        <td className="py-2 px-8 border">
                            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleRestoreUser(user.identificacion)}>
                                Restaurar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default UsersDeleted;
