// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from '../../../Redux/features/Users/usersSlice';
import { fetchInscripcion } from "../../../Redux/features/UsersCourses/UsersCursesSlices";
import { fetchCursoDetail } from "../../../Redux/features/courses/coursesSlice";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function CursosInscritos() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const [nivelesInscritos, setNivelesInscritos] = useState([]);
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  useEffect(() => {
    if (userData?.sub) {
      const fetchCourses = async () => {
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
      };

      const fetchNivelesInscritos = async () => {
        try {
          const response = await axios.get(`/user/${userData.sub}/grupos-nivel`);
          setNivelesInscritos(response.data.grupos);
        } catch (error) {
          console.error('Error al obtener los niveles inscritos del usuario:', error);
        }
      };

      fetchCourses();
      fetchNivelesInscritos();
    }
  }, [dispatch, userData]);

  const handleCursoClick = (curso) => {
    navigate(`/user/curso/${curso.id}`);
  };

  return (
    <div className="px-4 md:px-20 lg:px-40 py-8">
      <div className="mb-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">Cursos Inscritos</h2>
      </div>
      {/* <button
      onClick={() => navigate('/modulos-de-usuario')}
      >
        Modulos Inscritos
      </button> */}

      <div className="font-normal text-center md:text-left">
        {cursosInscritos.length > 0 || nivelesInscritos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cursosInscritos.map((curso, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
                <img className="w-full h-48 object-cover" src={curso.image} alt={curso.name} />
                <div className="p-4">
                  <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full mb-2">Curso</span>
                  <p className="text-lg font-semibold text-gray-700">{curso.name}</p>
                  <p className="text-gray-500">{curso.nivel}</p>
                  <p className="text-gray-500">{curso.duracion}</p>
                  <button
                    onClick={() => handleCursoClick(curso)}
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Ver clases
                  </button>
                </div>
              </div>
            ))}

            {nivelesInscritos.map((grupo, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
                <img className="w-full h-48 object-cover" src={grupo.image} alt={grupo.name} />
                <div className="p-4">
                  <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mb-2">Nivel</span>
                  <p className="text-lg font-semibold text-gray-700">{grupo.name}</p>
                  <p className="text-gray-500 mb-2">{grupo.descripcion}</p>
                  <Link to={`/nivel/${grupo.nivel.id}/grupo/${grupo.id}/detalles`}>
                    <button
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Ver nivel
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay cursos o niveles inscritos</p>
        )}
      </div>
    </div>
  );
}