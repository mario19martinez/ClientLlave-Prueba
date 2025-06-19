import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Typography, Button } from "@mui/material";
import styles from "./EgresadosAnimate.module.css";

export default function VerEgresados() {
  const [egresados, setEgresados] = useState([]);
  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEgresado, setSelectedEgresado] = useState(null);

  useEffect(() => {
    axios
      .get("/egresados")
      .then((response) => {
        const sortedEgresados = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setEgresados(sortedEgresados);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderMedia = (media) => {
    const wrapperStyle = {
      width: "100%",
      aspectRatio: "16 / 9",
      overflow: "hidden",
      borderRadius: "12px",
      backgroundColor: "#000",
    };

    if (media.includes("youtube.com")) {
      const videoId = new URL(media).searchParams.get("v");
      return (
        <div style={wrapperStyle} className="shadow-md hover:shadow-xl transition-all">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            className="w-full h-full"
            allowFullScreen
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      );
    } else {
      return (
        <div style={wrapperStyle} className="shadow-md hover:shadow-xl transition-all">
          <img
            src={media}
            alt="Egresado"
            className="w-full h-full object-cover object-center"
          />
        </div>
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
    <div className="pt-10 pb-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Nuestros Egresados</h1>

      <div className="space-y-12">
        {egresados.map((egresado) => {
          const hasContent = !!egresado.content?.trim();

          return (
            <div
              key={egresado.id}
              className={`max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ${styles.Template}`}
            >
              {!hasContent ? (
                <div className="flex flex-col md:flex-row gap-8 items-center justify-center text-center">
                  {egresado.template === "1" && egresado.media && (
                    <>
                      <div className="w-full md:w-1/2 flex justify-center">
                        <div className="max-w-[500px] w-full">{renderMedia(egresado.media)}</div>
                      </div>
                      <div className="w-full md:w-1/2 flex justify-center items-center">
                        <h2 className="text-2xl font-semibold text-gray-800">
                          {egresado.name}
                          {egresado.flag && (
                            <img
                              src={egresado.flag}
                              alt="bandera"
                              className="h-6 w-auto inline-block ml-2"
                            />
                          )}
                        </h2>
                      </div>
                    </>
                  )}

                  {egresado.template === "2" && egresado.media && (
                    <>
                      <div className="w-full md:w-1/2 flex justify-center items-center">
                        <h2 className="text-2xl font-semibold text-gray-800">
                          {egresado.name}
                          {egresado.flag && (
                            <img
                              src={egresado.flag}
                              alt="bandera"
                              className="h-6 w-auto inline-block ml-2"
                            />
                          )}
                        </h2>
                      </div>
                      <div className="w-full md:w-1/2 flex justify-center">
                        <div className="max-w-[500px] w-full">{renderMedia(egresado.media)}</div>
                      </div>
                    </>
                  )}

                  {!egresado.media && (
                    <div className="w-full text-center">
                      <h2 className="text-2xl font-semibold text-gray-800">
                        {egresado.name}
                        {egresado.flag && (
                          <img
                            src={egresado.flag}
                            alt="bandera"
                            className="h-6 w-auto inline-block ml-2"
                          />
                        )}
                      </h2>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {egresado.template === "1" && (
                    <>
                      <div className="w-full md:w-1/2">{renderMedia(egresado.media)}</div>
                      <div className="w-full md:w-1/2 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-semibold text-gray-800">{egresado.name}</h2>
                          {egresado.flag && (
                            <img src={egresado.flag} alt="bandera" className="h-6 w-auto" />
                          )}
                        </div>
                        <div
                          className="text-gray-600 text-justify"
                          dangerouslySetInnerHTML={{ __html: truncateContent(egresado.content) }}
                        />
                        {egresado.content.length > 340 && (
                          <button
                            onClick={() => handleModalOpen(egresado.content, egresado)}
                            className="self-start text-sm font-medium text-blue-600 hover:underline"
                          >
                            Ver más
                          </button>
                        )}
                      </div>
                    </>
                  )}

                  {egresado.template === "2" && (
                    <>
                      <div className="w-full md:w-1/2 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-semibold text-gray-800">{egresado.name}</h2>
                          {egresado.flag && (
                            <img src={egresado.flag} alt="bandera" className="h-6 w-auto" />
                          )}
                        </div>
                        <div
                          className="text-gray-600 text-justify"
                          dangerouslySetInnerHTML={{ __html: truncateContent(egresado.content) }}
                        />
                        {egresado.content.length > 340 && (
                          <button
                            onClick={() => handleModalOpen(egresado.content, egresado)}
                            className="self-start text-sm font-medium text-blue-600 hover:underline"
                          >
                            Ver más
                          </button>
                        )}
                      </div>
                      <div className="w-full md:w-1/2">{renderMedia(egresado.media)}</div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50 px-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-3xl w-full">
            {selectedEgresado && (
              <Typography variant="h5" className="mb-4 text-center font-bold text-gray-800">
                {selectedEgresado.name}{" "}
                {selectedEgresado.flag && (
                  <img src={selectedEgresado.flag} alt="bandera" className="h-6 w-auto inline-block" />
                )}
              </Typography>
            )}
            <Typography variant="body1" className="text-gray-700 text-justify mb-6">
              <div dangerouslySetInnerHTML={{ __html: modalContent }} />
            </Typography>
            <Button onClick={handleCloseModal} variant="contained" fullWidth>
              Cerrar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}