import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import CancelIcon from "@mui/icons-material/Cancel";
import EditNoteIcon from "@mui/icons-material/EditNote";
import GroupsIcon from "@mui/icons-material/Groups";
import NivelEdit from "./NivelEdit";
import ModuloAdmin from "../ModuloAdmin/ModuloAdmin";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CircularProgress from "@mui/material/CircularProgress";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function NivelDetailAdmin() {
  const [nivel, setNivel] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNivelDetail = async () => {
      try {
        const response = await axios.get(`/nivel/${id}`);
        setNivel(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el detalle del Nivel:", error);
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

  const handleNavigateToGrupos = () => {
    navigate(`/niveles/${id}/grupos`);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="py-5 px-52 items-center justify-center">
      <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg">
        <button
          onClick={goBack}
          className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300 mb-4"
        >
          <KeyboardBackspaceIcon fontSize="medium" />
          Volver
        </button>
        {loading ? (
          <div className="fixed inset-0 flex justify-center items-center">
            <div className="text-center">
              <p className="text-gray-600 mt-4 font-semibold">Cargando...</p>
              <CircularProgress />
            </div>
          </div>
        ) : error ? (
          <div className="fixed inset-0 flex justify-center items-center">
            <div className="text-center">
              <p className="text-red-500 mt-4 font-semibold">Error: {error}</p>
              <p className="text-red-500 mt-4 font-semibold">
                Oops! Algo salió mal. Vuelve a intentarlo en un momento.
              </p>
              <p className="text-red-500 mt-4 font-semibold">
                <SentimentVeryDissatisfiedIcon fontSize="large" />
              </p>
            </div>
          </div>
        ) : (
          nivel && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
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
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleDeleteNivel}
                  className="flex items-center bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                >
                  <FolderDeleteIcon fontSize="large" className="mr-2" />
                  Eliminar
                </button>
                <button
                  onClick={handleOpenModal}
                  className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  <EditNoteIcon fontSize="large" className="mr-2" />
                  Editar
                </button>
                <button
                  onClick={handleNavigateToGrupos}
                  className="flex items-center bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                >
                  <GroupsIcon fontSize="large" className="mr-2" />
                  Grupos
                </button>
              </div>
            </div>
          )
        )}
      </div>
      <div>
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
        <div className="modal-content p-4 w-full max-w-2xl mx-auto rounded-lg shadow-lg relative">
          <NivelEdit id={id} />
          <button
            onClick={handleCloseModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-400 transition duration-300"
          >
            <CancelIcon fontSize="large" />
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default NivelDetailAdmin;
