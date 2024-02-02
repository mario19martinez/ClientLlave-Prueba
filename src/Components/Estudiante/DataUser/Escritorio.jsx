// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInscripcion } from "../../../Redux/features/UsersCourses/UsersCursesSlices";
import { fetchCursoDetail } from "../../../Redux/features/courses/coursesSlice";
import { getUserData } from "../../../Redux/features/Users/usersSlice";
import {
  School as SchoolIcon,
  ImportContacts as ImportContactsIcon,
  EmojiEvents as EmojiEventsIcon,
} from "@mui/icons-material";

function Escritorio() {

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");
  const [cursosInscritos, setCursosInscritos] = useState([]);

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (userData?.sub) {
        console.log("User ID:", userData.sub);
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

  const totalCursos = cursosInscritos.length;

  const Inscritos = totalCursos;
  const Activos = totalCursos;
  const Completados = 0;

  const containerStyle = "md:flex md:flex-row flex flex-col justify-center items-center h-auto";
  const cardStyle = "w-48 md:w-56 h-36 md:h-44 p-2 border-2 border-blue-500 rounded-lg shadow-lg mx-2 my-4 text-center flex flex-col justify-center items-center"; // Reducción del padding
  const labelStyle = "text-base md:text-lg lg:text-xl font-semibold";
  const countStyle = "font-bold text-gray-700 text-2xl md:text-3xl lg:text-4xl";
  const iconContainerStyle = "w-10 md:w-12 h-10 md:h-12 p-2 rounded-full bg-blue-100 text-center";
  const iconStyle = "text-blue-500";

  return (
    <div className="sm:pl-2 lg:pl-20">
      <div className={containerStyle}>
        <div className={cardStyle}>
          <div className={iconContainerStyle}>
            <ImportContactsIcon className={iconStyle} fontSize="large" />
          </div>
          <h3 className={labelStyle}>Cursos Inscritos</h3>
          <p className={countStyle}>{Inscritos}</p>
        </div>

        <div className={cardStyle}>
          <div className={iconContainerStyle}>
            <SchoolIcon className={iconStyle} fontSize="large" />
          </div>
          <h3 className={labelStyle}>Cursos Activos</h3>
          <p className={countStyle}>{Activos}</p>
        </div>

        <div className={cardStyle}>
          <div className={iconContainerStyle}>
            <EmojiEventsIcon className={iconStyle} fontSize="large" />
          </div>
          <h3 className={labelStyle}>Cursos Completados</h3>
          <p className={countStyle}>{Completados}</p>
        </div>
      </div>
    </div>
  );
}

export default Escritorio;