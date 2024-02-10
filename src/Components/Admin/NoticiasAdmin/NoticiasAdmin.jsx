import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal"; // Asegúrate de tener react-modal instalado en tu proyecto
import CreateNoticias from "./CreateNoticias";

const NoticiasAdmin = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get("/noticias");
        setNoticias(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las noticias:", error);
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading) {
    return <div>Cargando noticias...</div>;
  }

  return (
    <div>
      <div className="absolute top-0 left-0 mt-28 ml-96 p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Noticias</h1>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4"
        >
          Agregar Noticia
        </button>
        {noticias.length === 0 ? (
          <div>No hay noticias para mostrar.</div>
        ) : (
          <ul className="space-y-4">
            {noticias.map((noticia) => (
              <li key={noticia.id} className="border p-4 rounded-md">
                <h2 className="text-lg font-semibold">{noticia.titulo}</h2>
                <p className="text-gray-600">{noticia.contenido}</p>
                <p className="text-gray-500">Fecha: {noticia.fecha}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg max-w-md w-full"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-90"
      >
        <CreateNoticias />
      </Modal>
    </div>
  );
};

export default NoticiasAdmin;
