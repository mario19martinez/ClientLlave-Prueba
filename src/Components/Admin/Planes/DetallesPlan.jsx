import { useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { FaEdit, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import EditarPlan from "./EditarPlan";
import { toast } from "react-toastify";

export default function DetallesPlan({ PlanId }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [cardModalIsOpen, setCardModalIsOpen] = useState(false);
  const [planToEdit, setPlanToEdit] = useState(null);
  const navigate = useNavigate();

  const fetchPlan = useCallback(async () => {
    try {
      const response = await axios.get(`/plan/${PlanId}`);
      setPlan(response.data);
    } catch (error) {
      console.error("Error al obtener los detalles del plan:", error);
    } finally {
      setLoading(false);
    }
  }, [PlanId]);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  const openEditModal = () => {
    setPlanToEdit(plan);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setPlanToEdit(null);
    setEditModalIsOpen(false);
  };

  const openCardModal = () => {
    setCardModalIsOpen(true);
  };

  const closeCardModal = () => {
    setCardModalIsOpen(false);
  };

  const handleSuccess = () => {
    toast.success("El plan se ha actualizado con éxito");
    setEditModalIsOpen(false);
    // Volver a cargar los detalles del plan actualizado
    fetchPlan(); // Llamar a fetchPlan para actualizar los detalles
  };

  const handleError = (error) => {
    toast.error("Error al actualizar el plan");
    console.error(error);
  };

  if (loading) {
    return <div className="text-center py-20">Cargando...</div>;
  }

  if (!plan) {
    return (
      <div className="text-center py-20">
        No se encontraron detalles del plan.
      </div>
    );
  }

  const precio = parseFloat(plan.Precio);
  const descuento = plan.porcentaje_descuento ? parseFloat(plan.porcentaje_descuento) : 0;
  const precioConDescuento = precio - (precio * (descuento / 100));

  // Convertir esquema en un array
  const esquemaArray = plan.esquema
    ? plan.esquema.split(",").map((item) => item.trim())
    : [];

  return (
    <div className="container mx-auto p-6 px-5">
      <button
            className="bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            onClick={() => navigate(-1)}
          >
            &larr; Atrás
          </button>
      <div className="bg-white shadow-md rounded-lg py-5 px-5">
          <h1 className="text-3xl font-bold">Detalles del Plan</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2 py-5">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              onClick={openEditModal}
            >
              <FaEdit className="mr-2" /> Editar Plan
            </button>
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
              onClick={() => navigate(`/Planes/${PlanId}`)}
            >
              <FaInfoCircle className="mr-2" /> Ver Detalles del Usuario
            </button>
            <button
              className="bg-yellow-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
              onClick={openCardModal}
            >
              <FaInfoCircle className="mr-2" /> Ver Card del Plan
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <span className="font-semibold">Descripción:</span>
            <span className="text-gray-700">{plan.descripcion}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Porcentaje de Descuento:</span>
            <span className="text-gray-700">{plan.porcentaje_descuento}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Descuento:</span>
            <span className="text-gray-700">
              {plan.descuento ? "Sí" : "No"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Activo:</span>
            <span className="text-gray-700">{plan.activo ? "Sí" : "No"}</span>
          </div>
          <div>
            <div className="p-8 bg-blue-900 rounded-lg shadow-lg">
              <div className="mb-4 text-center">
                <p className="text-xl font-medium tracking-wide text-white">
                  {plan.name}
                </p>
                <div className="flex items-center justify-center">
                  <p className="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                    {plan.Precio}
                  </p>
                  <p className="text-lg text-blue-500">USD</p>
                </div>
              </div>
              <ul className="mb-8 space-y-2">
                {esquemaArray.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <div className="mr-3">
                      <svg
                        className="w-4 h-4 text-teal-400"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeWidth="2"
                      >
                        <polyline
                          fill="none"
                          stroke="currentColor"
                          points="6,12 10,16 18,8"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          fill="none"
                          r="11"
                          stroke="currentColor"
                        />
                      </svg>
                    </div>
                    <p className="font-medium text-blue-300">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

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
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )}
      </Modal>

      <Modal
        isOpen={cardModalIsOpen}
        onRequestClose={closeCardModal}
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
        <div className="p-8 bg-blue-900 rounded-lg shadow-lg">
          <div className="mb-4 text-center">
            <p className="text-xl font-medium tracking-wide text-white">
              {plan.name}
            </p>
            <div className="flex items-center justify-center">
              <p className="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                {plan.descuento ? (
                  <>
                    {precioConDescuento.toFixed(0)}
                    <span className="text-lg text-blue-500"> USD</span>
                    <span className="block text-sm text-gray-400"> (Antes {precio.toFixed(0)} USD)</span>
                  </>
                ) : (
                  <>
                    {precio.toFixed(0)}
                    <span className="text-lg text-blue-500"> USD</span>
                  </>
                )}
              </p>
            </div>
          </div>
          {plan.descuento && (
            <div className="absolute top-0 right-0 px-4 py-2 text-base font-bold text-white bg-red-600 rounded-lg transform -rotate-12 -translate-y-1/2">
              ¡OFERTA!
            </div>
          )}
          <ul className="mb-8 space-y-2">
            {esquemaArray.map((feature, i) => (
              <li key={i} className="flex items-center">
                <div className="mr-3">
                  <svg
                    className="w-4 h-4 text-teal-400"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeWidth="2"
                  >
                    <polyline
                      fill="none"
                      stroke="currentColor"
                      points="6,12 10,16 18,8"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      fill="none"
                      r="11"
                      stroke="currentColor"
                    />
                  </svg>
                </div>
                <p className="font-medium text-blue-300">{feature}</p>
              </li>
            ))}
          </ul>
          <a
            onClick={() => navigate(`/Planes/${plan.id}`)}
            className="inline-flex items-center justify-center text-center w-full h-12 px-6 font-medium tracking-wide text-blue-900 transition duration-200 rounded shadow-md bg-teal-400 hover:bg-teal-700 focus:shadow-outline focus:outline-none"
          >
            Más Información
          </a>
        </div>
        <div className="w-11/12 h-2 mx-auto bg-blue-900 rounded-b opacity-75 mt-2" />
        <div className="w-10/12 h-2 mx-auto bg-blue-900 rounded-b opacity-50 mt-1" />
        <div className="w-9/12 h-2 mx-auto bg-blue-900 rounded-b opacity-25 mt-1" />
      </Modal>
    </div>
  );
}

DetallesPlan.propTypes = {
  PlanId: PropTypes.string.isRequired,
};