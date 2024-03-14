import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

function UsersDeleted() {
  const [usersDeleted, setUsersDeleted] = useState([]);
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
        setUsersDeleted(usersDeleted.filter(user => user.identificacion !== deleteUserId));
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
      <h1 className="text-2xl font-gabarito mb-4 text-gray-700">
        Usuarios Eliminados
      </h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => navigate("/admin")}
      >
        <KeyboardBackspaceIcon />
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border-2 border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-8 border-2 p-2">Nombre</th>
              <th className="px-10 border-2 p-2">Apellido</th>
              <th className="px-24 border-2 p-2">Correo</th>
              <th className="border-2 p-2">Restaurar</th>
              <th className="border-2 p-2">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {usersDeleted.map((user) => (
              <tr key={user.identificacion} className="text-center">
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.last_name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="py-2 px-8 border">
                  <button
                    className="text-green-500 font-bold"
                    onClick={() => handleRestoreUser(user.identificacion)}
                  >
                    <RestoreFromTrashIcon fontSize="large" />
                  </button>
                </td>
                <td className="py-2 px-8 border">
                  <button
                    className="text-red-500 font-bold"
                    onClick={() => {
                      setDeleteUserId(user.identificacion);
                      setConfirmationDialogOpen(true);
                    }}
                  >
                    <DeleteIcon fontSize="large" />
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
      <Dialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
      >
        <DialogTitle>{"¿Está seguro de eliminar al usuario?"}</DialogTitle>
        <DialogContent>
          <p>Esta acción es irreversible.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialogOpen(false)} color="primary">
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
          <Button onClick={() => setDeleteSuccessDialogOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UsersDeleted;