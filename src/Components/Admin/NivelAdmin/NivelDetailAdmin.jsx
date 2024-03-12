import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import CancelIcon from "@mui/icons-material/Cancel";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from '@mui/icons-material/Group';
import NivelEdit from "./NivelEdit";
import ModuloAdmin from "../ModuloAdmin/ModuloAdmin";
import AddUserNivel from "./AddUserNivel/AddUserNivel";
import UserNivelList from "./AddUserNivel/UserNivelList";

function NivelDetailAdmin() {
  const [nivel, setNivel] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  //console.log("id:", id);

  useEffect(() => {
    const fetchNivelDetail = async () => {
      try {
        const response = await axios.get(`/nivel/${id}`);
        setNivel(response.data);
        setLoading(false);
        console.log("response:", response.data);
      } catch (error) {
        console.error("Error al obtener el detail del Nivel:", error);
        setError("Se produjo un error al cargar el detalle de este Nivel.");
        setLoading(false);
      }
    };
    fetchNivelDetail();
  }, [id]);

  const handleDeleteNivel = async () => {
    try {
      const confirmar = window.confirm(
        "¿Estás seguro de querer eliminar este nivel? No se podrá recuperar."
      );
      if (confirmar) {
        await axios.delete(`/nivel/${id}`);
        setTimeout(() => {
          navigate("/niveladmin");
        }, 1000);
      }
    } catch (error) {
      console.error("Error al eliminar el nivel:", error);
      setError("Error al eliminar el nivel. Por favor, inténtalo de nuevo.");
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenUserModal = () => {
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
  };

  const handleViewUserList = () => {
    setShowUserList(!showUserList);
  };

  return (
    <div className="absolute top-0 right-36 mt-28 ml-96 p-4 w-3/5 h-auto -translate-x-20">
      <div className="max-w-xl mx-auto p-8 bg-white shadow rounded-md ">
        {loading && <div className="text-center">Cargando...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {nivel && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {nivel.name}
            </h2>
            <div className="mb-4">
              <img
                src={nivel.image}
                alt="Imagen del nivel"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <p className="text-lg mb-2 text-gray-800">
              <strong>Duración:</strong> {nivel.duracion}
            </p>
            <p className="text-lg mb-2 text-gray-800">
              <strong>Descripción:</strong> {nivel.description}
            </p>
            <p className="text-lg mb-2 text-gray-800">
              <strong>Costo:</strong> ${nivel.costo}
            </p>
            <button
              onClick={handleDeleteNivel}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              <FolderDeleteIcon fontSize="large" />
            </button>
            <button
              onClick={handleOpenModal}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ml-4"
            >
              <EditNoteIcon fontSize="large" />
            </button>
            <button
              onClick={handleOpenUserModal}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ml-4"
            >
              <PersonAddIcon fontSize="large" />
            </button>

            <button
              onClick={handleViewUserList}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 ml-4"
            >
              <GroupIcon fontSize="large" />
            </button>
          </div>
        )}
      </div>
      {showUserList && (
        <div>
          <h2>Usuarios Inscritos al Nivel</h2>
          <UserNivelList nivelId={id} />
        </div>
      )}
      <div>
        <h2>Modulos Del Nivel</h2>
        <ModuloAdmin nivelId={id} />
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        className="modal"
        contentLabel="Editar"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <div className="modal-content p-2 w-2/5 h-screen mx-auto rounded-lg shadow-lg">
          <NivelEdit id={id} />
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-1 right-1 hover:text-red-400 text-gray-500 rounded-full"
          >
            <CancelIcon fontSize="large" />
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={showUserModal}
        onRequestClose={handleCloseUserModal}
        className="modal"
        contentLabel="Agregar Usuario al Nivel"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <div className="modal-content p-2 w-2/5 h-screen mx-auto rounded-lg shadow-lg">
          <AddUserNivel nivelId={id} onUserAdded={handleCloseUserModal} />
          <button
            onClick={handleCloseUserModal}
            className="absolute top-1 right-1 hover:text-red-400 text-gray-500 rounded-full"
          >
            <CancelIcon fontSize="large" />
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default NivelDetailAdmin;
