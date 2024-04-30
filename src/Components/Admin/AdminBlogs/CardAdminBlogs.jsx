import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "react-modal";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditarBlog from "./EditarBlog";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import img from "../../../assets/cardBlog.png";

const CardAdminBlogs = ({ imageUrl, title, blogId, estado }) => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const handleEditBlog = () => {
    navigate(`/Admin/Blog/Editar/${blogId}`);
  };

  const truncatedTitle =
    title.length > 25 ? title.substring(0, 25) + "..." : title;

  const estadoColorClass = () => {
    switch (estado) {
      case "rechazado":
        return "text-red-500";
      case "borrador":
        return "text-yellow-500";
      case "publicado":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const estadoText = estado ? estado : "Estado no definido";

  return (
    <div className="border bg-gray-100 rounded-lg p-4 m-2 flex items-center hover:shadow-lg transition duration-300">
      <img
        src={imageUrl || img}
        alt="Blog"
        className="w-24 h-24 object-cover mr-4"
      />
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{truncatedTitle}</h3>
        <div>
          <p className={`font-semibold ${estadoColorClass()}`}>{estadoText}</p>
        </div>
        <div className="flex mt-2 space-x-2">
          <button
            className="text-blue-500 px-3 py-1 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            onClick={handleEditBlog}
          >
            <EditIcon />
          </button>
          <button
            className="text-green-500 px-3 py-1 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            onClick={handleCardClick}
          >
            <VisibilityIcon />
          </button>
          <button
            className="text-red-500 px-3 py-1 rounded-full flex items-center transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
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
  estado: PropTypes.string.isRequired,
};

export default CardAdminBlogs;