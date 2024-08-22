import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCertificate, FaAward, FaGraduationCap } from "react-icons/fa";
import { getUserData } from "../../../../Redux/features/Users/usersSlice";
import axios from "axios";

export default function SelectedCertificado() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");
  const navigate = useNavigate();

  const [cursoCount, setCursoCount] = useState(0);
  const [nivelCount, setNivelCount] = useState(0);
  const [moduloCount, setModuloCount] = useState(0);

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        if (userData && userData.sub) {
          const cursosResponse = await axios.get(`/certificadosCurso/usuario/${userData.sub}`);
          setCursoCount(cursosResponse.data.length);

          const nivelesResponse = await axios.get(`/certificados/${userData.sub}`);
          setNivelCount(nivelesResponse.data.length);

          const modulosResponse = await axios.get(`/certificadosModulo/usuario/${userData.sub}`);
          setModuloCount(modulosResponse.data.length);
        }
      } catch (error) {
        console.error("Error fetching certificate counts", error);
      }
    };

    fetchCounts();
  }, [userData, dispatch]);

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

  return (
    <div className="flex flex-wrap p-16 mt-6">
      <div className={cardStyle} onClick={cursosCertificados}>
        <div className={iconContainerStyle}>
          <FaGraduationCap className={iconStyle} size="2rem" />
        </div>
        <h3 className={labelStyle}>Certificado de Curso</h3>
        <p className={countStyle}>{cursoCount}</p>
      </div>

      <div className={cardStyle} onClick={nivelesCertificados}>
        <div className={iconContainerStyle}>
          <FaAward className={iconStyle} size="2rem" />
        </div>
        <h3 className={labelStyle}>Certificado de Nivel</h3>
        <p className={countStyle}>{nivelCount}</p>
      </div>

      <div className={cardStyle} onClick={modulosCertificados}>
        <div className={iconContainerStyle}>
          <FaCertificate className={iconStyle} size="2rem" />
        </div>
        <h3 className={labelStyle}>Certificado de Módulo</h3>
        <p className={countStyle}>{moduloCount}</p>
      </div>
    </div>
  );
}