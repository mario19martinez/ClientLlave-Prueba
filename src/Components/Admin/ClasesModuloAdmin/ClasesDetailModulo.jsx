import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from 'react-modal'
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ClaseEditAdmin from "./ClasesEditAdmin";

function ClasesDetailModulo() {
  const { moduloId, claseId } = useParams();
  const [clase, setClase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    const fetchClase = async () => {
      try {
        const response = await axios.get(
          `/modulo/${moduloId}/clase/${claseId}`
        );
        setClase(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error en el funcionamiento:', error)
        setError(
          "Error al obtener la clase. Por favor, intentalo de nuevo mas tarde."
        );
        setLoading(false);
      }
    };

    fetchClase();

    return () => {};
  }, [moduloId, claseId]);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const extractYoutubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-xl font-semibold text-gray-900">
          Cargando...
        </span>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!clase) {
    return <div>No se encontró la clase.</div>;
  }

  return (
    <div className="absolute top-0 left-0 mt-28 ml-96 bg-gray-100 min-h-screen flex justify-center items-center w-1/2">
      <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Detalle de la clase</h2>

        <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded-md mb-4">
          <EditNoteIcon fontSize="large" />
          </button>
          <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Editar Clase"
          className="modal"
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <ClaseEditAdmin moduloId={moduloId} claseId={claseId} />

          <button onClick={closeModal} className=" text-red-500 p-2 rounded-md absolute top-4 right-4">
            <CancelIcon fontSize="large" />
          </button>
        </Modal>
        <div className="aspect-w-16 aspect-h-9 mb-6">
          {clase.url && (
            <iframe
              title={clase.name}
              className="w-full h-96 rounded-lg"
              src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
                clase.url
              )}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </div>
        {clase.name && (
          <div className="mb-4">
          <p className="font-bold text-gray-800 text-xl">{clase.name}</p>
          </div>
        )}
        {clase.texto && (
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2 text-gray-800">Texto:</h3>
            <p className=" font-gabarito">{clase.texto}</p>
          </div>
        )}
        {clase.resumen && (
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Resumen:</h3>
            <p className=" font-gabarito">{clase.resumen}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClasesDetailModulo;
