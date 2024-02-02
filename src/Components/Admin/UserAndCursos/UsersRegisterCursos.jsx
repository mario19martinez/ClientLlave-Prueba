// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers as fetchUsersAction } from "../../../Redux/features/AdminUsers/AdminUsersSlices";
import axios from "axios";

export default function UsersRegisterCursos() {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.adminUsers.users);
  const isLoading = useSelector((state) => state.adminUsers.isLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [usuariosInscritos, setUsuariosInscritos] = useState([]);

  const storedIdCurso = localStorage.getItem("idCurso");
  console.log("Este es el id del curso: ", storedIdCurso);

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  useEffect(() => {
    const fetchUsuariosInscritos = async () => {
      try {
        if (storedIdCurso) {
          const response = await axios.get(`/usuariosPorCurso/${storedIdCurso}`);
          const { data } = response;

          setUsuariosInscritos(data.usuariosEnCurso);
        }
      } catch (error) {
        console.error("Error al obtener usuarios inscritos:", error);
      }
    };

    fetchUsuariosInscritos();
  }, [storedIdCurso]);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setUserNotFound(false);
  };

  console.log("Usuarios inscritos", usuariosInscritos);

  const filteredUsers = usersState.filter((user) =>
    usuariosInscritos.includes(user.sub)
  );

  const filteredUsersRows = filteredUsers.map((user) => (
    <tr key={user.identificacion} className="text-center">
      <td className="border p-2">{user.name}</td>
      <td className="border p-2">{user.last_name}</td>
      <td className="border p-2">{user.email}</td>
      <td className="border p-2">{user.pais}</td>
      <td className="border p-2">{user.telefono}</td>
    </tr>
  ));
  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-center text-lg font-semibold mb-4">Cargando ...</p>
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 w-auto translate-y-40 translate-x-72">
      <h1 className="text-2xl font-gabarito mb-4 text-gray-700">
        Estudiantes Inscritos
      </h1>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="border-2 p-2 mb-4 focus:border-blue-500 focus:outline-none rounded-lg w-full"
      />
      {userNotFound ? (
        <p className="text-red-500">El usuario no existe.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border p-2 px-4">Nombre</th>
              <th className="border p-2 px-6">Apellido</th>
              <th className="border p-2 px-12">Correo</th>
              <th className="border p-2 px-8">País</th>
              <th className="border p-2 px-8">Teléfono</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsersRows.length > 0 ? (
              filteredUsersRows
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No se encontraron usuarios inscritos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
