// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInscripcion } from "../../../Redux/features/UsersCourses/UsersCursesSlices";
import { fetchCursoDetail } from "../../../Redux/features/courses/coursesSlice";
import { getUserData } from "../../../Redux/features/Users/usersSlice";

function CursosInscritos() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const navigate = useNavigate(); // Obtener la función de navegación

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (userData?.sub && cursosInscritos.length === 0) {
        try {
          const inscripcionResponse = await dispatch(fetchInscripcion(userData.sub));
          const inscripciones = inscripcionResponse.payload.inscripciones || [];
          const cursoIds = inscripciones.map((inscripcion) => inscripcion.cursoId);
          const cursoPromises = cursoIds.map((cursoId) => dispatch(fetchCursoDetail(cursoId)));

          Promise.all(cursoPromises).then((responses) => {
            const cursos = responses
              .filter((cursoResponse) => cursoResponse.payload)
              .map((cursoResponse) => cursoResponse.payload);

            setCursosInscritos(cursos);
          });
        } catch (error) {
          console.error("Error al obtener los cursos:", error);
        }
      }
    };

    fetchCourses();
  }, [dispatch, userData, cursosInscritos]);

  const handleCursoClick = (curso) => {
    // Redirigir a la URL del curso seleccionado
    navigate(`/user/curso/${curso.id}`);
  };

  return (
    <div className="px-4 md:px-20 lg:px-40">
      <div className="mb-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Mis cursos inscritos</h2>
      </div>

      <div className="font-normal text-center md:text-left flex flex-col">
        {cursosInscritos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cursosInscritos.map((curso, index) => (
              <button
                key={index}
                onClick={() => handleCursoClick(curso)}
                className="p-4 bg-blue-200 shadow-md rounded-md hover:shadow-lg focus:outline-none"
                style={{ minWidth: "200px" }}
              >
                <p className="text-lg font-semibold">{curso.name}</p>
                <p className="text-gray-500">{curso.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay cursos disponibles</p>
        )}
      </div>
    </div>
  );
}

export default CursosInscritos;