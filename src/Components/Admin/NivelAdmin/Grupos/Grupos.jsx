import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Modal from 'react-modal'
import GrupoCreate from "./GrupoCreate";

function Grupos() {
  const [grupos, setGrupos] = useState([]);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { id } = useParams();

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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Grupos en Nivel</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      <button
        onClick={openModal}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Crear Grupo
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <GrupoCreate nivelId={id} closeModal={closeModal} />
      </Modal>
      <ul>
        {grupos.map((grupo) => (
          <li key={grupo.id} className="mb-4">
            <Link to={`/niveles/${id}/grupos/${grupo.id}`}>
            <p className="text-gray-800">
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
