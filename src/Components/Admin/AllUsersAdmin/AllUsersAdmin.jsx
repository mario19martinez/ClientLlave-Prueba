// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
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
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

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
  const usersPerPage = 10;

  const navigate = useNavigate();

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

  const handleOpenModal = (user) => {
    setIsModalOpen(true);
    setSelectedUser(user);
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
  for (let i = 1; i <= Math.ceil(filteredAndSortedUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-gabarito mb-4 text-gray-700">Usuarios</h1>
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4 items-center">
          <button
            onClick={openRegistrationModal}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Agregar usuario
          </button>
          <button
            onClick={() => navigate("/admin/usersDeleted")}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center"
          >
            <DeleteIcon className="mr-2" />
            Usuarios eliminados
          </button>
          <button 
          onClick={() => navigate("/admin/AnalyticsUser")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            <BarChartIcon className="text-green-400" />
          </button>
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
        <button
          onClick={resetFilters}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg ml-2"
        >
          <RotateLeftIcon />
        </button>
      </div>
      {userNotFound ? (
        <p className="text-red-500">El usuario no existe.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th
                className="border p-2 px-4 cursor-pointer"
                onClick={() => setSortAsc(!sortAsc)}
              >
                Nombre {sortAsc ? "▼" : "▲"}
              </th>
              <th className="border p-2 px-6">Apellido</th>
              <th className="border p-2 px-12">Correo</th>
              <th className="border p-2 px-8">País</th>
              <th className="border p-2 px-8">Teléfono</th>
              <th className="border p-2 px-8">Fecha de registro</th>
              <th className="border p-2">Detalles</th>
              <th className="border p-2">Banear</th>
              <th className="border p-2">Eliminar</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.identificacion} className="text-center">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.last_name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.pais}</td>
                <td className="border p-2">{user.telefono}</td>
                <td className="border p-2">
                  {user.registeredAt
                    ? new Date(user.registeredAt).toLocaleDateString()
                    : "Sin fecha"}
                </td>
                <td className="translate-x-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleOpenModal(user)}
                  >
                    <VisibilityIcon fontSize="large" />
                  </button>
                </td>
                <td className="translate-x-2">
                  {user.banned ? (
                    <button
                      className="text-red-700 font-sans py-2 px-4 mr-2 rounded"
                      onClick={() => bandUser(user)}
                    >
                      <PersonOffIcon fontSize="large" />
                    </button>
                  ) : (
                    <button
                      className="text-blue-700 font-sans py-2 px-4 mr-2 rounded"
                      onClick={() => bandUser(user)}
                    >
                      <PersonIcon fontSize="large" />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="text-gray-700 font-sans py-2 px-4 rounded"
                    onClick={() => deleteUser(user.identificacion)}
                  >
                    <DeleteIcon fontSize="large" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-blue-600 hover:text-blue-700 focus:outline-none"
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
            <p className="text-center text-lg font-semibold mb-4">
              Detalles del usuario
            </p>
            <div>
              <p>Nombre: {selectedUser.name}</p>
              <p>Apellido: {selectedUser.last_name}</p>
              <p>Correo: {selectedUser.email}</p>
              <p>ID: {selectedUser.identificacion}</p>
              <p>País: {selectedUser.pais}</p>
              <p>Teléfono: {selectedUser.telefono}</p>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <nav className="mt-4" aria-label="Pagination">
        <ul className="flex justify-center">
          <li>
            <button
              onClick={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1 ? 'bg-gray-200 text-gray-600' : 'bg-white hover:bg-gray-50'
              } px-3 py-1 border border-gray-300 rounded-l-md font-medium text-sm focus:outline-none`}
            >
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {pageNumbers.slice(Math.max(currentPage - 5, 0), currentPage + 5).map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => paginate(pageNumber)}
                className={`${
                  pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'
                } px-3 py-1 border border-gray-300 font-medium text-sm focus:outline-none`}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => setCurrentPage(currentPage === pageNumbers.length ? pageNumbers.length : currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
              className={`${
                currentPage === pageNumbers.length ? 'bg-gray-200 text-gray-600' : 'bg-white hover:bg-gray-50'
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