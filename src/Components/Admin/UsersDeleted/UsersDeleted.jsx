import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CircularProgress from '@mui/material/CircularProgress';

function UsersDeleted() {
  const [usersDeleted, setUsersDeleted] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteSuccessDialogOpen, setDeleteSuccessDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleRestoreUser = async (identificacion) => {
    try {
      const response = await axios.put(`/restore/${identificacion}`);
      if (response.status === 200) {
        const updatedUsers = usersDeleted.filter(
          (user) => user.identificacion !== identificacion
        );
        setUsersDeleted(updatedUsers);
      } else {
        console.error("Error restoring user:", response.data.message);
      }
    } catch (error) {
      console.error("Error restoring user:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`/user/${deleteUserId}`);
      if (response.status === 200) {
        setUsersDeleted(
          usersDeleted.filter((user) => user.identificacion !== deleteUserId)
        );
        setDeleteSuccessDialogOpen(true);
      } else {
        console.error("Error deleting user:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    setConfirmationDialogOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Iniciar carga
      try {
        const response = await axios.get("/eliminados");
        setUsersDeleted(response.data);
      } catch (error) {
        console.error("Error fetching eliminated users:", error);
      }
      setLoading(false); // Finalizar carga
    };
    fetchData();
  }, []);


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersDeleted.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(usersDeleted.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-500 mt-4">Cargando Usuarios eliminados...</p>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 right-40 mt-28 ml-96 p-4">
      <Tooltip
        title="Volver a la Dashbord"
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
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded mb-4"
          onClick={() => navigate("/admin")}
        >
          <KeyboardBackspaceIcon fontSize="large" />
        </button>
      </Tooltip>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Usuarios Eliminados
      </h1>
      <h1 className="font-normal mb-4 text-gray-700">Cantidad de usuarios eliminados: {usersDeleted.length}</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border-collapse border rounded-lg border-gray-400 overflow-hidden">
          <thead className="bg-blue-200 border-b border-gray-300">
            <tr className=" text-xs text-gray-700 uppercase">
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Apellido</th>
              <th className="px-6 py-3">Correo</th>
              <th className="px-6 py-3">Restaurar</th>
              <th className="px-6 py-3">Eliminar</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-mono divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr
                key={user.identificacion}
                className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
              >
                <td className="px-6 py-3 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-3 whitespace-nowrap">
                  {user.last_name}
                </td>
                <td className="px-6 py-3 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-3 text-center">
                  <Tooltip
                    title={`Restaurar a ${user.name}`}
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
                      className="text-green-600 hover:text-green-700 transition-colors duration-150"
                      onClick={() => handleRestoreUser(user.identificacion)}
                    >
                      <RestoreFromTrashIcon fontSize="large" />
                    </button>
                  </Tooltip>
                </td>
                <td className="px-6 py-3 text-center">
                  <Tooltip
                    title={`Eliminar a ${user.name}`}
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
                      className="text-red-600 hover:text-red-700 transition-colors duration-150"
                      onClick={() => {
                        setDeleteUserId(user.identificacion);
                        setConfirmationDialogOpen(true);
                      }}
                    >
                      <DeleteIcon fontSize="large" />
                    </button>
                  </Tooltip>
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

      <Dialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
      >
        <DialogTitle>{"¿Está seguro de eliminar al usuario?"}</DialogTitle>
        <DialogContent>
          <p>Esta acción es irreversible.</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmationDialogOpen(false)}
            color="primary"
          >
            Cancelar
          </Button>
          <Button onClick={handleDeleteUser} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteSuccessDialogOpen}
        onClose={() => setDeleteSuccessDialogOpen(false)}
      >
        <DialogTitle>{"Usuario eliminado correctamente"}</DialogTitle>
        <DialogContent>
          <p>El usuario ha sido eliminado de forma definitiva.</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteSuccessDialogOpen(false)}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UsersDeleted;
