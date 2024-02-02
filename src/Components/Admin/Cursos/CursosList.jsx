// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
//import axios from "axios";
import PropTypes from "prop-types";
import Modal from "react-modal";
import AgregarCurso from "./AgregarCurso";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { getCursos } from "../../../Redux/features/courses/coursesSlice";

const CursosList = ({ onSelectCurso, cursoSeleccionado }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    return <div className="text-center">Cargando cursos...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error al cargar cursos: {error}
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setModalIsOpen(true)}
        className="absolute translate-y-20 top-10 right-10 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded border-b-4 font-semibold border-blue-900 shadow-lg opacity-80 transition duration-300 ease-in-out"
      >
        Agregar Curso <AddIcon fontSize="medium" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        contentLabel="Agregar Curso"
      >
        <div className="modal-content p-4 w-2/5 h-screen mx-auto rounded-lg shadow-lg">
          <AgregarCurso closeModal={() => setModalIsOpen(false)} />
          <button
            onClick={() => setModalIsOpen(false)}
            className="mt-0 bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-2 rounded-full"
          >
            <CloseIcon fontSize="medium" />
          </button>
        </div>
      </Modal>
      <div className="absolute top-0 left-0 mt-28 ml-96 p-4">
        <h2 className="text-2xl font-gabarito mb-4 text-gray-700">
          Lista de Cursos
        </h2>
        <ul className="list-none p-0">
          {cursos.map((curso) => (
            <li
              key={curso.id}
              className={`mb-2 py-2 px-4 rounded border-2 w-96 ${
                cursoSeleccionado && cursoSeleccionado.id === curso.id
                  ? "bg-blue-700 border-blue-900 text-white"
                  : "bg-gray-100 hover:bg-gray-300 border-blue-400"
              }`}
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
