import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditarTransmision from "./EditarTransmision";
import CrearTransmision from "./Creartransmision";
import TransmisionDetails from "./TransmisionesDetails";
import ContadorTransmision from "./ContadorTransmision";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function TransmisionAdmin() {
  const navigate = useNavigate();
  const [transmisiones, setTransmisiones] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showCountdownModal, setShowCountdownModal] = useState(false);
  const [selectedTransmisionDate, setSelectedTransmisionDate] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const transmisionesPorPagina = 6;

  useEffect(() => {
    cargarTransmisiones();
  }, []);

  const cargarTransmisiones = () => {
    axios
      .get("/transmisiones")
      .then((response) => {
        setTransmisiones(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las transmisiones", error);
        alert("No se pudieron cargar las transmisiones");
      });
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowConfirmation(true);
  };

  const handleDelete = () => {
    axios
      .delete(`/transmisiones/${selectedId}`)
      .then(() => {
        cargarTransmisiones();
        setShowConfirmation(false);
      })
      .catch((error) => {
        console.error("Error al eliminar la transmisión", error);
        alert("No se pudo eliminar la transmisión");
      });
  };

  const extractYouTubeId = (url) => {
    const regExp =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const handleEditClick = (e, id) => {
    e.stopPropagation();
    setSelectedId(id);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedId(null);
  };

  const handleNewTransmisionClick = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleViewDetails = (id) => {
    setSelectedId(id);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedId(null);
  };

  const handleCountdownClick = (fechaTransmision) => {
    setSelectedTransmisionDate(fechaTransmision);
    setShowCountdownModal(true);
  };

  const handleCloseCountdownModal = () => {
    setShowCountdownModal(false);
  };

  const ultimoIndex = currentPage * transmisionesPorPagina;
  const primerIndex = ultimoIndex - transmisionesPorPagina;
  const transmisionesActuales = transmisiones.slice(primerIndex, ultimoIndex);

  const cambiarPagina = (numeroPagina) => {
    setCurrentPage(numeroPagina);
  };

  const totalPaginas = Math.ceil(transmisiones.length / transmisionesPorPagina);
  const paginas = [];
  for (let i = 1; i <= totalPaginas; i++) {
    paginas.push(i);
  }

  // Función para formatear la fecha y hora en formato legible para el usuario
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    };
    return dateTime.toLocaleString("es-ES", options);
  };
  

  const fechaHoraActual = new Date();
  console.log(fechaHoraActual);

  console.log(transmisiones);

  return (
    <div>
      <div className="py-3 justify-start">
        <button
          onClick={() => navigate("/AdminPage")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Atras
        </button>
      </div>
      <div className="flex flex-col my-4 mx-6">
        <h2 className="text-2xl font-bold pb-2">Listado de Transmisiones</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-48 h-12"
          onClick={handleNewTransmisionClick}
        >
          Nueva Transmisión
        </button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {transmisionesActuales.map((transmision) => (
          <div
            key={transmision.id}
            className="border bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden w-72"
          >
            <img
              src={`https://img.youtube.com/vi/${extractYouTubeId(
                transmision.urltransmision
              )}/hqdefault.jpg`}
              alt={transmision.titulo}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{transmision.titulo}</h3>
              <p
                className={`${
                  transmision.estado ? "text-green-500" : "text-red-500"
                } font-semibold`}
              >
                Estado: {transmision.estado ? "Activo" : "Inactivo"}
              </p>
              <p>
                <strong>Fecha de Transmisión:</strong>{" "}
                {formatDateTime(transmision.fechaTransmision)}
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() =>
                    handleCountdownClick(transmision.fechaTransmision)
                  }
                  className="p-2"
                >
                  <AccessTimeIcon style={{ color: "#07314D" }} />
                </button>
                <button
                  onClick={(e) => handleEditClick(e, transmision.id)}
                  className="p-2"
                >
                  <EditIcon style={{ color: "#4CAF50" }} />
                </button>
                <button
                  onClick={() => handleViewDetails(transmision.id)}
                  className="p-2"
                >
                  <VisibilityIcon style={{ color: "#2196F3" }} />
                </button>
                <button
                  onClick={() => confirmDelete(transmision.id)}
                  className="p-2"
                >
                  <DeleteIcon style={{ color: "#F44336" }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {paginas.map((numero) => (
          <button
            key={numero}
            onClick={() => cambiarPagina(numero)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
          >
            {numero}
          </button>
        ))}
      </div>

      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 max-w-4xl">
            <button
              onClick={handleCloseDetailsModal}
              className="absolute top-2 right-2"
            >
              <CloseIcon style={{ color: "#FF5722" }} />
            </button>
            <TransmisionDetails id={selectedId} />
            <button
              onClick={handleCloseDetailsModal}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showCountdownModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
          <div className="bg-gray-300  p-5 rounded-lg shadow-lg flex flex-col items-center">
            {/* Componente Contador */}
            <ContadorTransmision fechaTransmision={selectedTransmisionDate} />

            {/* Botón Aceptar */}
            <button
              onClick={handleCloseCountdownModal}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
        <EditarTransmision
          showEditModal={showEditModal}
          selectedId={selectedId}
          handleCloseEditModal={handleCloseEditModal}
        />
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="p-4 rounded-lg shadow-lg w-3/4 max-w-4xl">
            <button
              onClick={handleCloseCreateModal}
              className="absolute top-2 right-2"
            >
              <CloseIcon style={{ color: "#FF5722" }} />
            </button>
            <CrearTransmision handleCloseCreateModal={handleCloseCreateModal} />
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-lg font-semibold mb-4">
              ¿Estás seguro de eliminar esta transmisión?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
