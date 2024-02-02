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
  const [cursoActivo, setCursoActivo] = useState(0);
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
      if (userData?.sub) {
        const inscripcionResponse = await dispatch(fetchInscripcion(userData.sub));
        const inscripciones = inscripcionResponse.payload.inscripciones || [];
        const cursoIds = inscripciones.map((inscripcion) => inscripcion.cursoId);
        const cursoPromises = cursoIds.map((cursoId) => dispatch(fetchCursoDetail(cursoId)));

        Promise.all(cursoPromises).then((responses) => {
          const cursosNombres = responses
            .filter((cursoResponse) => cursoResponse.payload)
            .map((cursoResponse) => cursoResponse.payload.name);

          setCursosInscritos(cursosNombres);
        });
      }
    };

    fetchCourses();
  }, [dispatch, userData]);

  const handleCursoClick = (cursoIndex) => {
    // Redirigir a la URL del curso seleccionado
    navigate(`/user/curso/${cursoIndex + 1}`); // +1 porque los IDs empiezan desde 1
  };

  const cursos = [
    {
      tipo: "Inscritos",
      cursos: cursosInscritos,
    },
    {
      tipo: "Activos",
      cursos: cursosInscritos,
    },
    {
      tipo: "Completados",
      cursos: [],
    },
  ];

  return (
    <div className="px-4 md:px-20 lg:px-40">
      <div className="mb-8 flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-8">
        {cursos.map((categoria, index) => (
          <button
            key={index}
            className={`${
              cursoActivo === index
                ? "bg-blue-400 text-white"
                : "bg-gray-200 text-gray-700"
            } px-4 py-2 rounded-sm hover:bg-blue-700 hover:text-white border-b-2 border-blue-500 font-medium`}
            onClick={() => setCursoActivo(index)}
          >
            {categoria.tipo}
          </button>
        ))}
      </div>

      <div className="font-normal text-center md:text-left">
        {cursos[cursoActivo].cursos.length > 0 ? (
          <div className="flex flex-wrap justify-center">
            {cursos[cursoActivo].cursos.map((curso, index) => (
              <button
                key={index}
                onClick={() => handleCursoClick(index)}
                className="m-2 px-4 py-2 bg-gray-200 hover:bg-gray-100 text-gray-800 font-semibold rounded-lg focus:outline-none"
                style={{ minWidth: "120px" }}
              >
                {curso}
              </button>
            ))}
          </div>
        ) : (
          <p>No hay cursos disponibles</p>
        )}
      </div>
    </div>
  );
}

export default CursosInscritos;