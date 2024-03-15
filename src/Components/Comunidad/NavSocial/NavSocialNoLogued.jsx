// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../Redux/features/Users/usersSlice";
import {
  HomeOutlined as HomeOutlinedIcon,
  GridViewOutlined as GridViewOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const NavSocialNoLogued = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b-2 sticky top-0 bg-blue-600 dark:bg-gray-800 text-white dark:text-whitesmoke z-50">
      <div className="flex items-center gap-4 md:gap-8">
        <Link to="/Comunidad" className="text-white text-xl font-bold">
          Llave Social
        </Link>
        <HomeOutlinedIcon onClick={() => navigate('/')} className="text-white" />
        <GridViewOutlinedIcon
          onClick={handleDialogOpen}
          className="text-white"
        />
        <div className="hidden md:flex items-center border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white">
          <SearchOutlinedIcon className="text-blue-600 dark:text-whitesmoke" />
          <input
            onClick={handleDialogOpen}
            type="text"
            placeholder="Buscar..."
            className="bg-transparent focus:outline-none text-blue-600 dark:text-whitesmoke ml-1"
          />
        </div>
      </div>
      <div className="items-center gap-4 md:gap-8 hidden md:flex">
        <div className="relative">
          <div
            className="flex items-center gap-2 font-medium cursor-pointer"
            onClick={handleDialogOpen}
          >
            <img
              src={
                userData?.image ||
                "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"
              }
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-white dark:text-whitesmoke">{`${
              userData?.name || ""
            } ${userData?.last_name || ""}`}</span>
            <ExpandMoreIcon className="text-white" />
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
            onClick={() => navigate('/login')}
            variant="contained"
            color="primary" 
          >
            Iniciar Sesión
          </Button>
          <Button
            onClick={() => navigate('/RegistroUser')}
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

export default NavSocialNoLogued;