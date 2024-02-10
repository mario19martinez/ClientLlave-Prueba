import { useState } from 'react';
import Modal from 'react-modal'
import FormObsequio from '../FormObsequio/FormObsequio';

const CardObsequio = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
        <div className="">
        <div className="w-64 h-60 bg-white shadow-md rounded-md overflow-hidden border-solid border-2 border-blue-500">
        <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">Regístrate para Obtener</h2>
        <h2 className="text-lg font-semibold text-gray-800">10 Clases de Obsequio</h2>
        <p className="text-gray-600 mt-2">¡No te pierdas esta oferta especial!</p>
      </div>
      <div className="px-4 py-3 bg-gray-100">
        <button
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
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
        <FormObsequio isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
      </Modal>
    </div>
    </div>
    );
  };
  
  export default CardObsequio;