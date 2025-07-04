import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import RegistrationModal from "./RegistroUsuario";
import Paises from "../../FormResgistro/Paises.json";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers as fetchUsersAction,
  banUser as banUserAction,
  deleteUser as deleteUserAction,
} from "../../../Redux/features/AdminUsers/AdminUsersSlices";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import UsersDetails from "./UsersDatos/UserDetails";
import axios from "axios";

function AllUsersAdmin() {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.adminUsers.users);
  const isLoading = useSelector((state) => state.adminUsers.isLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const [cursos, setCursos] = useState([]);
  const [selectedCursoId, setSelectedCursoId] = useState("");
  const [usuariosInscritos, setUsuariosInscritos] = useState([]);
  const [filtroSinCurso] = useState(false);
  const usersPerPage = 10;

  const navigate = useNavigate();

  const getUserDetails = async (email) => {
    try {
      const response = await axios.get(`/user/email/${email}`);
      if (!response.data) {
        throw new Error("Usuario no encontrado");
      }
      setSelectedUser(response.data);
    } catch (error) {
      console.error(
        "Error al obtener los detalles del usuario:",
        error.message
      );
      setUserNotFound(true);
    }
  };

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  const bandUser = async (user) => {
    const confirmMessage = `¿Estás seguro de que quieres ${
      user.banned ? "desbanear" : "banear"
    } a ${user.name}?`;

    const userConfirmed = window.confirm(confirmMessage);
    if (userConfirmed) {
      const identificacion = user.sub;
      await dispatch(banUserAction(identificacion));
      window.location.reload();
    }
  };

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get("/cursos");
        setCursos(response.data);
      } catch (error) {
        console.error("Error al obtener los cursos:", error.message);
      }
    };

    fetchCursos();
  }, []);

  const handleCursoChange = async (cursoId) => {
    setSelectedCursoId(cursoId);
    if (cursoId) {
      try {
        const response = await axios.get(`/usuariosPorCurso/${cursoId}`);
        setUsuariosInscritos(response.data.usuariosEnCurso);
      } catch (error) {
        console.error("Error al obtener usuarios inscritos:", error.message);
      }
    } else {
      setUsuariosInscritos([]);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este usuario?"
    );

    if (confirmDelete) {
      await dispatch(deleteUserAction(id));
      window.location.reload();
    }
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1);
    setUserNotFound(false);
  };
  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value);
  };

  const handleStartDateFilterChange = (event) => {
    setStartDateFilter(event.target.value);
  };

  const handleEndDateFilterChange = (event) => {
    setEndDateFilter(event.target.value);
  };

  const handleOpenModal = async (user) => {
    setIsModalOpen(true);
    setSelectedUser(user);
    await getUserDetails(user.email);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const openRegistrationModal = () => {
    setShowRegistrationModal(true);
  };

  const closeRegistrationModal = () => {
    setShowRegistrationModal(false);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCountryFilter("");
    setStartDateFilter("");
    setEndDateFilter("");
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

  // Filtrado y ordenamiento de usuarios
  const filteredAndSortedUsers = usersState
    .filter((user) => {
      if (filtroSinCurso) {
        return !usuariosInscritos.includes(user.sub);
      }
      if (selectedCursoId) {
        return usuariosInscritos.includes(user.sub);
      }
      return true;
    })
    .filter((user) => {
      const nameMatch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.pais.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.telefono.toLowerCase().includes(searchTerm.toLowerCase());
      const countryMatch =
        countryFilter === "" ||
        user.pais.toLowerCase() === countryFilter.toLowerCase();
      const startDateMatch =
        startDateFilter === "" ||
        new Date(user.registeredAt) >= new Date(startDateFilter);
      const endDateMatch =
        endDateFilter === "" ||
        new Date(user.registeredAt) <= new Date(endDateFilter);

      return nameMatch && countryMatch && startDateMatch && endDateMatch;
    })
    .sort((a, b) => {
      // Ordenar alfabéticamente
      if (sortAsc) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  // Paginación - Calcula índices de usuarios
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredAndSortedUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  // Cambia de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Array de páginas a mostrar
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredAndSortedUsers.length / usersPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Usuarios</h1>
      <div className="flex flex-col justify-between mb-4">
        <div className="flex flex-wrap space-x-4 items-center">
          <Tooltip
            title="Agregar usuario"
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
              onClick={openRegistrationModal}
              className="space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <AddIcon />
              Agregar usuario
            </button>
          </Tooltip>
          <Tooltip
            title="Usuarios eliminados"
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
              onClick={() => navigate("/admin/usersDeleted")}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
            >
              <DeleteIcon className="mr-2" />
              Eliminados
            </button>
          </Tooltip>
          <Tooltip
            title="Analíticas"
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
              onClick={() => navigate("/admin/AnalyticsUser")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center"
            >
              <BarChartIcon className="text-green-400 mr-2" />
              Analíticas
            </button>
          </Tooltip>
          <Tooltip
            title="Seguimiento De Clases"
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
              onClick={() => navigate("/admin/seguimiento")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Seguimiento
            </button>
          </Tooltip>
          <Tooltip
            title="Actividad De Niveles"
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
              onClick={() => navigate("/admin/registro-actividades")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Act Niveles
            </button>
          </Tooltip>
          <Tooltip
            title="Datos Formulario"
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
              onClick={() => navigate("/Admin/datos")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Datos Formulario
            </button>
          </Tooltip>
          <Tooltip
            title="Usuarios no inscritos"
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
              onClick={() => navigate("/admin/NoInscritos")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Usuarios no inscritos
            </button>
          </Tooltip>
          {/* <button
            onClick={() => navigate("/admin/historial-usuarios")}
            className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Historial de Usuarios
            {/* <BarChartIcon className="mr-2" /> Historial de Usuarios */}
          {/*</button> */}
        </div>
        <div className="mt-4">
          <p className="text-gray-600 text-sm">
            Usuarios registrados: {filteredAndSortedUsers.length}
          </p>
        </div>
      </div>

      <Modal
        isOpen={showRegistrationModal}
        onRequestClose={closeRegistrationModal}
        contentLabel="Registro Modal"
        className="Modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6"
        overlayClassName="Overlay fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75"
      >
        <button
          onClick={closeRegistrationModal}
          className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none rounded-full w-8 h-8 flex items-center justify-center bg-blue-500 hover:bg-blue-700 transition duration-300"
        >
          X
        </button>
        <RegistrationModal />
      </Modal>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="border-2 p-2 mr-2 focus:border-blue-500 focus:outline-none rounded-lg"
        />
        <select
          value={countryFilter}
          onChange={handleCountryFilterChange}
          className="border-2 p-2 mr-2 focus:border-blue-500 focus:outline-none rounded-lg"
        >
          <option value="">Todos los países</option>
          {Paises.paises.map((pais, index) => (
            <option key={index} value={pais.nombre}>
              {pais.nombre}
            </option>
          ))}
        </select>
        <select
          value={selectedCursoId}
          onChange={(e) => handleCursoChange(e.target.value)}
          className="border-2 p-2 mr-2 focus:border-blue-500 focus:outline-none rounded-lg"
        >
          <option value="">Todos los cursos</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={startDateFilter}
          onChange={handleStartDateFilterChange}
          className="border-2 p-2 mr-2 focus:border-blue-500 focus:outline-none rounded-lg"
        />
        <input
          type="date"
          value={endDateFilter}
          onChange={handleEndDateFilterChange}
          className="border-2 p-2 mr-2 focus:border-blue-500 focus:outline-none rounded-lg"
        />
        <Tooltip
          title="Reiniciar Filtros"
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
            onClick={resetFilters}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg ml-2"
          >
            <RotateLeftIcon />
          </button>
        </Tooltip>
      </div>
      {userNotFound ? (
        <p className="text-red-500">El usuario no existe.</p>
      ) : (
        <div className="overflow-hidden border border-gray-300 rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-200 border-b border-gray-300">
              <tr className="text-xs text-gray-700 uppercase">
                <th
                  className="border p-2 px-4 cursor-pointer"
                  onClick={() => setSortAsc(!sortAsc)}
                >
                  <span>Nombre</span>
                  <span className="ml-1">{sortAsc ? "▼" : "▲"}</span>
                </th>
                <th className="py-3 px-6 text-left">Apellido</th>
                <th className="py-3 px-6 text-left">Correo</th>
                <th className="py-3 px-6 text-left">País</th>
                <th className="py-3 px-6 text-left">Teléfono</th>
                <th className="py-3 px-6 text-left">Fecha de registro</th>
                <th className="border p-2">Detalles</th>
                <th className="border p-2">Banear</th>
                <th className="border p-2">Eliminar</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 text-sm font-mono divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr
                  key={user.identificacion}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="py-3 px-6 text-left">{user.last_name}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.pais}</td>
                  <td className="py-3 px-6 text-left">{user.telefono}</td>
                  <td className="py-3 px-6 text-left">
                    {user.registeredAt
                      ? new Date(user.registeredAt).toLocaleDateString()
                      : "Sin fecha"}
                  </td>
                  <td className="translate-x-2">
                    <Tooltip
                      title="Ver Detalles del Usuario"
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
                        className="text-blue-500 hover:underline"
                        onClick={() => handleOpenModal(user)}
                      >
                        <VisibilityIcon fontSize="large" />
                      </button>
                    </Tooltip>
                  </td>
                  <td className="translate-x-2">
                    {user.banned ? (
                      <Tooltip
                      title="Desbanear Usuario"
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
                        className="text-red-700 font-sans py-2 px-4 mr-2 rounded"
                        onClick={() => bandUser(user)}
                      >
                        <PersonOffIcon fontSize="large" />
                      </button>
                      </Tooltip>
                    ) : (
                      <Tooltip
                      title="Banear Usuario"
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
                        className="text-blue-700 font-sans py-2 px-4 mr-2 rounded"
                        onClick={() => bandUser(user)}
                      >
                        <PersonIcon fontSize="large" />
                      </button>
                      </Tooltip>
                    )}
                  </td>
                  <td>
                  <Tooltip
                      title="Eliminar Usuario"
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
                      className="text-gray-700 font-sans py-2 px-4 rounded"
                      onClick={() => deleteUser(user.identificacion)}
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
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Detalles del usuario"
          className="Modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 shadow-2xl z-50 w-11/12 max-w-2xl"
          overlayClassName="Overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <div>
            <UsersDetails identificacion={selectedUser.sub} />
          </div>
        </Modal>
      )}

      {/* Pagination */}
      <nav className="mt-4" aria-label="Pagination">
        <ul className="flex justify-center">
          <li>
            <button
              onClick={() =>
                setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)
              }
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "bg-gray-200 text-gray-600"
                  : "bg-white hover:bg-gray-50"
              } px-3 py-1 border border-gray-300 rounded-l-md font-medium text-sm focus:outline-none`}
            >
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {pageNumbers
            .slice(Math.max(currentPage - 5, 0), currentPage + 5)
            .map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => paginate(pageNumber)}
                  className={`${
                    pageNumber === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-gray-50"
                  } px-3 py-1 border border-gray-300 font-medium text-sm focus:outline-none`}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
          <li>
            <button
              onClick={() =>
                setCurrentPage(
                  currentPage === pageNumbers.length
                    ? pageNumbers.length
                    : currentPage + 1
                )
              }
              disabled={currentPage === pageNumbers.length}
              className={`${
                currentPage === pageNumbers.length
                  ? "bg-gray-200 text-gray-600"
                  : "bg-white hover:bg-gray-50"
              } px-3 py-1 border border-gray-300 rounded-r-md font-medium text-sm focus:outline-none`}
            >
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AllUsersAdmin;
