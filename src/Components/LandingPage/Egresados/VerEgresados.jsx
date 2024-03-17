// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import styles from "./EgresadosAnimate.module.css";
import axios from "axios";
import { Modal, Typography, Button } from "@mui/material";

export default function VerEgresados() {
  const [egresados, setEgresados] = useState([]);
  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEgresado, setSelectedEgresado] = useState(null);

  useEffect(() => {
    axios
      .get("/egresados")
      .then((response) => {
        setEgresados(response.data);
        console.log("Egresados:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const renderMedia = (media) => {
    if (media.includes("youtube.com")) {
      const videoId = new URL(media).searchParams.get("v");
      return (
        <div className="w-full md:w-1/2 relative overflow-hidden rounded-lg mb-4 md:mb-0 md:mr-4">
          <div
            style={{ paddingTop: "56.25%" }}
            className="aspect-w-16 aspect-h-9"
          >
            <iframe
              className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-100 hover:opacity-75"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      );
    } else {
      return (
        <img
          style={{ width: "auto", height: "auto" }}
          className="md:w-1/2 object-cover object-center rounded-lg mb-4 md:mb-0 md:mr-4 transition-opacity duration-300 opacity-100 hover:opacity-75"
          src={media}
          alt="Media"
        />
      );
    }
  };

  const truncateContent = (content) => {
    return content.length > 340 ? content.substring(0, 340) + "..." : content;
  };

  const handleModalOpen = (content, egresado) => {
    setSelectedEgresado(egresado);
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEgresado(null);
  };

  return (
    <div className="pt-5 pb-5">
      <h1 className="text-3xl font-bold text-center mb-8">
        Nuestros Egresados
      </h1>
      <div className="px-4 md:px-0">
        {egresados.map((egresado) => (
          <div
            key={egresado.id}
            className={`max-w-4xl mx-auto p-4 pb-16 bg-gray-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 mb-16 md:mb-24 ${styles.Template}`}
          >
            {/* Condición para renderizar la tarjeta para pantallas pequeñas */}
            {window.innerWidth < 640 && (
              <div className="flex flex-col items-center">
                {egresado.media && renderMedia(egresado.media)}
                <div className="flex-grow p-4 w-full">
                  <h2 className="text-xl font-semibold mb-2">
                    {egresado.name}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: truncateContent(egresado.content),
                    }}
                    className="text-gray-600"
                    style={{ textAlign: "justify" }}
                  ></div>
                  {egresado.content.length > 340 && (
                    <button
                      className="text-blue-600"
                      onClick={() =>
                        handleModalOpen(egresado.content, egresado)
                      }
                    >
                      Ver Más
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Condición para renderizar la tarjeta para pantallas medianas y grandes */}
            {window.innerWidth >= 640 && (
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Card Template 1 */}
                {egresado.template === "1" && (
                  <>
                    {egresado.media && renderMedia(egresado.media)}
                    <div className="flex-grow p-4 md:w-1/2">
                      <h2 className="text-xl font-semibold mb-2">
                        {egresado.name}
                      </h2>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: truncateContent(egresado.content),
                        }}
                        className="text-gray-600"
                        style={{ textAlign: "justify" }}
                      ></div>
                      {egresado.content.length > 340 && (
                        <button
                          className="text-blue-600"
                          onClick={() =>
                            handleModalOpen(egresado.content, egresado)
                          }
                        >
                          Ver Más
                        </button>
                      )}
                    </div>
                  </>
                )}

                {/* Card Template 2 */}
                {egresado.template === "2" && (
                  <>
                    <div className="flex-grow p-4 md:w-1/2">
                      <h2 className="text-xl font-semibold mb-2">
                        {egresado.name}
                      </h2>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: truncateContent(egresado.content),
                        }}
                        className="text-gray-600"
                        style={{ textAlign: "justify" }}
                      ></div>
                      {egresado.content.length > 340 && (
                        <button
                          className="text-blue-600"
                          onClick={() =>
                            handleModalOpen(egresado.content, egresado)
                          }
                        >
                          Ver Más
                        </button>
                      )}
                    </div>
                    {egresado.media && renderMedia(egresado.media)}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <Modal open={showModal} onClose={handleCloseModal}>
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
          <div className="relative mx-auto max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg">
            <Typography variant="h5" component="div" className="mb-4">
              {selectedEgresado && selectedEgresado.name}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              className="text-gray-600 mb-4"
              style={{ textAlign: "justify" }}
            >
              <div dangerouslySetInnerHTML={{ __html: modalContent }} />
            </Typography>
            <Button
              onClick={handleCloseModal}
              variant="contained"
              className="w-full"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
