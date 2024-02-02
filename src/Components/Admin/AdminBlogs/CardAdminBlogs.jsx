// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "react-modal";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditarBlog from "./EditarBlog";
//import VerBlog from "./VerBlog";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const CardAdminBlogs = ({ imageUrl, title, blogId }) => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteBlog = async () => {
    try {
      await axios.delete(`/blogs/${blogId}`);
      alert("El blog se ha eliminado correctamente");
      window.location.reload();
    } catch (error) {
      console.error("Hubo un error al eliminar el blog:", error);
    }
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleViewBlog = (blogId) => {
    navigate(`/admin/blogDetails/${blogId}`);
  };

  const handleCardClick = () => {
    handleViewBlog(blogId);
  };

  return (
    <div className="border bg-cyan-50 rounded-lg p-4 m-2 flex items-center hover:shadow-lg transition duration-300">
      <img src={imageUrl} alt="Blog" className="w-24 h-24 object-cover mr-4" />
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex mt-2">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-md flex items-center mr-2 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            onClick={() => setModalIsOpen(true)}
          >
            <EditIcon />
          </button>
          <button
            className="bg-green-500 text-white px-2 py-1 rounded-md flex items-center mr-2 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            onClick={handleCardClick}
          >
            <VisibilityIcon />
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded-md flex items-center transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            onClick={() => setDeleteDialogOpen(true)} // Abrir el diálogo de confirmación
          >
            <DeleteIcon />
          </button>
        </div>
        {/* Modal para el formulario EditarBlog */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="rounded-lg mx-auto max-w-lg p-6"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        >
          <EditarBlog blogId={blogId} />
        </Modal>
        {/* Diálogo de confirmación para eliminar */}
        <Dialog open={deleteDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Confirmación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que quieres eliminar este blog?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDeleteBlog} color="error" autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

CardAdminBlogs.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  blogId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CardAdminBlogs;
