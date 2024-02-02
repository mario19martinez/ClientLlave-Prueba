// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers as fetchUsersAction } from "../../../Redux/features/AdminUsers/AdminUsersSlices";
import { addStudentToCourse } from "../../../Redux/features/UsersCourses/UsersCursesSlices";

export default function UserAndCursos() {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.adminUsers.users);
  const isLoading = useSelector((state) => state.adminUsers.isLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);

  const storedIdCurso = localStorage.getItem("idCurso");
  console.log("Este es el id del curso: ", storedIdCurso);

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setUserNotFound(false);
  };

  const handleRegistrarseClick = async (user, storedIdCurso) => {
    try {
      console.log("Intentando registrarse al curso...");
      console.log("userData:", user);

      console.log("Id de usuario: ", user.sub, "Id de curso: ", storedIdCurso);

      if (user && user.sub) {
        const response = await dispatch(
          addStudentToCourse({
            userId: user.sub,
            cursoId: storedIdCurso,
          })
        );

        console.log("Respuesta del servidor:", response);

        if (response.payload && response.payload.message) {
          console.log("Estudiante agregado con éxito al curso");
          alert("Curso agregado con éxito para " + user.name);
        } else {
          console.log(
            "Error al agregar estudiante al curso:",
            response.payload.error
          );
          alert(
            "Error al agregar estudiante al curso: " + response.payload.error
          );
        }
      } else {
        console.log("Datos de usuario no válidos");
      }
    } catch (error) {
      console.error("Error al agregar estudiante al curso:", error);
      alert("Error al agregar estudiante al curso: " + error.message);
    }
  };

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
    <div>
      <Link to={`/admin/curso/${storedIdCurso}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 translate-y-4 translate-x-8 rounded transition duration-300 ease-in-out">
          Atrás
        </button>
      </Link>
      <div className="absolute top-0 left-0 w-auto translate-y-40 translate-x-72">
        <h1 className="text-2xl font-gabarito mb-4 text-gray-700">
          Agregar estudiantes al curso
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
                <th className="border p-2">Asignar</th>
              </tr>
            </thead>

            <tbody>
              {usersState
                .filter(
                  (user) =>
                    user.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    user.last_name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <tr key={user.identificacion} className="text-center">
                    <td className="border p-2">{user.name}</td>
                    <td className="border p-2">{user.last_name}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{user.pais}</td>
                    <td className="border p-2">{user.telefono}</td>
                    <td className="border p-2">
                      <button
                        onClick={() =>
                          handleRegistrarseClick(user, storedIdCurso)
                        }
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                      >
                        Agregar al curso
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 inline-block ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
