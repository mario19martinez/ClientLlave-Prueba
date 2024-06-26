import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import CrearInformacion from "./CrearInformacion";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";

const Informacion = () => {
  const [informacion, setInformacion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedInfoId, setSelectedInfoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInformacion = async () => {
      try {
        const response = await axios.get("/informacion");
        setInformacion(response.data);
      } catch (error) {
        console.error("Hubo un error al obtener la información:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInformacion();
  }, []);

  const handleConfirmation = (id) => {
    setSelectedInfoId(id);
    if (window.confirm("¿Estas seguro de eliminar est informacion?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/informacion/${id}`);
      setInformacion(informacion.filter((info) => info.id !== id));
    } catch (error) {
      console.error("Hubo un error al eliminar la informacion:", error);
    }
  };

  return (
    <div className="absolute top-0 left-0 mt-28 ml-96 p-4">
      <button
        onClick={() => navigate("/AdminPage")}
        className="bg-blue-500 text-white w-20 h-10 mb-0 font-semibold py-0 px-4 rounded hover:bg-gray-400 transition-transform ease-in-out duration-300 hover:translate-y-1"
      >
        <KeyboardBackspaceIcon fontSize="large" />
      </button>
      <h1 className="text-2xl font-bold mb-4 text-gray-700 mt-8">
        Lista de Información
      </h1>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg mb-4"
      >
        Crear Información
      </button>
      {loading ? (
        <p>Cargando...</p>
      ) : informacion.length === 0 ? (
        <p>No hay información disponible.</p>
      ) : (
        <ul>
          {informacion.map((info) => (
            <li key={info.id} className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                {info.titulo}
              </h2>
              <p className="text-gray-700">{info.content}</p>
              <button
                onClick={() => handleConfirmation(info.id)}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg mt-2"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <CrearInformacion />
        <Tooltip
          title="Haz clic para cerrar"
          arrow
          placement="bottom-start"
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
          onClick={() => setModalIsOpen(false)}
          className="absolute top-2 right-2 text-gray-300 hover:text-gray-600"
        >
          <CancelIcon fontSize="large" />
        </button>
        </Tooltip>
      </Modal>
    </div>
  );
};

export default Informacion;
