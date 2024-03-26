// import { useState } from "react";
// import Modal from "react-modal";

function MisTalleres() {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [selectedTaller, setSelectedTaller] = useState(null);
  // // Supongamos que tenemos una lista de talleres del usuario
  // const talleres = [
  //   { id: 1, nombre: "Taller 1", descripcion: "Descripcion del Taller 1" },
  //   { id: 2, nombre: "Taller 2", descripcion: "Descripcion del Taller 2" },
  //   { id: 3, nombre: "Taller 3", descripcion: "Descripcion del Taller 3" },
  // ];

  // const opennModal = (taller) => {
  //   setSelectedTaller(taller);
  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };

  return (
    <div className="px-4 py-10 md:px-20 lg:px-40">
      <div className="mb-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Mis Talleres</h2>
      </div>
      <p className="text-gray-600 mb-4">
        Estamos trabajando en la interfaz de los talleres realizados. Por el
        momento, los talleres están disponibles dentro del curso con el nombre
        de taller.
      </p>
      {/*<ul className="space-y-4">
        {talleres.map((taller) => (
          <li
            key={taller.id}
            className="bg-white p-4 rounded shadow-md flex justify-between items-center"
          >
            <div>
              <strong className="text-lg font-semibold block mb-2">
                {taller.nombre}
              </strong>
              <p className="text-gray-600">{taller.descripcion}</p>
            </div>
            <button
              onClick={() => opennModal(taller)}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Ver Detalles
            </button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-1/4 p-4 bg-blue-100 rounded-lg shadow-lg mx-auto my-auto z-50"
        overlayClassName="modal-overlay"
        ariaHideApp={false} // Evita errores de accesibilidad
      >
        {selectedTaller && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{selectedTaller.nombre}</h2>
            <p className="mt-6">{selectedTaller.descripcion}</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        )}
        </Modal>*/}
    </div>
  );
}

export default MisTalleres;
