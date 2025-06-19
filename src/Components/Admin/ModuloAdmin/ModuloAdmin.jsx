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
  const [updatingIndex, setUpdatingIndex] = useState(null);

  useEffect(() => {
    fetchModulos();
  }, [nivelId]);

  const fetchModulos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/niveles/${nivelId}/modulos`);
      setModulos(sortModulos(response.data));
    } catch (error) {
      setError("No se pudieron cargar los módulos.");
    } finally {
      setLoading(false);
    }
  };

  const sortModulos = (items) => {
    return items.sort((a, b) => {
      const aNum = parseInt(a.titulo.match(/^\d+/)?.[0] || "999", 10);
      const bNum = parseInt(b.titulo.match(/^\d+/)?.[0] || "999", 10);
      return aNum - bNum;
    });
  };

  const toggleModal = () => setShowModal(!showModal);

  const closeModalAndReload = async () => {
    setShowModal(false);
    await fetchModulos();
  };

  const updateModuloTitles = async (newOrder) => {
    const updated = newOrder.map((modulo, i) => ({
      ...modulo,
      titulo: `${(i + 1).toString().padStart(2, "0")} ${modulo.titulo.replace(/^\d+\s*/, "")}`,
    }));

    try {
      for (let modulo of updated) {
        await axios.put(`/nivel/${nivelId}/modulo/${modulo.id}`, { titulo: modulo.titulo });
      }
      setModulos(sortModulos(updated));
    } catch (err) {
      setError("Error al reordenar módulos.");
    }
  };

  const handleMove = async (index, direction) => {
    const isFirst = index === 0;
    const isLast = index === modulos.length - 1;

    if ((direction === "up" && isFirst) || (direction === "down" && isLast)) return;

    const newOrder = [...modulos];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];

    setUpdatingIndex(index);
    await updateModuloTitles(newOrder);
    setHighlightedIndex(swapIndex);
    setTimeout(() => {
      setHighlightedIndex(null);
      setUpdatingIndex(null);
    }, 1200);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Administrar Módulos</h2>
        <button
          onClick={toggleModal}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
        >
          <AddIcon className="mr-2" /> Agregar
        </button>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={toggleModal}
        className="fixed inset-0 flex justify-center items-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl relative">
          <button onClick={toggleModal} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
            <CancelIcon fontSize="large" />
          </button>
          <ModuloCreate nivelId={nivelId} closeModalAndReload={closeModalAndReload} />
        </div>
      </Modal>

      {loading && <p className="text-center text-gray-500">Cargando módulos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <ul className="space-y-3 transition-all duration-500">
        {modulos.map((modulo, i) => (
          <li
            key={modulo.id}
            className={`p-4 my-1 relative rounded-lg border border-gray-200 shadow-sm transition-all duration-300 transform ${
              highlightedIndex === i ? "bg-yellow-100 scale-[1.01] animate-bounce-move" : "bg-gray-50"
            }`}
          >
            <div className="flex justify-between items-start">
              <Link to={`/nivel/${nivelId}/modulo/${modulo.id}`} className="flex-1">
                <h3 className="text-lg font-semibold text-gray-700">
                  <span className="text-blue-500">{modulo.titulo.slice(0, 3)}</span>
                  {modulo.titulo.slice(3)}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {modulo.contenido.length > 100 ? `${modulo.contenido.slice(0, 100)}...` : modulo.contenido}
                </p>
              </Link>
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => handleMove(i, "up")}
                  disabled={i === 0 || updatingIndex !== null}
                  title="Mover arriba"
                  className={`p-2 rounded bg-green-500 hover:bg-green-600 text-white disabled:opacity-50`}
                >
                  <ArrowUpwardIcon />
                </button>
                <button
                  onClick={() => handleMove(i, "down")}
                  disabled={i === modulos.length - 1 || updatingIndex !== null}
                  title="Mover abajo"
                  className={`p-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white disabled:opacity-50`}
                >
                  <ArrowDownwardIcon />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 🔧 Animación personalizada con Tailwind */}
      <style>
        {`
          @layer utilities {
            @keyframes bounce-move {
              0%   { transform: translateY(0); }
              30%  { transform: translateY(-6px); }
              60%  { transform: translateY(3px); }
              100% { transform: translateY(0); }
            }
            .animate-bounce-move {
              animation: bounce-move 0.4s ease-in-out;
            }
          }
        `}
      </style>
    </div>
  );
}

ModuloAdmin.propTypes = {
  nivelId: PropTypes.string.isRequired,
};

export default ModuloAdmin;