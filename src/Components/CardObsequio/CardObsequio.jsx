import { useState } from "react";
import Modal from "react-modal";
import FormObsequio from "../FormObsequio/FormObsequio";

const CardObsequio = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="">
      <div className="w-64 h-60 bg-gradient-to-br from-blue-400 via-blue-700 to-blue-400 shadow-md rounded-md overflow-hidden border-solid border-2 border-blue-500">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-white">
            Regístrate para Obtener
          </h2>
          <h2 className="text-lg font-semibold text-white">
            10 Clases de Obsequio
          </h2>
          <p className="text-white mt-2">
            ¡No te pierdas esta oferta especial!
          </p>
        </div>
        <div className="flex justify-center">
          <button
            className="w-30 py-2 px-4 bg-white font-bold text-blue-600 rounded hover:bg-blue-100 focus:outline-none focus:bg-blue-600"
            onClick={() => setModalIsOpen(true)}
          >
            Regístrate aquí
          </button>
        </div>

        {/* Modal para el formulario de registro */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Registro"
          className="Modal"
          overlayClassName="Overlay"
        >
          <FormObsequio
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CardObsequio;
