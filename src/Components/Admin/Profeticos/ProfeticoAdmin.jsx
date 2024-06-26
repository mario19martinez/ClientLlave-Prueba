// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { Modal, Button } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export default function ProfeticoAdmin() {
  const [profeticos, setProfeticos] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [completedWorkshops, setCompletedWorkshops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(4);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [profeticoToDelete, setProfeticoToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfeticos() {
      try {
        const response = await axios.get("/profeticos");
        setProfeticos(response.data);
      } catch (error) {
        console.error("Error al obtener los proféticos:", error);
      }
    }

    fetchProfeticos();
  }, []);

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleOptionSelect = (profeticoId, preguntaIndex, opcion) => {
    setSelectedOptions({
      ...selectedOptions,
      [profeticoId]: {
        ...selectedOptions[profeticoId],
        [preguntaIndex]: opcion,
      },
    });
  };

  const handleSubmitAnswer = (profeticoId, preguntaIndex) => {
    const profetico = profeticos.find((item) => item.id === profeticoId);
    const pregunta = profetico.preguntas[preguntaIndex];
    if (!pregunta) return; // No se muestra si no hay pregunta

    const respuestaCorrecta = pregunta.respuestaCorrecta;
    const opcionSeleccionada = selectedOptions[profeticoId][preguntaIndex];

    if (!opcionSeleccionada) return; // No se muestra si no hay opción seleccionada

    const opcionSeleccionadaLetra = String.fromCharCode(
      97 + pregunta.opciones.indexOf(opcionSeleccionada)
    );

    if (opcionSeleccionadaLetra === respuestaCorrecta) {
      setFeedbacks({
        ...feedbacks,
        [profeticoId]: {
          ...feedbacks[profeticoId],
          [preguntaIndex]: (
            <span style={{ color: "green", fontSize: "1.2rem" }}>
              ¡Respuesta correcta!
            </span>
          ),
        },
      });
      if (allQuestionsAnswered(profeticoId)) {
        setCompletedWorkshops([...completedWorkshops, profeticoId]);
      }
    } else {
      setFeedbacks({
        ...feedbacks,
        [profeticoId]: {
          ...feedbacks[profeticoId],
          [preguntaIndex]: (
            <span style={{ color: "red", fontSize: "1.2rem" }}>
              Respuesta incorrecta. ¡Inténtalo de nuevo!
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4 transition duration-300"
                onClick={() => handleTryAgain(profeticoId, preguntaIndex)}
              >
                Intentar de Nuevo
              </button>
            </span>
          ),
        },
      });
    }
  };

  const handleTryAgain = (profeticoId, preguntaIndex) => {
    setFeedbacks({
      ...feedbacks,
      [profeticoId]: {
        ...feedbacks[profeticoId],
        [preguntaIndex]: null,
      },
    });
    setSelectedOptions({
      ...selectedOptions,
      [profeticoId]: {
        ...selectedOptions[profeticoId],
        [preguntaIndex]: null,
      },
    });
    setCompletedWorkshops(
      completedWorkshops.filter((id) => id !== profeticoId)
    );
  };

  const allQuestionsAnswered = (profeticoId) => {
    const profetico = profeticos.find((item) => item.id === profeticoId);
    return profetico.preguntas.every(
      (pregunta, index) => selectedOptions[profeticoId]?.[index]
    );
  };

  const handleDeleteProfetico = async (profeticoId) => {
    try {
      await axios.delete(`/profeticos/${profeticoId}`);
      setProfeticos(
        profeticos.filter((profetico) => profetico.id !== profeticoId)
      );
      setDeleteModalOpen(false);
      setProfeticoToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el profético:", error);
    }
  };

  const handleOpenDeleteModal = (profeticoId) => {
    setDeleteModalOpen(true);
    setProfeticoToDelete(profeticoId);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setProfeticoToDelete(null);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = profeticos.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto mt-10 justify-center">
      <div className="justify-start py-0 translate-x-28">
        <button
          onClick={() => navigate("/AdminPage")}
          className="bg-blue-500 text-white w-20 h-10 mb-0 font-semibold py-0 px-4 rounded hover:bg-gray-400 transition-transform ease-in-out duration-300 hover:translate-y-1"
        >
          <KeyboardBackspaceIcon fontSize="large" />
        </button>
      </div>
      <div className="mb-8 flex flex-col translate-x-28 mt-8">
        <h1 className="text-2xl font-bold text-gray-700 pb-5">
          Entrenándote para conquistar
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center w-56"
          onClick={() => navigate("/CrearProfetico")}
        >
          <FiPlus className="mr-2" />
          Crear Clase Profética
        </button>
      </div>
      <div>
        {currentCards.map((profetico, index) => (
          <div
            key={profetico.id}
            className="bg-gray-100 p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 mx-auto w-full"
            style={{ maxWidth: "500px", marginBottom: "20px" }}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex flex-col">
                <h2 className="text-lg font-bold mb-2 text-gray-800">
                  {profetico.titulo}
                </h2>
                <h3 className="pb-2">Componete: {profetico.tipo}</h3>
              </div>
              <div className="flex">
                <button
                  className="mr-2"
                  onClick={() =>
                    navigate(`/admin/profetico/edit/${profetico.id}`)
                  }
                >
                  <FaEdit />
                </button>
                <button onClick={() => handleOpenDeleteModal(profetico.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
            <p
              className="text-gray-600 mb-4 overflow-hidden"
              style={{ maxHeight: expandedCard === index ? "none" : "3rem" }}
            >
              {profetico.descripcion}
            </p>
            {expandedCard === index && (
              <>
                {profetico.video && (
                  <div className="relative" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      title={profetico.titulo}
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src={`https://www.youtube.com/embed/${profetico.video}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {profetico.contenido && (
                  <div className="mt-4">
                    <h3 className="font-bold text-lg text-gray-800">
                      Contenido:
                    </h3>
                    <div
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: profetico.contenido }}
                    />
                  </div>
                )}
                {completedWorkshops.includes(profetico.id) ? (
                  <p className="text-green-600 font-bold mt-4">
                    ¡Taller finalizado! ¡Felicidades!
                  </p>
                ) : (
                  <>
                    {profetico.preguntas.length > 0 && (
                      <>
                        {profetico.preguntas.map((pregunta, preguntaIndex) => (
                          <div key={preguntaIndex}>
                            {pregunta.pregunta && (
                              <>
                                <p className="text-lg font-bold mb-2 text-gray-800">
                                  {pregunta.pregunta}
                                </p>
                                <ul className="list-disc pl-8 mb-4">
                                  {pregunta.opciones.map(
                                    (opcion, opcionIndex) => (
                                      <li
                                        key={opcionIndex}
                                        className="pl-2 pr-2"
                                      >
                                        <label className="inline-flex items-center text-gray-800">
                                          <input
                                            type="radio"
                                            name={`pregunta${preguntaIndex}`}
                                            value={opcion}
                                            checked={
                                              selectedOptions[profetico.id]?.[
                                                preguntaIndex
                                              ] === opcion
                                            }
                                            onChange={() =>
                                              handleOptionSelect(
                                                profetico.id,
                                                preguntaIndex,
                                                opcion
                                              )
                                            }
                                          />
                                          <span className="ml-2">
                                            {opcion.substr(0)}
                                          </span>
                                        </label>
                                      </li>
                                    )
                                  )}
                                </ul>
                                {feedbacks[profetico.id]?.[preguntaIndex] && (
                                  <p
                                    className="text-sm text-red-600"
                                    style={{ fontSize: "1rem" }}
                                  >
                                    {feedbacks[profetico.id][preguntaIndex]}
                                  </p>
                                )}
                                <div>
                                  {!feedbacks[profetico.id]?.[
                                    preguntaIndex
                                  ] && (
                                    <button
                                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4 transition duration-300"
                                      onClick={() =>
                                        handleSubmitAnswer(
                                          profetico.id,
                                          preguntaIndex
                                        )
                                      }
                                    >
                                      Responder
                                    </button>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <ul className="flex pl-0 list-none rounded overflow-hidden">
          {Array.from(
            { length: Math.ceil(profeticos.length / cardsPerPage) },
            (_, i) => (
              <li
                key={i}
                className="relative block py-2 px-3 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-200"
              >
                <button
                  className={`page-link ${
                    currentPage === i + 1 ? "font-bold" : ""
                  }`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
      <Modal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="bg-white p-8 rounded-md w-96 mx-auto mt-32 text-center">
          <h2 className="text-lg font-bold mb-4" id="modal-title">
            ¿Estás seguro de eliminar el elemento?
          </h2>
          <div className="flex justify-center">
            <Button
              variant="contained"
              color="error"
              className="mr-4"
              onClick={() => handleDeleteProfetico(profeticoToDelete)}
            >
              Sí, eliminar
            </Button>
            <Button onClick={handleCloseDeleteModal}>Cancelar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}