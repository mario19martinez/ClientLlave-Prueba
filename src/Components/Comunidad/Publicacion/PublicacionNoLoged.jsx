// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const PublicacionNoLoged = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className="shadow-lg rounded-3xl bg-gray-100 dark:bg-gray-800 text-black dark:text-white mb-20">
      <div className="container p-5">
        <div className="top flex items-center gap-4">
          <img
            src={
              "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
            }
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder={`Quieres publicar algo ?`}
            className="border-none outline-none bg-transparent w-3/4 text-black dark:text-white"
          />
        </div>
        <hr className="my-5 border-t border-gray-500 dark:border-gray-600" />
        <div className="bottom flex justify-between items-center">
          <div className="right">
            <button
              onClick={handleDialogOpen}
              className="px-3 py-1 bg-blue-500 text-white rounded-md"
            >
              Publicar
            </button>
          </div>
        </div>
      </div>
      {/* Diálogo emergente flotante */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Te damos la bienvenida a la comunidad</DialogTitle>
        <DialogContent>
          Para poder interactuar en la comunidad, debe registrarse o iniciar
          sesión.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => navigate("/login")}
            variant="contained"
            color="primary"
          >
            Iniciar Sesión
          </Button>
          <Button
            onClick={() => navigate("/RegistroUser")}
            variant="contained"
            color="success"
          >
            Registrarse
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PublicacionNoLoged;