import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import axios from "axios";

function UsersDeleted() {
  const [usersDeleted, setUsersDeleted] = useState([]);

  const navigate = useNavigate();


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
        <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => navigate('/admin')}
      >
        <KeyboardBackspaceIcon />
      </button>
        <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border-2 border-gray-300">
            <thead>
                <tr className="bg-blue-600 text-white">
                    {/* <th className="py- px-8 border-2 border-blue-600">ID</th> */}
                    <th className="px-8 border-2 p-2">Nombre</th>
                    <th className="px-10 border-2 p-2">Apellido</th>
                    <th className="px-24 border-2 p-2">Correo</th>
                    <th className="border-2 p-2">Restaurar</th>
                </tr>
            </thead>
            <tbody>
                {usersDeleted.map((user) => (
                    <tr key={user.identificacion} className="text-center">
                        {/* <td className="py-2 px-8 border">{user.identificacion}</td> */}
                        <td className="p-2 border">{user.name}</td>
                        <td className="p-2 border">{user.last_name}</td>
                        <td className="p-2 border">{user.email}</td>
                        <td className="py-2 px-8 border">
                            <button className="text-green-500 font-bold"
                            onClick={() => handleRestoreUser(user.identificacion)}>
                                <RestoreFromTrashIcon fontSize="large" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {usersDeleted.length === 0 && (
          <p className="mt-4 text-center text-gray-500">
            No hay usuarios eliminados.
          </p>
        )}
        </div>
    </div>
  )
}

export default UsersDeleted;
