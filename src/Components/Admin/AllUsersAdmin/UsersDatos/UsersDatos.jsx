import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import UserDatosDetail from "./UserDatosDetail";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { format } from "date-fns";

function UsersDatos() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filterDate, setFilterDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/datos");
        const sortedUsers = response.data.sort(
          (a, b) => new Date(b.registeredAt) - new Date(a.registeredAt)
        );
        setUsers(sortedUsers);
        setUserCount(sortedUsers.length);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        setError("No se pudo obtener los datos de usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserDetail = (id) => {
    setSelectedUser(id);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDateFilterChange = (e) => {
    setFilterDate(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter((user) => {
    if (!filterDate) return true;
    return user.registeredAt.includes(filterDate);
  });

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="px-10 py-5">
      <button
        onClick={handleGoBack}
        className="bg-blue-500 text-white w-20 h-10 mb-8 font-semibold py-1 px-4 rounded hover:bg-gray-400 transition-transform ease-in-out duration-300 hover:translate-y-1"
      >
        <KeyboardBackspaceIcon fontSize="large" />
      </button>
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Datos</h1>
      <div className="absolute top-0 right-0 mr-10 mt-10 translate-y-16">
        <p className="font-gabarito text-gray-600">Total de usuarios: {userCount}</p>
      </div>
      <div className="mb-4">
        <input
          type="date"
          value={filterDate}
          onChange={handleDateFilterChange}
          className="border rounded p-2"
          placeholder="Filtrar por fecha de registro"
        />
      </div>
      <div className="overflow-hidden border border-gray-300 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-200 border-b border-gray-300">
            <tr className="text-xs text-gray-700 uppercase">
              <th className="py-3 px-6 text-left">Usuario</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">WhatsApp</th>
              <th className="py-3 px-6 text-left">País</th>
              <th className="py-3 px-6 text-left">Fecha de Registro</th>
              <th className="py-3 px-6 text-left">Acción</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-mono divide-y divide-gray-200">
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center">
                  No hay usuarios para mostrar.
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{`${user.name} ${user.last_name}`}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.whatsApp}</td>
                  <td className="py-3 px-6 text-left">{user.pais}</td>
                  <td className="py-3 px-6 text-left">
                    {format(new Date(user.registeredAt), "dd/MM/yyyy")}
                  </td>
                  <td className="py-3 px-6 text-left">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleUserDetail(user.id)}
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center py-3">
        <button
          onClick={() => paginate(1)}
          className={`${
            currentPage === 1 ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded`}
          disabled={currentPage === 1}
        >
          Primera
        </button>
        <div>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            (pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 5 && pageNumber <= currentPage + 4)) && (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`${
                  currentPage === pageNumber
                    ? "bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-2 px-4 rounded mx-1`}
              >
                {pageNumber}
              </button>
            )
          ))}
        </div>
        <button
          onClick={() => paginate(totalPages)}
          className={`${
            currentPage === totalPages ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded`}
          disabled={currentPage === totalPages}
        >
          Última
        </button>
      </div>
      <Modal
        isOpen={selectedUser !== null}
        onRequestClose={closeModal}
        contentLabel="Detalles del Usuario"
        className="flex justify-center items-center w-5/6 h-full"
        overlayClassName="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-200 hover:text-gray-900"
        >
          <CancelIcon fontSize="large" />
        </button>
        {selectedUser && <UserDatosDetail id={selectedUser} />}
      </Modal>
    </div>
  );
}

export default UsersDatos;