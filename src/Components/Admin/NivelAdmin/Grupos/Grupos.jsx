import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import GrupoCreate from "./GrupoCreate";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CancelIcon from "@mui/icons-material/Cancel";

function Grupos() {
  const [grupos, setGrupos] = useState([]);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [groupsPerPage] = useState(6);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await axios.get(`/niveles/${id}/grupos`);
        setGrupos(response.data);
      } catch (error) {
        setError(error.response.data.error);
        console.error("Ocurrió un error al traer los grupos:", error);
      }
    };

    fetchGrupos();
  }, [id]);

  const closeModalAndReload = async () => {
    setModalIsOpen(false);
    try {
      const response = await axios.get(`/niveles/${id}/grupos`);
      setGrupos(response.data);
    } catch (error) {
      console.error("Error al obtener los grupos:", error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const goBack = () => {
    navigate(-1);
  };

  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = grupos.slice(indexOfFirstGroup, indexOfLastGroup);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={goBack}
        className="bg-blue-500 text-white w-20 h-10 mb-8 font-semibold py-0 px-4 rounded hover:bg-gray-400 transition-transform ease-in-out duration-300 hover:translate-y-1"
      >
        <KeyboardBackspaceIcon fontSize="large" />
      </button>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Grupos en Nivel</h2>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <button
        onClick={openModal}
        className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-transform duration-300 ease-in-out mb-6"
      >
        Crear Grupo
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
      >
        <div className="p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-800 hover:text-gray-600"
          >
            <CancelIcon fontSize="large" />
          </button>
          <GrupoCreate
            nivelId={id}
            closeModal={closeModal}
            closeModalAndReload={closeModalAndReload}
          />
        </div>
      </Modal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentGroups.map((grupo) => (
          <Link
            key={grupo.id}
            to={`/niveles/${id}/grupos/${grupo.id}`}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={grupo.image}
              alt={grupo.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {grupo.name}
              </h3>
              <p className="text-gray-600 mb-4">Inicia: {grupo.fechaInicio}</p>
              <button className="bg-blue-600 text-white font-semibold py-1 px-4 rounded-lg hover:bg-blue-700 transition-transform duration-300 ease-in-out">
                Ver Grupo
              </button>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <nav>
          <ul className="flex list-none p-0">
            {Array.from({ length: Math.ceil(grupos.length / groupsPerPage) }, (_, i) => (
              <li key={i + 1} className="mx-1">
                <button
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-2 rounded-lg border ${
                    currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white text-blue-600"
                  } hover:bg-blue-700 hover:text-white transition-colors duration-300`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Grupos;