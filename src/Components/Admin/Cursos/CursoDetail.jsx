// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCursoDetail } from "../../../Redux/features/courses/coursesSlice";
import CursoEdit from "./CursoEdit";
import axios from "axios";
import Modal from "react-modal";
import ScheduleIcon from "@mui/icons-material/Schedule";

function CursoDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const curso = useSelector((state) => state.courses.cursoDetail);
  const loading = useSelector((state) => state.courses.status === "loading");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scheduleModalIsOpen, setScheduleModalIsOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchCursoDetail(id));
    }
  }, [dispatch, id]);

  const handleDeletedCurso = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar este curso?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/cursos/delete/${id}`);
        alert(response.data.message);
        navigate("/admin/cursos");
      } catch (error) {
        console.error("Error al eliminar el curso:", error);
      }
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openScheduleModal = () => setScheduleModalIsOpen(true);
  const closeScheduleModal = () => setScheduleModalIsOpen(false);

  const openUserAndCursos = () => {
    localStorage.setItem("idCurso", id);
    navigate("/admin/cursos/users-cursos");
  };

  const CursosAndUsers = () => {
    localStorage.setItem("idCurso", id);
    navigate("/admin/cursos/cursos-users");
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      background: "#f9fafb",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "8px",
      outline: "none",
      padding: "20px",
      maxWidth: "600px",
      width: "90%",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  return (
    <div className="w-screen">
      <Link to="/admin/cursos">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-4 ml-8">
          Atrás
        </button>
      </Link>
      <div className="mt-8 p-8 rounded-lg flex items-center h-auto w-4/5">
        {loading ? (
          <div className="text-center mt-8 ml-8">
            <h1 className="text-2xl font-semibold">Cargando...</h1>
          </div>
        ) : (
          <div className="flex items-start ml-8">
            <img
              src={curso.image || "https://via.placeholder.com/150"}
              alt="Curso"
              className="w-3/5 h-96 object-contain rounded"
            />
            <div className="flex flex-col ml-8 bg-gray-100 p-4 rounded-lg">
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                {curso.name}
              </h1>
              <p className="text-lg font-medium text-gray-900">
                <strong>Nivel:</strong> {curso.nivel}
              </p>
              <p className="text-lg font-medium text-gray-900">
                <strong>Duración:</strong> {curso.duracion}
              </p>
              <p className="text-lg font-medium text-gray-900">
                <strong>Horas Cátedra:</strong> {curso.horas_catedra}
              </p>
              <p className="text-lg font-medium text-gray-900">
                <strong>Costo:</strong> {curso.costo}
              </p>
              <p className="text-lg font-medium text-gray-900">
                <strong>Fecha de Inicio:</strong> {curso.fechaInicio}
              </p>
              <div className="text-lg font-medium text-gray-900">
                <strong>Horario:</strong>
                <button
                  className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded inline-flex items-center"
                  onClick={openScheduleModal}
                >
                  <ScheduleIcon
                    style={{ fontSize: "20px", marginRight: "4px" }}
                  />
                  Ver Horario
                </button>
              </div>
              <div className="flex mt-3 flex-col">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out"
                  onClick={openUserAndCursos}
                >
                  Agregar Estudiante
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out"
                  onClick={CursosAndUsers}
                >
                  Estudiantes Inscritos
                </button>
                <div className="flex divide-x divide-gray-200 shadow-sm rounded-md w-full py-2 space-x-1">
                  <button
                    className="flex-1 bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 rounded-l-lg transition duration-300 ease-in-out text-sm sm:text-base"
                    onClick={openModal}
                  >
                    Editar Curso
                  </button>
                  <button
                    className="flex-1 bg-red-600 hover:bg-red-900 text-white font-bold py-2 rounded-r-lg transition duration-300 ease-in-out text-sm sm:text-base"
                    onClick={handleDeletedCurso}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>

            {typeof id === "string" && (
              <CursoEdit id={id} isOpen={modalIsOpen} closeModal={closeModal} />
            )}
          </div>
        )}
      </div>

      {/* Modal for Schedule */}
      <Modal
        isOpen={scheduleModalIsOpen}
        onRequestClose={closeScheduleModal}
        style={customStyles}
        contentLabel="Horario del Curso"
      >
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Horario del Curso</h2>
          <div dangerouslySetInnerHTML={{ __html: curso.horario_clases }} />
          <button
            onClick={closeScheduleModal}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Aceptar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CursoDetail;
