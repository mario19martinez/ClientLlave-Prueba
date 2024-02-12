import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import CrearInformacion from "./CrearInformacion";

const Informacion = () => {
  const [informacion, setInformacion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedInfoId, setSelectedInfoId] = useState(null);

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
    if (window.confirm('¿Estas seguro de eliminar est informacion?')) {
      handleDelete(id)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/informacion/${id}`);
      setInformacion(informacion.filter(info => info.id !== id));
    } catch (error) {
      console.error('Hubo un error al eliminar la informacion:', error);
    }
  }

  return (
    <div className="absolute top-0 left-0 mt-28 ml-96 p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Información</h1>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
      >
        Crear Nueva Información
      </button>
      {loading ? (
        <p>Cargando...</p>
      ) : informacion.length === 0 ? (
        <p>No hay información disponible.</p>
      ) : (
        <ul>
          {informacion.map((info) => (
            <li key={info.id} className="mb-4">
              <h2 className="text-lg font-semibold">{info.titulo}</h2>
              <p className="text-gray-700">{info.content}</p>
              <button onClick={() => handleConfirmation(info.id)} className="bg-red-500 text-white py-2 px-4 rounded-lg mt-2">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-blue-600 p-6 rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 "
      >
        <CrearInformacion />
        <button onClick={() => setModalIsOpen(false)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg">
          Cerrar
        </button>
      </Modal>
    </div>
  );
};

export default Informacion;
