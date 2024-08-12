import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  FaChevronLeft,
  FaChevronRight,
  FaBan,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

export default function UserSinCursosYGrupo() {
  const [users, setUsers] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [allLevels, setAllLevels] = useState([]);
  const [inscribedUsers, setInscribedUsers] = useState(new Set());
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingInscribedUsers, setLoadingInscribedUsers] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, levelsResponse, usersResponse] =
          await Promise.all([
            Axios.get("/cursos"),
            Axios.get("/niveles"),
            Axios.get("/user"),
          ]);

        setAllCourses(coursesResponse.data);
        setAllLevels(levelsResponse.data);
        setUsers(usersResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchInscribedUsers = async () => {
      try {
        const inscribedUsersSet = new Set();

        const fetchInscribedInCourses = allCourses.map((course) =>
          Axios.get(`/usuariosPorCurso/${course.id}`).then((res) => {
            if (res.data && res.data.usuariosEnCurso) {
              res.data.usuariosEnCurso.forEach((userSub) =>
                inscribedUsersSet.add(userSub)
              );
            }
          })
        );

        const fetchInscribedInGroups = allLevels.map((level) =>
          Axios.get(`/niveles/${level.id}/grupos`).then((gruposResponse) =>
            Promise.all(
              gruposResponse.data.map((grupo) =>
                Axios.get(
                  `/nivel/${level.id}/grupos/${grupo.id}/usuarios`
                ).then((usuariosResponse) => {
                  if (
                    usuariosResponse.data &&
                    usuariosResponse.data.usuariosEnGrupo
                  ) {
                    usuariosResponse.data.usuariosEnGrupo.forEach((userSub) =>
                      inscribedUsersSet.add(userSub)
                    );
                  }
                })
              )
            )
          )
        );

        await Promise.all([
          ...fetchInscribedInCourses,
          ...fetchInscribedInGroups,
        ]);

        setInscribedUsers(inscribedUsersSet);
        setLoadingInscribedUsers(false);
      } catch (err) {
        console.error("Error fetching inscribed users:", err);
        setLoadingInscribedUsers(false);
      }
    };

    if (allCourses.length > 0 || allLevels.length > 0) {
      fetchInscribedUsers();
    }
  }, [allCourses, allLevels]);

  useEffect(() => {
    if (!loadingInscribedUsers) {
      setFilteredUsers(users.filter((user) => !inscribedUsers.has(user.sub)));
    }
  }, [users, inscribedUsers, loadingInscribedUsers]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const maxPageButtons = 10;

  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const roleTags = {
    admin: "bg-red-500 text-white",
    docente: "bg-blue-500 text-white",
    client: "bg-green-500 text-white",
    editor: "bg-purple-500 text-white",
    monitor: "bg-yellow-500 text-white",
  };

  if (loading || loadingInscribedUsers)
    return <p className="text-center text-gray-500">Cargando...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <div className="flex space-x-5 px-2 py-5y">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
          title="Volver"
        >
          <FaArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-700">
            Usuarios no inscritos
          </h1>
        </div>
      </div>
      <p className="mb-6 text-gray-700">
        Cantidad de usuarios no inscritos: {filteredUsers.length}
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-6 border-b font-semibold text-left">
                Usuario
              </th>
              <th className="py-3 px-6 border-b font-semibold text-left">
                Email
              </th>
              <th className="py-3 px-6 border-b font-semibold text-left">
                Teléfono
              </th>
              <th className="py-3 px-6 border-b font-semibold text-left">
                País
              </th>
              <th className="py-3 px-6 border-b font-semibold text-left">
                Rol
              </th>
              <th className="py-3 px-6 border-b font-semibold text-left">
                Baneado
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user.sub}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="py-3 px-6 border-b">{`${user.name} ${user.last_name}`}</td>
                <td className="py-3 px-6 border-b">{user.email}</td>
                <td className="py-3 px-6 border-b">{user.telefono}</td>
                <td className="py-3 px-6 border-b">{user.pais}</td>
                <td className="py-3 px-6 border-b">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      roleTags[user.rol] || "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {user.rol}
                  </span>
                </td>
                <td className="py-3 px-6 border-b">
                  {user.banned ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                      Sí <FaBan className="ml-2" />
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                      No <FaCheckCircle className="ml-2" />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-blue-500 text-white rounded-full disabled:bg-gray-400"
        >
          <FaChevronLeft />
        </button>
        {pagesToShow[0] > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              1
            </button>
            {pagesToShow[0] > 2 && <span>...</span>}
          </>
        )}
        {pagesToShow.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        {pagesToShow[pagesToShow.length - 1] < totalPages && (
          <>
            {pagesToShow[pagesToShow.length - 1] < totalPages - 1 && (
              <span>...</span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 bg-blue-500 text-white rounded-full disabled:bg-gray-400"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
