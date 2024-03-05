import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-modal'
import CancelIcon from '@mui/icons-material/Cancel';
import NivelCreate from "./NivelCreate";

function NivelAdmin() {
    const [niveles, setNiveles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
  
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
  
    return (
      <div>
        <div className="absolute top-0 right-36 mt-28 ml-96 p-4 w-3/5 h-auto -translate-x-20">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Niveles</h2>
          <button
            onClick={() => setShowModal(true)}
            className="absolute top-0 right-0 mt-4 mr-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Agregar Nivel
          </button>
          {loading ? (
            <p>Cargando niveles...</p>
          ) : niveles.length === 0 ? (
            <p>No hay niveles disponibles.</p>
          ) : (
            <div>
              {niveles.map((nivel) => (
                <Link to={`/nivel/${nivel.id}`} key={nivel.id}>
                  <div key={nivel.id} className="bg-gray-200 border-b-4 border-blue-500 rounded p-2 mb-4 hover:bg-gray-300 transition duration-300">
                    <strong className="block text-lg mb-2 font-bold text-gray-900">{nivel.name}</strong>
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
          // overlayClassName="overlay"
          contentLabel="Agregar Nivel"
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <div className="modal-content p-2 w-2/5 h-screen mx-auto rounded-lg shadow-lg">
            <NivelCreate />
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