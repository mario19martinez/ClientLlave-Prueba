import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from '../../../Redux/features/Users/usersSlice';
import { fetchInscripcion } from "../../../Redux/features/UsersCourses/UsersCursesSlices";
import { fetchCursoDetail } from "../../../Redux/features/courses/coursesSlice";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function CursosInscritos() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const [nivelesInscritos, setNivelesInscritos] = useState([]);
  const [diplomaturas, setDiplomaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  useEffect(() => {
    if (userData?.sub) {
      fetchCourses(userData.sub);
      fetchNivelesInscritos(userData.sub);
      fetchDiplomaturasInscritas(userData.sub);
    }
  }, [dispatch, userData]);

  const fetchCourses = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const inscripcionResponse = await dispatch(fetchInscripcion(userId));
      const inscripciones = inscripcionResponse.payload?.inscripciones || [];
      const cursoIds = inscripciones.map((inscripcion) => inscripcion.cursoId);
      const cursoPromises = cursoIds.map((cursoId) => dispatch(fetchCursoDetail(cursoId)));
      const responses = await Promise.all(cursoPromises);
      const cursos = responses.filter(r => r.payload).map(r => r.payload);
      setCursosInscritos(cursos);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
      setError("Error al obtener los cursos.");
    } finally {
      setLoading(false);
    }
  };

  const fetchNivelesInscritos = async (userId) => {
    try {
      const response = await axios.get(`/user/${userId}/grupos-nivel`);
      setNivelesInscritos(response.data.grupos);
    } catch (error) {
      console.error('Error al obtener niveles inscritos:', error);
      setError('Error al obtener los niveles inscritos.');
    }
  };

  const fetchDiplomaturasInscritas = async (userId) => {
    try {
      const response = await axios.get(`/diplomaturas/${userId}/mis-diplomaturas`);
      setDiplomaturas(response.data);
    } catch (error) {
      console.error('Error al obtener diplomaturas:', error);
      setError('Error al obtener diplomaturas.');
    }
  };

  const handleCursoClick = (curso) => navigate(`/user/curso/${curso.id}`);
  const handleDiplomaturaClick = (id) => {
    if (userData?.sub) {
      navigate(`/estudiante/diplomatura/${id}/${userData.sub}`);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-3">Cargando tu información...</p>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center text-center">
        <div>
          <p className="text-red-600 font-bold">{error}</p>
          <SentimentVeryDissatisfiedIcon className="text-red-400 mt-2" fontSize="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-20 lg:px-40 py-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Tus Inscripciones</h2>

      {(cursosInscritos.length || nivelesInscritos.length || diplomaturas.length) ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cursosInscritos.map((curso, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition transform hover:scale-[1.02]">
              <img src={curso.image} alt={curso.name} className="w-full h-44 object-cover" />
              <div className="p-5">
                <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Curso</span>
                <p className="mt-3 text-lg font-bold text-gray-800">{curso.name}</p>
                <p className="text-sm text-gray-500">{curso.nivel}</p>
                <p className="text-sm text-gray-500 mb-4">{curso.duracion}</p>
                <button onClick={() => handleCursoClick(curso)} className="w-full py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold rounded">
                  Ver clases
                </button>
              </div>
            </div>
          ))}

          {nivelesInscritos.map((nivel, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition transform hover:scale-[1.02]">
              <img src={nivel.image} alt={nivel.name} className="w-full h-44 object-cover" />
              <div className="p-5">
                <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Nivel</span>
                <p className="mt-3 text-lg font-bold text-gray-800">{nivel.name}</p>
                <p className="text-sm text-gray-500 mb-4">{nivel.descripcion}</p>
                <Link to={`/nivel/${nivel.nivel?.id}/grupo/${nivel.id}/detalles/${userData?.sub}`}>
                  <button className="w-full py-2 text-sm bg-green-500 hover:bg-green-600 text-white font-bold rounded">
                    Ver nivel
                  </button>
                </Link>
              </div>
            </div>
          ))}

          {diplomaturas.map((diplo, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition transform hover:scale-[1.02]">
              <img src={diplo.image} alt={diplo.name} className="w-full h-44 object-cover" />
              <div className="p-5">
                <span className="bg-[#60A5FA] text-white text-xs font-semibold px-3 py-1 rounded-full">Diplomatura</span>
                <p className="mt-3 text-lg font-bold text-gray-800">{diplo.name}</p>
                <p className="text-sm text-gray-500 mb-4">{diplo.certificacion ? 'Certificación disponible' : 'Sin certificación'}</p>
                <button
                  onClick={() => handleDiplomaturaClick(diplo.id)}
                  className="w-full py-2 text-sm bg-[#60A5FA] hover:bg-blue-400 text-white font-bold rounded"
                >
                  Ver diplomatura
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">Aún no estás inscrito en ningún contenido.</p>
      )}
    </div>
  );
}