import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AgregarClases from "../Clases/AgregarClases";
import { useNavigate } from "react-router-dom";
import ClaseEdit from "./ClaseEdit";
import Modal from "react-modal";
import Vimeo from "@vimeo/player";

function Clases() {
  const { id } = useParams();
  const [clases, setClases] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAgregarClaseIsOpen, setModalAgregarClaseIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageBeforeEdit, setCurrentPageBeforeEdit] = useState(1); 
  const navigate = useNavigate();
  console.log(loading);

  const clasesPerPage = 10; 
  const maxPagesToShow = 5; 

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get(`/cursos/${id}/clases`);
        console.log("response", response);
        const sortedClases = response.data.sort((a, b) => a.id - b.id);
        if (response.status === 200) {
          const data = await response.data;
          console.log(data);
          setClases(sortedClases); 
        } else {
          throw new Error("Curso no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener las clases:", error);
      }
    };
    fetchClases();
  }, [id]);

  const closeModalAndReload = async () => {
    setModalAgregarClaseIsOpen(false);
    setModalIsOpen(false);
    setLoading(true);
    try {
      const response = await axios.get(`/cursos/${id}/clases`);
      const sortedClases = response.data.sort((a, b) => a.id - b.id);
      setClases(sortedClases); 
      setCurrentPage(currentPageBeforeEdit); 
    } catch (error) {
      console.error("Error al obtener las clases:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaseClick = (clase) => {
    if (clase) {
      setClaseSeleccionada(clase);
    }
  };

  const extractYoutubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleEliminarClase = async (claseId) => {
    try {
      await axios.delete(`/cursos/${id}/clases/${claseId}`);
      const nuevasClases = clases.filter((clase) => clase.id !== claseId);
      setClases(nuevasClases);
      alert("Clase eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
    }
  };

  useEffect(() => {
    if (claseSeleccionada && claseSeleccionada.url) {
      if (claseSeleccionada.platform === "vimeo") {
        const vimeoPlayer = new Vimeo(`vimeoPlayer-${claseSeleccionada.id}`, {
          id: claseSeleccionada.url,
        });
        return () => {
          vimeoPlayer.destroy();
        };
      }
    }
  }, [claseSeleccionada]);

  // Calcular el índice de la primera y última clase de la página actual
  const indexOfLastClase = currentPage * clasesPerPage;
  const indexOfFirstClase = indexOfLastClase - clasesPerPage;
  const currentClases = clases.slice(indexOfFirstClase, indexOfLastClase);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(clases.length / clasesPerPage);

  // Calcular el rango de páginas a mostrar en la paginación
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Ajustar el inicio y el final si el número total de páginas es menor que maxPagesToShow
  if (totalPages <= maxPagesToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    // Ajustar el inicio si estamos cerca del final
    if (endPage === totalPages) {
      startPage = endPage - maxPagesToShow + 1;
    }
  }

  const handleEditClase = (clase) => {
    setCurrentPageBeforeEdit(currentPage); // Almacenar la página actual antes de editar
    setClaseSeleccionada(clase);
    setModalIsOpen(true);
  };

  return (
    <div className="container p-6 w-3/5">
      <div className="bg-gray-300 h-2 w-full"></div>
      <h2 className="text-2xl font-semibold mb-2 text-gray-900 pt-6">
        Clases del Curso
      </h2>

      {/* Modal de edición */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="Modal"
        contentLabel="Editar Clase"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40"
      >
        {claseSeleccionada && (
          <ClaseEdit
            id={claseSeleccionada.id}
            cursoId={parseInt(id)}
            isOpen={modalIsOpen}
            closeModal={() => setModalIsOpen(false)}
            closeModalAndReload={closeModalAndReload}
          />
        )}
      </Modal>

      {/* Modal de agregar clase */}
      <Modal
        isOpen={modalAgregarClaseIsOpen}
        onRequestClose={() => setModalAgregarClaseIsOpen(false)}
        className="Modal"
        contentLabel="Agregar Clase"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40"
      >
        <AgregarClases id={id} closeModalAndReload={closeModalAndReload} />
      </Modal>

      <div className="mb-6 flex space-x-4">
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow transition ease-in duration-200"
          onClick={() => setModalAgregarClaseIsOpen(true)}
        >
          Agregar Clase
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow transition ease-in duration-200"
          onClick={() => navigate("/admin/cursos/crearTaller")}
        >
          Agregar Taller
        </button>
      </div>

      <ul className="space-y-4">
        {currentClases.map((clase) => (
          <li
            key={clase.id}
            className={`group bg-gray-300 cursor-pointer p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out ${
              claseSeleccionada && claseSeleccionada.id === clase.id
                ? "bg-gray-300"
                : ""
            }`}
            onClick={() => handleClaseClick(clase)}
          >
            <div className="flex justify-between items-center">
              <h3
                className={`text-xl font-semibold mb-2 ${
                  clase.pdfURL ? "text-blue-700" : "" // Aplicar color rojo si es PDF
                }`}
              >
                {clase.name}
              </h3>
              <span
                className={`transition-transform duration-300 ${
                  claseSeleccionada && claseSeleccionada.id === clase.id
                    ? "rotate-180"
                    : ""
                }`}
              >
                {/* Aquí se puede usar un ícono de una librería como Heroicons, por ejemplo, `ChevronDownIcon` */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
            {claseSeleccionada && claseSeleccionada.id === clase.id && (
              <div className="mt-4 aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-inner">
                {claseSeleccionada &&
                claseSeleccionada.url &&
                claseSeleccionada.platform === "vimeo" ? (
                  <div id={`vimeoPlayer-${claseSeleccionada.id}`} />
                ) : claseSeleccionada &&
                  claseSeleccionada.url &&
                  claseSeleccionada.platform === "youtube" ? (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "0",
                      paddingBottom: "56.25%",
                    }}
                  >
                    <iframe
                      title="url"
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "80%",
                        height: "90%",
                      }}
                      src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
                        claseSeleccionada.url
                      )}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : claseSeleccionada && claseSeleccionada.pdfURL ? (
                  <div className="mt-4">
                    <ul className="space-y-2">
                      <li key={claseSeleccionada.id}>
                        {claseSeleccionada.id === claseSeleccionada?.id && (
                          <Link
                            to={claseSeleccionada.pdfURL}
                            target="_blank"
                            className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-md"
                          >
                            <span>{claseSeleccionada.name} PDF</span>
                            <button className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-md">
                              Ver Taller
                            </button>
                          </Link>
                        )}
                      </li>
                    </ul>
                  </div>
                ) : (
                  <p>No hay contenido disponible para esta clase.</p>
                )}
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEditClase(clase)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition ease-in duration-200"
                  >
                    Editar Clase
                  </button>
                  <button
                    onClick={() => handleEliminarClase(clase.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition ease-in duration-200"
                  >
                    Eliminar Clase
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="mt-6 flex justify-center">
        <ul className="flex list-none space-x-2">
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
            <li key={startPage + i}>
              <button
                className={`px-3 py-1 text-sm rounded-full ${
                  startPage + i === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                } shadow transition ease-in duration-200`}
                onClick={() => setCurrentPage(startPage + i)}
              >
                {startPage + i}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Clases;