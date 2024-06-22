import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import PropTypes from "prop-types";
import axios from "axios";
import ModuloCreate from "./ModuloCreate";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";

function ModuloAdmin({ nivelId }) {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get(`/niveles/${nivelId}/modulos`);
        const sortedModulos = sortModulos(response.data);
        setModulos(sortedModulos);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los módulos:", error);
        setError("Se produjo un error al cargar los módulos.");
      }
    };
    fetchModulos();
  }, [nivelId]);

  const sortModulos = (modulos) => {
    return modulos.sort((a, b) => {
      const aNumero = parseInt(a.titulo.match(/^\d+/) || "Infinity", 10);
      const bNumero = parseInt(b.titulo.match(/^\d+/) || "Infinity", 10);
      return aNumero - bNumero;
    });
  };

  const closeModalAndReload = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      const response = await axios.get(`/niveles/${nivelId}/modulos`);
      const sortedModulos = sortModulos(response.data);
      setModulos(sortedModulos);
    } catch (error) {
      console.error("Error al obtener los módulos:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const updateModuloTitles = async (modulos) => {
    const updatedModulos = modulos.map((modulo, index) => {
      const numero = (index + 1).toString().padStart(2, "0");
      const titulo = `${numero} ${modulo.titulo.replace(/^\d{2}\s*/, "")}`;
      return { ...modulo, titulo };
    });

    for (const modulo of updatedModulos) {
      try {
        await axios.put(`/nivel/${nivelId}/modulo/${modulo.id}`, {
          titulo: modulo.titulo,
        });
      } catch (error) {
        console.error(`Error al actualizar el título del módulo ${modulo.id}:`, error);
      }
    }

    setModulos(sortModulos(updatedModulos));
  };

  const handleMove = async (index, direction) => {
    if (direction === "up" && index > 0) {
      const newModulos = [...modulos];
      [newModulos[index - 1], newModulos[index]] = [newModulos[index], newModulos[index - 1]];
      await updateModuloTitles(newModulos);
      setHighlightedIndex(index - 1);
    } else if (direction === "down" && index < modulos.length - 1) {
      const newModulos = [...modulos];
      [newModulos[index + 1], newModulos[index]] = [newModulos[index], newModulos[index + 1]];
      await updateModuloTitles(newModulos);
      setHighlightedIndex(index + 1);
    }

    setTimeout(() => setHighlightedIndex(null), 2000); // Remove highlight after 2 seconds
  };

  return (
    <div className="p-8 bg-gray-100 rounded-md shadow-lg w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Administrar Módulos</h2>
        <button
          onClick={toggleModal}
          className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          <AddIcon className="mr-2" /> Agregar Módulo
        </button>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={toggleModal}
        className="fixed inset-0 flex justify-center items-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        contentLabel="Agregar Módulo"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full h-full overflow-y-auto">
          <button
            onClick={toggleModal}
            className="absolute top-2 right-2 text-red-500"
          >
            <CancelIcon fontSize="large" />
          </button>
          <ModuloCreate
            nivelId={nivelId}
            closeModalAndReload={closeModalAndReload}
          />
        </div>
      </Modal>

      {loading && <div className="text-center text-gray-500">Cargando módulos...</div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}
      {modulos.length > 0 ? (
        <ul>
          {modulos.map((modulo, index) => (
            <li
              key={modulo.id}
              className={`my-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md transition-transform ease-in-out duration-300 ${highlightedIndex === index ? "bg-yellow-100" : ""}`}
            >
              <div className="flex justify-between items-center">
                <Link to={`/nivel/${nivelId}/modulo/${modulo.id}`} className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">
                    <span className="text-blue-500">{modulo.titulo.substring(0, 3)}</span>
                    {modulo.titulo.substring(3)}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {modulo.contenido.length > 100
                      ? `${modulo.contenido.substring(0, 100)}...`
                      : modulo.contenido}
                  </p>
                </Link>
                <div className="flex flex-col ml-4 space-y-2">
                  <button
                    onClick={() => handleMove(index, "up")}
                    className={`bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 ${index === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={index === 0}
                  >
                    <ArrowUpwardIcon />
                  </button>
                  <button
                    onClick={() => handleMove(index, "down")}
                    className={`bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-300 ${index === modulos.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={index === modulos.length - 1}
                  >
                    <ArrowDownwardIcon />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">Este nivel aún no tiene módulos.</p>
      )}
    </div>
  );
}

ModuloAdmin.propTypes = {
  nivelId: PropTypes.string.isRequired,
};

export default ModuloAdmin;