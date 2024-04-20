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
  const navigate = useNavigate();

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
    <div className="py-4 px-4 md:px-20 lg:px-40">
      <div className="mb-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Mis cursos inscritos</h2>
      </div>

      <div className="font-normal text-center md:text-left flex flex-col">
        {cursosInscritos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cursosInscritos.map((curso, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
                <img className="w-full h-40 object-cover" src={curso.image} alt={curso.name} />
                <div className="p-4">
                  <p className="text-lg font-semibold">{curso.name}</p>
                  <p className="text-gray-500">{curso.nivel}</p>
                  <p className="text-gray-500">{curso.duracion}</p>
                  <button
                    onClick={() => handleCursoClick(curso)}
                    className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Ver clases
                  </button>
                </div>
              </div>
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