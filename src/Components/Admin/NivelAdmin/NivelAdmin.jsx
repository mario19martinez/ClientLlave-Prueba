import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import CancelIcon from "@mui/icons-material/Cancel";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import PostAddIcon from "@mui/icons-material/PostAdd";
import NivelCreate from "./NivelCreate";
import CircularProgress from '@mui/material/CircularProgress';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ReactPaginate from 'react-paginate';

function NivelAdmin() {
  const [niveles, setNiveles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchNiveles = async () => {
      try {
        const res = await axios.get("/niveles");
        setNiveles(res.data);
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
      const res = await axios.get("/niveles");
      setNiveles(res.data);
    } catch (error) {
      console.error("Error al obtener los niveles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = niveles.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(niveles.length / itemsPerPage);

  return (
    <div className="relative p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Niveles</h2>

      <div className="flex justify-end gap-4 mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow transition"
        >
          <PostAddIcon />
          <span>Agregar</span>
        </button>
        <button
          onClick={() => navigate("/admin/deleted")}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded shadow transition"
        >
          <FolderDeleteIcon />
          <span>Eliminados</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="text-center">
            <p className="text-gray-600 font-medium mb-2">Cargando Niveles...</p>
            <CircularProgress />
          </div>
        </div>
      ) : niveles.length === 0 ? (
        <div className="flex justify-center items-center h-48">
          <div className="text-center">
            <p className="text-gray-600 font-medium mb-2">No hay niveles disponibles.</p>
            <SentimentVeryDissatisfiedIcon fontSize="large" />
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentItems.map((nivel) => (
              <Link to={`/nivel/${nivel.id}`} key={nivel.id}>
                <div className="bg-white border border-blue-400 rounded-md shadow hover:bg-blue-50 p-4 transition">
                  <strong className="text-lg text-gray-800">{nivel.name}</strong>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName="flex gap-2"
              pageClassName="px-3 py-1 border rounded hover:bg-gray-200"
              activeClassName="bg-blue-500 text-white"
              previousClassName="px-3 py-1 border rounded"
              nextClassName="px-3 py-1 border rounded"
              disabledClassName="text-gray-400"
            />
          </div>
        </>
      )}

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal"
        contentLabel="Agregar Nivel"
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
      >
        <div className="modal-content p-0 w-full max-w-lg h-screen mx-auto rounded-lg shadow-lg">
          <NivelCreate closeModalAndReload={closeModalAndReload} />
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          >
            <CancelIcon fontSize="large" />
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default NivelAdmin;