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

const CursosList = ({ onSelectCurso, cursoSeleccionado }) => {
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
    return <div className="text-center">Cargando cursos...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500 text-xl">
        Error al cargar cursos: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen">
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

      <div className="flex bg-slate-50">
        <div className="flex flex-col items-center justify-between mb-4 px-16 py-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
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
        <div className="bg-slate-50">
          <button
            onClick={() => setModalIsOpen(true)}
            className="absolute translate-y-20 top-10 right-56 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded border-b-4 font-semibold border-blue-900 shadow-lg opacity-80 transition duration-300 ease-in-out"
          >
            Agregar Curso <AddIcon fontSize="medium" />
          </button>
          <button
            className="absolute translate-y-20 top-10 right-10 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded border-b-4 font-semibold border-red-900 shadow-lg opacity-80 transition duration-300 ease-in-out"
            onClick={() => navigate("/admin/cursosDeleted")}
          >
            Cursos Eliminados
          </button>
        </div>
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
