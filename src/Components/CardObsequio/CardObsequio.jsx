// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import Modal from "react-modal";
import FormObsequio from "../FormObsequio/FormObsequio";

const CardObsequio = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-xs rounded overflow-hidden shadow-md border border-blue-500">
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">
            Regístrate para obtener <br />
            10 Clases de Obsequio
          </h2>
          <p className="text-gray-700 mb-4 text-center">
            ¡No te pierdas esta oferta especial!
          </p>
          <button
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={openModal}
          >
            Regístrate aquí
          </button>
        </div>
      </div>

      {/* Modal para el formulario de registro */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Registro"
        className="Modal"
        overlayClassName="Overlay"
      >
        <FormObsequio isOpen={modalIsOpen} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default CardObsequio;
