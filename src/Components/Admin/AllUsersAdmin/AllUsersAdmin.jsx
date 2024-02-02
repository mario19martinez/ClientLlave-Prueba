// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import Modal from "react-modal";
import RegistrationModal from './RegistroUsuario';
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers as fetchUsersAction,
  banUser as banUserAction,
  deleteUser as deleteUserAction,
} from "../../../Redux/features/AdminUsers/AdminUsersSlices";

function AllUsersAdmin() {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.adminUsers.users);
  const isLoading = useSelector((state) => state.adminUsers.isLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

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
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");

    if (confirmDelete) {
      await dispatch(deleteUserAction(id));
      window.location.reload();
    }
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setUserNotFound(false);
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
      <h1 className="text-2xl font-gabarito mb-4 text-gray-700">Usuarios</h1>
      <button
        onClick={openRegistrationModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4"
      >
        Agregar usuario
      </button>
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
              {/*<th className="border p-2 px-8">ID</th>*/}
              <th className="border p-2 px-4">Nombre</th>
              <th className="border p-2 px-6">Apellido</th>
              <th className="border p-2 px-12">Correo</th>
              <th className="border p-2 px-8">País</th>
              <th className="border p-2 px-8">Teléfono</th>
              <th className="border p-2">Detalles</th>
              <th className="border p-2">Banear</th>
              <th className="border p-2">Eliminar</th>
            </tr>
          </thead>

          <tbody>
            {usersState
              .filter((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <tr key={user.identificacion} className="text-center">
                  {/*<td className="border p-2">{user.identificacion}</td>*/}
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.last_name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.pais}</td>
                  <td className="border p-2">{user.telefono}</td>
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
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-blue-600 hover:text-blue-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <p className="text-center text-lg font-semibold mb-4">Detalles del usuario</p>
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
    </div>
  );
}

export default AllUsersAdmin;