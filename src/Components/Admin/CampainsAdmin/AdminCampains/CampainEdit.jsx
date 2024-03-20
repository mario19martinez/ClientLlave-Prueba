// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CampainEdit({ campaignId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(true);
  const [campaignData, setCampaignData] = useState(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await axios.get(`/campein/${campaignId}`);
        setCampaignData(response.data);
      } catch (error) {
        console.error("Error al obtener la información de la campaña:", error);
      }
    };

    fetchCampaignData();
  }, [campaignId]);

  const validationSchema = Yup.object().shape({
    campaignName: Yup.string().required("El nombre de la campaña es requerido"),
    startDate: Yup.date()
      .required("La fecha de inicio es requerida")
      .min(
        new Date().toISOString().split("T")[0],
        "La fecha de inicio debe ser en el futuro"
      ),
    endDate: Yup.date()
      .required("La fecha de finalización es requerida")
      .min(
        Yup.ref("startDate"),
        "La fecha de finalización debe ser después de la fecha de inicio"
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.put(`/campein/${campaignId}`, {
        name: values.campaignName,
        fechaInicio: values.startDate,
        fechaFinalizacion: values.endDate,
      });

      if (response.status === 200) {
        setModalMessage("La campaña ha sido editada con éxito");
        setModalSuccess(true);
        setModalOpen(true);
      } else {
        throw new Error("Error al editar la campaña");
      }

      setSubmitting(false);
    } catch (error) {
      console.error("Error al editar la campaña:", error);
      setModalMessage("Error al editar la campaña");
      setModalSuccess(false);
      setModalOpen(true);
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Editar Campaña</h1>
        {campaignData && (
          <Formik
            initialValues={{
              campaignName: campaignData.name,
              startDate: campaignData.fechaInicio,
              endDate: campaignData.fechaFinalizacion,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    htmlFor="campaignName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Nombre de Campaña
                  </label>
                  <Field
                    type="text"
                    name="campaignName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Nombre de Campaña"
                    aria-label="Nombre de Campaña"
                  />
                  <ErrorMessage
                    name="campaignName"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="startDate"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Fecha de Inicio
                  </label>
                  <Field
                    type="date"
                    name="startDate"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    aria-label="Fecha de Inicio"
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="endDate"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Fecha de Finalización
                  </label>
                  <Field
                    type="date"
                    name="endDate"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    aria-label="Fecha de Finalización"
                  />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    Modificar Campaña
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}

        {modalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md text-center">
              {modalSuccess ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-500 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-500 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              <p>{modalMessage}</p>
              <button
                onClick={() => {
                  closeModal();
                  window.location.reload();
                }}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

CampainEdit.propTypes = {
  campaignId: PropTypes.number.isRequired,
};