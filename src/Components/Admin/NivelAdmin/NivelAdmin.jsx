import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import CancelIcon from "@mui/icons-material/Cancel";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import PostAddIcon from "@mui/icons-material/PostAdd";
import NivelCreate from "./NivelCreate";

function NivelAdmin() {
  const [niveles, setNiveles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNiveles = async () => {
      try {
        const response = await axios.get("/niveles");
        setNiveles(response.data);
      } catch (error) {
        console.error("Error al obtener los niveles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNiveles();
  }, []);

  const closeModalAndReload = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      const response = await axios.get("/niveles");
      setNiveles(response.data);
    } catch (error) {
      console.error("Error al obtener los niveles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="absolute top-0 right-36 mt-28 ml-96 p-4 w-3/5 h-auto -translate-x-20">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Niveles</h2>
        <button
          onClick={() => setShowModal(true)}
          className="absolute top-0 right-0 mt-0 mr-8 h-16 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          <PostAddIcon fontSize="large" />
          <h1 className="text-xs text-white">Agregar</h1>
        </button>
        <button
          onClick={() => navigate("/admin/deleted")}
          className="absolute top-0 right-8 mt-0 mr-0 -translate-x-24 h-16 bg-red-500 font-semibold text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
        >
          <FolderDeleteIcon fontSize="large" />
          <h1 className="text-xs text-white">Eliminar</h1>
        </button>
        {loading ? (
          <p>Cargando niveles...</p>
        ) : niveles.length === 0 ? (
          <p>No hay niveles disponibles.</p>
        ) : (
          <div>
            {niveles.map((nivel) => (
              <Link to={`/nivel/${nivel.id}`} key={nivel.id}>
                <div
                  key={nivel.id}
                  className="bg-gray-200 border-b-4 border-blue-500 rounded p-2 mb-4 hover:bg-gray-300 transition duration-300 translate-y-4"
                >
                  <strong className="block text-lg mb-2 font-bold text-gray-800">
                    {nivel.name}
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal"
        contentLabel="Agregar Nivel"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        <div className="modal-content p-0 w-2/5 h-screen mx-auto rounded-lg shadow-lg">
          <NivelCreate closeModalAndReload={closeModalAndReload} />
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-1 hover:text-red-400 text-gray-500 rounded-full"
          >
            <CancelIcon fontSize="large" />
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default NivelAdmin;
