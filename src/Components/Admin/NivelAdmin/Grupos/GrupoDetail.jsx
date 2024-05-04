import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import UsersGrupo from "../UserGrupo/UsersGrupo";
import AddModulo from "../AddModulo/AddModulo";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function GrupoDetail() {
  const [grupo, setGrupo] = useState(null);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id, grupoId } = useParams();

  useEffect(() => {
    const fetchGrupo = async () => {
      try {
        if (!id || !grupoId) {
          setError('ID de nivel o grupo no encontrados');
          return;
        }
        const response = await axios.get(`/niveles/${id}/grupos/${grupoId}`);
        setGrupo(response.data);
      } catch (error) {
        setError(error.response.data.error);
        console.error("Ocurrio un error:", error);
      }
    };
    fetchGrupo();
  }, [id, grupoId]);

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!grupo) {
    return <p>Cargando...</p>;
  }

  if (id === undefined) {
    return <p>Error: ID de nivel no encontrado</p>;
  }

  return (
    <div className="absolute top-0 right-36 mt-28 ml-96 p-4 w-3/4 h-auto rounded translate-x-14 translate-y-4">
      <button onClick={handleGoBack} className="bg-blue-500 text-white w-20 h-10 mb-8 font-semibold py-0 px-4 rounded hover:bg-gray-400 transition-transform ease-in-out duration-300 hover:translate-y-2">
        <KeyboardBackspaceIcon fontSize="large" />
      </button>
    {/* <div className=" mx-auto my-8 p-8 bg-gray-200 w-2/3 rounded shadow-lg"> */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">Detalle del Grupo</h2>
      <p className="mb-4 font-gabarito text-gray-700">
        <strong className="text-gray-800 font-bold">Nombre:</strong> {grupo.name}
      </p>
      <p className="mb-4 font-gabarito text-gray-700">
        <strong className="text-gray-800 font-bold">Descripción:</strong> {grupo.descripcion}
      </p>
      <button
      onClick={openModal}
      className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
      >
        Agregar Modulo
      </button>
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Agregar Modulo"
      >
        <AddModulo nivelId={grupo.nivelId} grupoId={grupoId} />
        <button onClick={closeModal} className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700">
          X
        </button>
      </Modal>
      <UsersGrupo nivelId={grupo.nivelId} grupoId={grupoId} />
    </div>
  );
}

export default GrupoDetail;
