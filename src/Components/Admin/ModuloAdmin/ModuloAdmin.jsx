import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import PropTypes from "prop-types";
import axios from "axios";
import ModuloCreate from "./ModuloCreate";
import CancelIcon from "@mui/icons-material/Cancel";

function ModuloAdmin({ nivelId }) {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); 

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get(`/niveles/${nivelId}/modulos`);
        setModulos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los módulos:", error);
        setError("Se produjo un error al cargar los módulos.");
      }
    };
    fetchModulos();
  }, [nivelId]);

  const closeModalAndReload = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      const response = await axios.get(`/niveles/${nivelId}/modulos`);
      setModulos(response.data);
    } catch (error) {
      console.error("Error al obtener los módulos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Ordenar los módulos según el título y el sortOrder
  const sortedModulos = [...modulos].sort((a, b) => {
    const numA = parseInt(a.titulo.substring(0, 2));
    const numB = parseInt(b.titulo.substring(0, 2));

    if (sortOrder === "asc") {
      return numA - numB;
    } else {
      return numB - numA;
    }
  });

  return (
    <div className="p-8 bg-gray-200 rounded-md shadow-md w-3/4 translate-x-24">
      <div className="flex space-x-3">
        <button
          onClick={toggleModal}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mb-4 hover:bg-blue-600 transition duration-300"
        >
          Agregar Módulo
        </button>
        <button
          onClick={toggleSortOrder}
          className="bg-gray-500 text-gray-800 font-semibold py-2 px-4 rounded-md mb-4 hover:bg-gray-400 transition duration-300"
        >
          {sortOrder === "asc" ? "Ordenar Descendente" : "Ordenar Ascendente"}
        </button>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={toggleModal}
        className="fixed inset-0 flex justify-center items-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        contentLabel="Agregar Módulo"
      >
        <div className="bg-opacity-25 p-4 rounded-lg shadow-lg max-w-3xl w-full h-full overflow-y-auto flex flex-col justify-center items-center">
          {/* Renderiza el componente ModuloCreate dentro del modal */}
          <ModuloCreate
            nivelId={nivelId}
            closeModalAndReload={closeModalAndReload}
          />
          <button
            onClick={toggleModal}
            className="absolute top-2 right-2 text-red-500"
          >
            <CancelIcon fontSize="large" />
          </button>
        </div>
      </Modal>

      {loading && <div className="text-center">Cargando módulos...</div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}
      {sortedModulos.length > 0 ? (
        <ul>
          {sortedModulos.map((modulo) => (
            <li
              key={modulo.id}
              className="my-4 p-4 bg-white rounded-md shadow-md transition-transform ease-in-out duration-300 hover:translate-y-2"
            >
              <Link to={`/nivel/${nivelId}/modulo/${modulo.id}`}>
                <h3 className="text-xl font-bold text-gray-800">
                  {modulo.titulo}
                </h3>
                <p className="text-gray-600">
                  {modulo.contenido.length > 100
                    ? `${modulo.contenido.substring(0, 100)}...`
                    : modulo.contenido}
                </p>
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