import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from 'react-modal'
import GrupoCreate from "./GrupoCreate";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CancelIcon from '@mui/icons-material/Cancel';

function Grupos() {
  const [grupos, setGrupos] = useState([]);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await axios.get(`/niveles/${id}/grupos`);
        setGrupos(response.data);
      } catch (error) {
        setError(error.response.data.error);
        console.error("Ocurrio un error al traer los grupos:", error);
      }
    };

    fetchGrupos();
  }, [id]);

  const closeModalAndReload = async () => {
    setModalIsOpen(false);
    try {
      const response = await axios.get(`/niveles/${id}/grupos`);
      setGrupos(response.data)
    } catch (error) {
      console.error('Error al obtener los grupos:', error);
    }
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="absolute top-0 right-36 mt-28 ml-96 p-4 w-1/2 h-auto -translate-x-32">
      <button
        onClick={goBack}
        className="bg-blue-500 text-white w-20 h-10 mb-8 font-semibold py-0 px-4 rounded hover:bg-gray-400 transition-transform ease-in-out duration-300 hover:translate-y-2"
      >
        <KeyboardBackspaceIcon fontSize="large" />
      </button>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Grupos en Nivel</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <button
        onClick={openModal}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-transform ease-in-out duration-300 hover:translate-y-2"
      >
        Crear Grupo
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName=""
      >
        <div className=" p-4 rounded-lg max-w-1xl overflow-y-auto flex flex-col justify-center items-center">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-800 hover:text-gray-600"
        >
          <CancelIcon fontSize="large" />
        </button>
        <GrupoCreate nivelId={id} closeModal={closeModal} closeModalAndReload={closeModalAndReload} />
        </div>
      </Modal>
      <ul>
        {grupos.map((grupo) => (
          <li key={grupo.id} className="mb-4 bg-gray-200 translate-y-4 h-12 rounded-md  border-b-4 border-blue-600 transition-transform ease-in-out duration-300 hover:translate-y-2 ">
            <Link to={`/niveles/${id}/grupos/${grupo.id}`}>
            <p className="text-gray-800 font-hammersmithOne ml-2 p-2 translate-y-1">
              {grupo.name}
            </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Grupos;
