// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { getCursos } from "../../../Redux/features/courses/coursesSlice";

const CursosEditor = ({ onSelectCurso, cursoSeleccionado }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-between mb-4 px-16 py-12">
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
              <Link to={`/Editor/Cursos/CursoDetails/${curso.id}`}>
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
CursosEditor.propTypes = {
  onSelectCurso: PropTypes.func.isRequired,
  cursoSeleccionado: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
  }),
};

export default CursosEditor;