// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleOutline,
  CancelOutlined,
  PageviewOutlined,
  PeopleAltOutlined,
} from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import InfoIcon from "@mui/icons-material/Info";
import CreateCampaign from "./CreateCampain";
import CampainEdit from "./CampainEdit";

export default function AdminCampaign() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("/campein");
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error al obtener las campañas:", error);
      }
    };

    fetchCampaigns();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDetailsModal = (campaign) => {
    setSelectedCampaign(campaign);
    setDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalOpen(false);
  };

  const handleEditModalOpen = (campaignId) => {
    setSelectedCampaignId(campaignId);
    setEditModalOpen(true);
  };

  const handleEditCampaign = () => {
    // Abrir el modal de edición
    handleEditModalOpen(selectedCampaign.id);
  };

  const handleDeleteCampaign = () => {
    setConfirmDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/campein/${selectedCampaign.id}`);
      // Actualizar la lista de campañas después de eliminar
      const updatedCampaigns = campaigns.filter(
        (campaign) => campaign.id !== selectedCampaign.id
      );
      setCampaigns(updatedCampaigns);
      setConfirmDeleteModalOpen(false);
      closeDetailsModal();
    } catch (error) {
      console.error("Error al eliminar la campaña:", error);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-8 px-10 py-5">
      <h1 className="text-2xl font-bold mb-4">Administrar Campañas</h1>
      <div className="flex mb-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4 flex items-center"
          onClick={openModal}
        >
          <AddCircleIcon /> Crear Nueva Campaña
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mr-4">
          <BarChartIcon className="text-green-400" />
        </button>
        <button 
        onClick={() => navigate('/admin/campain/AllUserCampain')}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
          <PeopleAltOutlined className="text-blue-400" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-400 px-4 py-2">Nombre</th>
              <th className="border border-gray-400 px-4 py-2">
                Fecha de Inicio
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Fecha de Finalización
              </th>
              <th className="border border-gray-400 px-4 py-2">Estado</th>
              <th className="border border-gray-400 px-4 py-2">LandingPages</th>
              <th className="border border-gray-400 px-4 py-2">Usuarios</th>
              <th className="border border-gray-400 px-4 py-2">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="text-center">
                <td className="border border-gray-400 px-4 py-2">
                  {campaign.name}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {campaign.fechaInicio}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {campaign.fechaFinalizacion}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {campaign.activa ? (
                    <span className="flex items-center justify-center text-green-500">
                      <CheckCircleOutline />
                      <span className="ml-1">Activa</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center text-red-500">
                      <CancelOutlined />
                      <span className="ml-1">Inactiva</span>
                    </span>
                  )}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <button className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    <PageviewOutlined fontSize="large" />
                  </button>
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <button className="text-green-500 hover:text-green-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    <PeopleAltOutlined fontSize="large" />
                  </button>
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <button
                    className="text-orange-500 hover:text-orange-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => openDetailsModal(campaign)}
                  >
                    <InfoIcon fontSize="large" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
              style={{ maxHeight: "85vh" }}
            >
              <div className="absolute top-0 right-0 pt-2 pr-2">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={closeModal}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <CreateCampaign closeModal={closeModal} />
            </div>
          </div>
        </div>
      )}

      {detailsModalOpen && selectedCampaign && (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-y-auto">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="absolute top-0 right-0 pt-2 pr-2">
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={closeDetailsModal}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-10 py-10">
              <h1 className="text-lg font-bold mb-4 text-center">
                Detalles de la Campaña
              </h1>
              <div className="mb-4">
                <p>
                  <span className="font-bold">Nombre:</span>{" "}
                  {selectedCampaign.name}
                </p>
                <p>
                  <span className="font-bold">Fecha de Inicio:</span>{" "}
                  {selectedCampaign.fechaInicio}
                </p>
                <p>
                  <span className="font-bold">Fecha de Finalización:</span>{" "}
                  {selectedCampaign.fechaFinalizacion}
                </p>
                <p>
                  <span className="font-bold">Estado:</span>{" "}
                  {selectedCampaign.activa ? "Activa" : "Inactiva"}
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleEditCampaign}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                >
                  Modificar
                </button>
                <button
                  onClick={handleDeleteCampaign}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editModalOpen && selectedCampaignId && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
              style={{ maxHeight: "85vh" }}
            >
              <div className="absolute top-0 right-0 pt-2 pr-2">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setEditModalOpen(false)}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <CampainEdit campaignId={selectedCampaignId} />
            </div>
          </div>
        </div>
      )}

      {confirmDeleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full"
              style={{ maxHeight: "50vh" }}
            >
              <div className="px-10 py-10">
                <h1 className="text-lg font-bold mb-4 text-center">
                  ¿Estás seguro de eliminar la campaña?
                </h1>
                <div className="flex justify-center">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
