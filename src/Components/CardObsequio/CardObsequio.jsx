import { useState } from "react";
import Modal from "react-modal";
import FormObsequio from "../FormObsequio/FormObsequio";

const CardObsequio = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <div className="">
      <div className="w-64 h-60 bg-white shadow-md rounded-md overflow-hidden border-solid border-2 border-blue-500">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Regístrate para Obtener <br />
            10 Clases de Obsequio
          </h2>
          <p className="text-gray-700 mt-2 pt-4">
            ¡No te pierdas esta oferta especial!
          </p>
        </div>
        <div className="flex justify-center pt-5">
          <button
            className="w-30 py-2 px-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-100 focus:outline-none focus:bg-blue-600"
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
