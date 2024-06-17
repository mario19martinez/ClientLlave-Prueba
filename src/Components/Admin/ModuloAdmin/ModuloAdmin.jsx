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
import SortIcon from "@mui/icons-material/Sort";

function ModuloAdmin({ nivelId }) {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [highlightedIndex, setHighlightedIndex] = useState(null);

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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
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

    setModulos(updatedModulos);
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
    <div className="p-8 bg-gray-200 rounded-md shadow-md w-full max-w-4xl mx-auto">
      <div className="flex space-x-3 mb-4">
        <button
          onClick={toggleModal}
          className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          <AddIcon className="mr-2" /> Agregar Módulo
        </button>
        <button
          onClick={toggleSortOrder}
          className="flex items-center bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
        >
          <SortIcon className="mr-2" /> {sortOrder === "asc" ? "Ordenar Descendente" : "Ordenar Ascendente"}
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
          {sortedModulos.map((modulo, index) => (
            <li
              key={modulo.id}
              className={`my-4 p-4 bg-white rounded-md shadow-md transition-transform ease-in-out duration-300 ${highlightedIndex === index ? "bg-yellow-200" : ""}`}
            >
              <div className="flex justify-between items-center">
                <Link to={`/nivel/${nivelId}/modulo/${modulo.id}`} className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{modulo.titulo}</h3>
                  <p className="text-gray-600">
                    {modulo.contenido.length > 100
                      ? `${modulo.contenido.substring(0, 100)}...`
                      : modulo.contenido}
                  </p>
                </Link>
                <div className="flex flex-col ml-4 space-y-2">
                  <button
                    onClick={() => handleMove(index, "up")}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300"
                  >
                    <ArrowUpwardIcon />
                  </button>
                  <button
                    onClick={() => handleMove(index, "down")}
                    className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-300"
                  >
                    <ArrowDownwardIcon />
                  </button>
                </div>
              </div>
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