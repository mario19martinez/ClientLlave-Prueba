import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import axios from "axios";
import ModuloCreate from "./ModuloCreate";
import CancelIcon from '@mui/icons-material/Cancel';

function ModuloAdmin({ nivelId }) {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get(`/niveles/${nivelId}/modulos`);
        setModulos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los modulos:", error);
        setError("Se produjo un error al cargar los modulos.");
      }
    };
    fetchModulos();
  }, [nivelId]);

  const closeModalAndReload = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      const response = await axios.get(`/niveles/${nivelId}/modulos`)
      setModulos(response.data);
    } catch (error) {
      console.error('Error al obtener los modulos:', error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 bg-gray-200 rounded-md shadow-md ">
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mb-4 hover:bg-blue-600 transition duration-300"
      >
        Agregar Modulo
      </button>
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-blue-500 p-4 rounded-md shadow-md max-w-lg h-full">
            <button className="absolute top-2 right-2 text-red-500" onClick={toggleModal}>
              <CancelIcon fontSize="large" />
            </button>
            <ModuloCreate nivelId={nivelId} closeModalAndReload={closeModalAndReload} />
          </div>
        </div>
      )}

      {loading && <div className="text-center">Cargando módulos...</div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}
      {modulos.length > 0 ? (
        <ul>
          {modulos.map((modulo) => (
            <li
              key={modulo.id}
              className="my-4 p-4 bg-white rounded-md shadow-md"
            >
              <Link to={`/nivel/${nivelId}/modulo/${modulo.id}`}>
              <h3 className="text-xl font-bold text-gray-800">
                {modulo.titulo}
              </h3>
              <p className="text-gray-600">{modulo.descripcion}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Este nivel aún no tiene módulos.</p>
      )}
    </div>
  );
}

ModuloAdmin.propTypes = {
  nivelId: PropTypes.string.isRequired,
};

export default ModuloAdmin;
