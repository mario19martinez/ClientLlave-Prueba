import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaPlus,
  FaCheck,
  FaTimes,
  FaTrash,
  FaEdit,
  FaEye,
} from "react-icons/fa";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CrearPlan from "./CrearPlan";
import EditarPlan from "./EditarPlan";

export default function PlanesAdmin() {
  const navigate = useNavigate();
  const [planes, setPlanes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [planToEdit, setPlanToEdit] = useState(null);
  const [planToDelete, setPlanToDelete] = useState(null);

  const fetchPlanes = async () => {
    try {
      const response = await axios.get("/planes");
      setPlanes(response.data);
    } catch (error) {
      console.error("Error al obtener los planes:", error);
    }
  };

  useEffect(() => {
    fetchPlanes();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openEditModal = (plan) => {
    setPlanToEdit(plan);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setPlanToEdit(null);
    setEditModalIsOpen(false);
  };

  const openDeleteModal = (plan) => {
    setPlanToDelete(plan);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setPlanToDelete(null);
    setDeleteModalIsOpen(false);
  };

  const handlePlanCreated = (plan) => {
    fetchPlanes();
    toast.success("Plan creado exitosamente");
    closeModal();
  };

  const handlePlanEdited = (plan) => {
    fetchPlanes();
    toast.success("Plan editado exitosamente");
    closeEditModal();
  };

  const handlePlanError = (error) => {
    toast.error(`Error al crear el plan: ${error.message}`);
  };

  const deletePlan = async () => {
    try {
      await axios.delete(`/plan/${planToDelete.id}`);
      fetchPlanes();
      toast.success("Plan eliminado exitosamente");
      closeDeleteModal();
    } catch (error) {
      toast.error(`Error al eliminar el plan: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Planes</h1>
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          onClick={openModal}
        >
          <FaPlus className="mr-2" /> Crear Plan
        </button>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {planes.map((plan) => (
          <div
            key={plan.id}
            className="relative bg-white shadow-md rounded-lg p-4 group"
          >
            <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
            <p className="text-gray-700 mb-4">Precio: {plan.Precio}</p>
            <div className="flex items-center">
              <span className="mr-2">Activo:</span>
              {plan.activo ? (
                <FaCheck className="text-green-500" />
              ) : (
                <FaTimes className="text-red-500" />
              )}
            </div>
            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => navigate(`/admin/planes/${plan.id}`)}
              >
                <FaEye />
              </button>
              <button
                className="text-green-600 hover:text-green-800"
                onClick={() => openEditModal(plan)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => openDeleteModal(plan)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "500px",
            padding: "20px",
            borderRadius: "8px",
            maxHeight: "80vh",
            overflowY: "auto",
          },
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <CrearPlan onSuccess={handlePlanCreated} onError={handlePlanError} />
      </Modal>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "500px",
            padding: "20px",
            borderRadius: "8px",
            maxHeight: "80vh",
            overflowY: "auto",
          },
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={closeEditModal}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        {planToEdit && (
          <EditarPlan
            planId={planToEdit.id}
            plan={planToEdit}
            onSuccess={handlePlanEdited}
            onError={handlePlanError}
          />
        )}
      </Modal>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "400px",
            padding: "20px",
            borderRadius: "8px",
          },
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Confirmar eliminación</h2>
          <button
            onClick={closeDeleteModal}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <p>
          ¿Está seguro de que desea eliminar el plan{" "}
          <strong>{planToDelete?.name}</strong>?
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={deletePlan}
            className="bg-red-600 text-white py-2 px-4 rounded-lg mr-2 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          >
            Eliminar
          </button>
          <button
            onClick={closeDeleteModal}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50"
          >
            Cancelar
          </button>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}
