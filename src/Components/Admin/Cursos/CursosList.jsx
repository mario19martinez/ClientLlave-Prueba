// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import PropTypes from "prop-types";
import Modal from "react-modal";
import AgregarCurso from "./AgregarCurso";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCursos } from "../../../Redux/features/courses/coursesSlice";
import CircularProgress from '@mui/material/CircularProgress';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const CursosList = ({ onSelectCurso }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  // Accede al estado de cursos desde Redux usando useSelector
  const cursos = useSelector((state) => state.courses.cursos);

  const dispatch = useDispatch();

  useEffect(() => {
    // Llama a la acción getCursos en lugar de la petición local
    dispatch(getCursos())
      .then((response) => {
        console.log("Cursos obtenidos:", response.payload);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600 mt-4 font-semibold">Cargando...</p>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 mt-4 font-semibold">Error: {error}</p>
          <p className="text-red-500 mt-4 font-semibold">Oops! Algo salió mal. Vuelve a intentarlo en un momento.</p>
          <p className="text-red-500 mt-4 font-semibold">
          <SentimentVeryDissatisfiedIcon fontSize="large" />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen ml-10 w-3/5">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        overlayClassName="overlay"
        contentLabel="Agregar Curso"
      >
        <div className="modal-content p-6 w-3/5 mx-auto rounded-lg shadow-lg bg-white">
          <AgregarCurso closeModal={() => setModalIsOpen(false)} />
          <button
            onClick={() => setModalIsOpen(false)}
            className="top-10 left-50 right-80 fixed m-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <CloseIcon fontSize="medium" />
          </button>
        </div>
      </Modal>

      <div className="mb-8 ">
        {/* <div className=""> */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Lista de Cursos
          </h2>
          <button
            onClick={() => setModalIsOpen(true)}
            className=" bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold shadow-lg opacity-80 transition duration-300 ease-in-out"
          >
            Agregar Curso <AddIcon fontSize="medium" />
          </button>
          <button
            className="ml-4 right-10 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold shadow-lg opacity-80 transition duration-300 ease-in-out"
            onClick={() => navigate("/admin/cursosDeleted")}
          >
            Cursos Eliminados
          </button>
          <ul className="space-y-4 mt-6">
            {cursos.map((curso) => (
              <li
                key={curso.id}
                className="bg-white w-96 border-b-4 border-x-2 border-gray-400 font-semibold text-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <Link to={`/admin/curso/${curso.id}`}>
                  <button
                    onClick={() => onSelectCurso(curso)}
                    className="w-full h-full text-left focus:outline-none block"
                    style={{ background: "transparent", border: "none" }}
                  >
                    {curso.name}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
};

// Agregando validación de props
CursosList.propTypes = {
  onSelectCurso: PropTypes.func.isRequired,
  cursoSeleccionado: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
  }),
};

export default CursosList;
