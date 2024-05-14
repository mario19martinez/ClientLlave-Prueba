import { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-modal'
import PropTypes from "prop-types";
import AddUserGrupo from "./AddUserGrupo";

function UsersGrupo({ nivelId, grupoId }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(
          `/nivel/${nivelId}/grupos/${grupoId}/usuarios`
        );
        setUsuarios(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    };

    fetchUsuarios();
  }, [nivelId, grupoId]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  }

  if (loading) {
    return <div>Cargando Usuarios...</div>;
  }

  return (
    <div className="overflow-x-auto translate-y-4">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-4 font-bold"
        onClick={openModal}
      >
        Agregar Usuario
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button className="absolute top-2 right-2 text-gray-600" onClick={closeModal}>
          X
        </button>
        <AddUserGrupo nivelId={nivelId} grupoId={grupoId} />
      </Modal>
      {usuarios.length === 0 ? (
        <div className="text-center mt-4 text-gray-600">
          Aún no hay usuarios agregados al grupo.
        </div>
      ) : (
        <table className="w-3/4 bg-white shadow-md rounded">
          <thead>
            <tr className="text-left bg-blue-600 text-white">
              <th className="py-2 px-3">Nombre</th>
              <th className="py-2 px-3">Apellido</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr
                key={index}
                className={
                  (index % 2 === 0 ? "bg-gray-200 " : "bg-white ") + "text-left"
                }
              >
                <td className="py-2 px-3">{usuario.name}</td>
                <td className="py-2 px-3">{usuario.last_name}</td>
                <td className="py-2 px-3">{usuario.email}</td>
                <td className="py-2 px-3">{usuario.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

UsersGrupo.propTypes = {
  nivelId: PropTypes.string.isRequired,
  grupoId: PropTypes.string.isRequired,
};

export default UsersGrupo;
