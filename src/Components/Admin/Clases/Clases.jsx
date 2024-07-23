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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterType, setFilterType] = useState("sinFiltro");
  const navigate = useNavigate();

  const clasesPerPage = 10;
  const maxPagesToShow = 5;

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get(`/cursos/${id}/clases`);
        const sortedClases = response.data.sort((a, b) => a.id - b.id);
        if (response.status === 200) {
          setClases(sortedClases);
          // Set default start and end dates to cover all clases
          const allDates = sortedClases.map(clase => new Date(clase.createdAt));
          if (allDates.length > 0) {
            setStartDate(new Date(Math.min(...allDates)).toISOString().split('T')[0]);
            setEndDate(new Date(Math.max(...allDates)).toISOString().split('T')[0]);
          }
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

  const handleEditClase = (clase) => {
    setCurrentPageBeforeEdit(currentPage);
    setClaseSeleccionada(clase);
    setModalIsOpen(true);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    if (e.target.value === "personalizado") {
      // Ensure dates are set for personalizado filter
      setStartDate(startDate || new Date("1900-01-01").toISOString().split('T')[0]);
      setEndDate(endDate || new Date().toISOString().split('T')[0]);
    }
  };

  const getDateRangeForFilterType = (type) => {
    const today = new Date();
    let start;
    let end;

    switch (type) {
      case "semana":
        start = new Date(today.setDate(today.getDate() - today.getDay()));
        end = new Date(today.setDate(today.getDate() + 6 - today.getDay()));
        break;
      case "quincena":
        const currentDate = new Date();
        const day = currentDate.getDate();
        start = new Date(currentDate.getFullYear(), currentDate.getMonth(), day <= 15 ? 1 : 16);
        end = new Date(currentDate.getFullYear(), currentDate.getMonth(), day <= 15 ? 15 : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate());
        break;
      case "mes":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "sinFiltro":
        return { start: new Date("1900-01-01"), end: new Date() };
      default:
        start = new Date(startDate);
        end = new Date(endDate);
        break;
    }

    return { start, end };
  };

  const filterClasesByDate = (clases) => {
    const { start, end } = getDateRangeForFilterType(filterType);
    if (start && end) {
      return clases.filter((clase) => {
        const createdAt = new Date(clase.createdAt);
        return createdAt >= start && createdAt <= end;
      });
    }
    return clases;
  };

  const filteredClases = filterClasesByDate(clases);

  const indexOfLastClase = currentPage * clasesPerPage;
  const indexOfFirstClase = indexOfLastClase - clasesPerPage;
  const currentClases = filteredClases.slice(indexOfFirstClase, indexOfLastClase);
  const totalPages = Math.ceil(filteredClases.length / clasesPerPage);
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (totalPages <= maxPagesToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (endPage === totalPages) {
      startPage = endPage - maxPagesToShow + 1;
    }
  }

  return (
    <div className="container p-6 w-3/5">
      <div className="bg-gray-300 h-2 w-full"></div>
      <h2 className="text-2xl font-semibold mb-2 text-gray-900 pt-6">
        Clases del Curso
      </h2>

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
          Agregar Taller
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Filtrar por:
        </label>
        <div className="flex space-x-4">
          <select
            value={filterType}
            onChange={handleFilterTypeChange}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="sinFiltro">Sin Filtro</option>
            <option value="semana">Semana</option>
            <option value="quincena">Quincena</option>
            <option value="mes">Mes</option>
            <option value="personalizado">Personalizado</option>
          </select>
          {filterType === "personalizado" && (
            <>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="border border-gray-300 p-2 rounded-md"
              />
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="border border-gray-300 p-2 rounded-md"
              />
            </>
          )}
        </div>
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
                  clase.pdfURL ? "text-blue-700" : "" 
                }`}
              >
                {clase.name}
              </h3>
              <span className="text-gray-600 text-sm">
                {new Date(clase.createdAt).toLocaleDateString()}
              </span>
              <span
                className={`transition-transform duration-300 ${
                  claseSeleccionada && claseSeleccionada.id === clase.id
                    ? "rotate-180"
                    : ""
                }`}
              >
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