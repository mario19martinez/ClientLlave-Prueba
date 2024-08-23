import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchInscripcion } from "../../../Redux/features/UsersCourses/UsersCursesSlices";
import { fetchCursoDetail } from "../../../Redux/features/courses/coursesSlice";
import { getUserData } from "../../../Redux/features/Users/usersSlice";
import {
  ImportContacts as ImportContactsIcon,
  EmojiEvents as EmojiEventsIcon,
  LiveTv as LiveTvIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

function Escritorio() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const navigate = useNavigate();
  const storedEmail = localStorage.getItem("email");
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const [nivelesInscritos, setNivelesInscritos] = useState([]);
  const [certificados, setCertificados] = useState(0);
  const [transmisiones, setTransmisiones] = useState(0);

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (userData?.sub) {
        const inscripcionResponse = await dispatch(
          fetchInscripcion(userData.sub)
        );
        const inscripciones = inscripcionResponse.payload.inscripciones || [];
        const cursoIds = inscripciones.map(
          (inscripcion) => inscripcion.cursoId
        );
        const cursoPromises = cursoIds.map((cursoId) =>
          dispatch(fetchCursoDetail(cursoId))
        );
        Promise.all(cursoPromises).then((responses) => {
          const cursosNombres = responses
            .filter((cursoResponse) => cursoResponse.payload)
            .map((cursoResponse) => cursoResponse.payload.name);
          setCursosInscritos(cursosNombres);
        });
      }
    };

    const fetchNivelesInscritos = async () => {
      if (userData?.sub) {
        try {
          const response = await axios.get(
            `/user/${userData.sub}/grupos-nivel`
          );
          setNivelesInscritos(response.data.grupos);
        } catch (error) {
          console.error(
            "Error al obtener los niveles inscritos del usuario:",
            error
          );
        }
      }
    };

    const fetchCertificados = async () => {
      if (userData?.sub) {
        try {
          const [
            certificadosCursoRes,
            certificadosNivelRes,
            certificadosModuloRes,
          ] = await Promise.all([
            axios.get(`/certificadosCurso/usuario/${userData.sub}`),
            axios.get(`/certificados/${userData.sub}`),
            axios
              .get(`/certificadosModulo/usuario/${userData.sub}`)
              .catch((error) => {
                if (error.response && error.response.status === 404) {
                  console.warn("No se encontraron certificados de módulo.");
                  return { data: [] }; // Devolver un array vacío si no hay certificados
                } else {
                  throw error;
                }
              }),
          ]);

          const certificadosCurso = certificadosCursoRes.data.length || 0;
          const certificadosNivel = certificadosNivelRes.data.length || 0;
          const certificadosModulo = certificadosModuloRes.data.length || 0;

          const totalCertificados =
            certificadosCurso + certificadosNivel + certificadosModulo;

          setCertificados(totalCertificados);
        } catch (error) {
          console.error("Error fetching certificates:", error);
        }
      }
    };
    const fetchTransmisiones = async () => {
      try {
        const response = await axios.get("/transmisiones");
        setTransmisiones(response.data.length);
      } catch (error) {
        console.error("Error fetching transmissions:", error);
      }
    };

    fetchCourses();
    fetchNivelesInscritos();
    fetchCertificados();
    fetchTransmisiones();
  }, [dispatch, userData]);

  const totalCursos = cursosInscritos.length + nivelesInscritos.length;

  const containerStyle =
    "flex flex-wrap justify-center items-center h-auto p-4";
  const cardStyle =
    "w-48 md:w-56 h-44 md:h-52 p-4 border-2 border-blue-500 rounded-lg shadow-lg mx-2 my-4 text-center flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer bg-white hover:bg-blue-100";
  const labelStyle = "text-base md:text-lg lg:text-xl font-semibold mt-2";
  const countStyle = "font-bold text-gray-700 text-2xl md:text-3xl lg:text-4xl";
  const iconContainerStyle =
    "w-14 h-14 p-2 rounded-full bg-blue-100 text-center";
  const iconStyle = "text-blue-500";

  const cursosInscritosRedirect = () => {
    navigate("/estudiante/cursosInscritos");
    window.location.reload();
  };

  return (
    <div className="sm:pl-2 lg:pl-20">
      <div className={containerStyle}>
        <div className={cardStyle} onClick={cursosInscritosRedirect}>
          <div className={iconContainerStyle}>
            <ImportContactsIcon className={iconStyle} fontSize="large" />
          </div>
          <h3 className={labelStyle}>Mis Cursos</h3>
          <p className={countStyle}>{totalCursos}</p>
          <p className="text-sm text-gray-500">Haz clic para ver tus cursos</p>
        </div>

        <div
          className={cardStyle}
          onClick={() => navigate("/estudiante/certificados")}
        >
          <div className={iconContainerStyle}>
            <EmojiEventsIcon className={iconStyle} fontSize="large" />
          </div>
          <h3 className={labelStyle}>Certificados</h3>
          <p className={countStyle}>{certificados}</p>
          <p className="text-sm text-gray-500">
            Haz clic para ver tus certificados
          </p>
        </div>

        <div className={cardStyle} onClick={() => navigate("/transmisiones")}>
          <div className={iconContainerStyle}>
            <LiveTvIcon className={iconStyle} fontSize="large" />
          </div>
          <h3 className={labelStyle}>Transmisiones</h3>
          <p className={countStyle}>{transmisiones}</p>
          <p className="text-sm text-gray-500">
            Haz clic para ver las transmisiones
          </p>
        </div>

        <div className={cardStyle} onClick={() => navigate("/Comunidad")}>
          <div className={iconContainerStyle}>
            <PeopleIcon className={iconStyle} fontSize="large" />
          </div>
          <h3 className={labelStyle}>Comunidad</h3>
          <p className="text-sm text-gray-500">
            Haz clic para ver la comunidad
          </p>
        </div>
      </div>
    </div>
  );
}

export default Escritorio;
