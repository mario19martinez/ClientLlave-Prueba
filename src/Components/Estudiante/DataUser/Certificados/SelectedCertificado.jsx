import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCertificate, FaAward, FaGraduationCap } from "react-icons/fa";
import { getUserData } from "../../../../Redux/features/Users/usersSlice";
import CircularProgress from '@mui/material/CircularProgress';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import axios from "axios";

export default function SelectedCertificado() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  const [cursoCount, setCursoCount] = useState(0);
  const [nivelCount, setNivelCount] = useState(0);
  const [moduloCount, setModuloCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        if (userData && userData.sub) {
          const cursosResponse = await axios
            .get(`/certificadosCurso/usuario/${userData.sub}`)
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                console.warn("No se encontraron certificados de curso.");
                return { data: [] };
              } else {
                throw error;
              }
            });
          setCursoCount(cursosResponse.data.length || 0);

          const nivelesResponse = await axios
            .get(`/certificados/${userData.sub}`)
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                console.warn("No se encontraron certificados de nivel.");
                return { data: [] };
              } else {
                throw error;
              }
            });
          setNivelCount(nivelesResponse.data.length || 0);

          const modulosResponse = await axios
            .get(`/certificadosModulo/usuario/${userData.sub}`)
            .catch((error) => {
              if (error.response && error.response.status === 404) {
                console.warn("No se encontraron certificados de módulo.");
                return { data: [] };
              } else {
                throw error;
              }
            });
          setModuloCount(modulosResponse.data.length || 0);
        }
      } catch (error) {
        setError("Error fetching certificate counts");
        console.error("Error fetching certificate counts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [userData]);

  const cursosCertificados = () => {
    navigate("/estudiante/certificados/cursos");
    window.location.reload();
  };

  const nivelesCertificados = () => {
    navigate("/estudiante/certificados/nivel");
    window.location.reload();
  };

  const modulosCertificados = () => {
    navigate("/estudiante/certificados/modulo");
    window.location.reload();
  };

  const cardStyle =
    "w-48 md:w-56 h-44 md:h-52 p-4 border-2 border-blue-500 rounded-lg shadow-lg mx-2 my-4 text-center flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer bg-white hover:bg-blue-100";
  const labelStyle = "text-base md:text-lg lg:text-xl font-semibold mt-2";
  const countStyle = "font-bold text-gray-700 text-2xl md:text-3xl lg:text-4xl";
  const iconContainerStyle =
    "w-16 h-16 p-2 rounded-full bg-blue-100 flex items-center justify-center mb-2";
  const iconStyle = "text-blue-500";

  if (loading){
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600 mt-4 font-semibold">Cargando...</p>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 mt-4 font-semibold">Error: {error}</p>
          <p className="text-red-500 mt-4 font-semibold">Oops! Algo salió mal. Vuelve a intentarlo en un momento.</p>
          <p className="text-red-500 mt-4 font-semibold">
          <SentimentVeryDissatisfiedIcon fontSize="large" />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap p-16 mt-6">
      {cursoCount > 0 && (
        <div className={cardStyle} onClick={cursosCertificados}>
          <div className={iconContainerStyle}>
            <FaGraduationCap className={iconStyle} size="2rem" />
          </div>
          <h3 className={labelStyle}>Certificado de Curso</h3>
          <p className={countStyle}>{cursoCount}</p>
        </div>
      )}

      {nivelCount > 0 && (
        <div className={cardStyle} onClick={nivelesCertificados}>
          <div className={iconContainerStyle}>
            <FaAward className={iconStyle} size="2rem" />
          </div>
          <h3 className={labelStyle}>Certificado de Nivel</h3>
          <p className={countStyle}>{nivelCount}</p>
        </div>
      )}

      {moduloCount > 0 && (
        <div className={cardStyle} onClick={modulosCertificados}>
          <div className={iconContainerStyle}>
            <FaCertificate className={iconStyle} size="2rem" />
          </div>
          <h3 className={labelStyle}>Certificado de Módulo</h3>
          <p className={countStyle}>{moduloCount}</p>
        </div>
      )}
    </div>
  );
}