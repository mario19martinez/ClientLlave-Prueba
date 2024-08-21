import { useNavigate } from "react-router-dom";
import { FaCertificate, FaAward, FaGraduationCap } from "react-icons/fa";

export default function SelectedCertificado() {
  const navigate = useNavigate();

  // Función para generar un número aleatorio del 1 al 10
  const getRandomNumber = () => Math.floor(Math.random() * 10) + 1;

  const cursosCertifcados = () => {
    navigate("/estudiante/certificados/cursos");
    window.location.reload()
  }

  const nivelesCertificados = () => {
    navigate("/estudiante/certificados/nivel");
    window.location.reload()
  }

  const cardStyle =
    "w-48 md:w-56 h-44 md:h-52 p-4 border-2 border-blue-500 rounded-lg shadow-lg mx-2 my-4 text-center flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer bg-white hover:bg-blue-100";
  const labelStyle = "text-base md:text-lg lg:text-xl font-semibold mt-2";
  const countStyle = "font-bold text-gray-700 text-2xl md:text-3xl lg:text-4xl";
  const iconContainerStyle =
    "w-16 h-16 p-2 rounded-full bg-blue-100 flex items-center justify-center mb-2";
  const iconStyle = "text-blue-500";

  return (
    <div className="flex flex-wrap  p-4 mt-6">
      <div className={cardStyle} onClick={cursosCertifcados}>
        <div className={iconContainerStyle}>
          <FaGraduationCap className={iconStyle} size="2rem" />
        </div>
        <h3 className={labelStyle}>Certificado de Curso</h3>
        <p className={countStyle}>{getRandomNumber()}</p>
      </div>

      <div className={cardStyle}>
        <div className={iconContainerStyle} onClick={nivelesCertificados}>
          <FaAward className={iconStyle} size="2rem" />
        </div>
        <h3 className={labelStyle}>Certificado de Nivel</h3>
        <p className={countStyle}>{getRandomNumber()}</p>
      </div>

      <div className={cardStyle}>
        <div className={iconContainerStyle}>
          <FaCertificate className={iconStyle} size="2rem" />
        </div>
        <h3 className={labelStyle}>Certificado de Módulo</h3>
        <p className={countStyle}>{getRandomNumber()}</p>
      </div>
    </div>
  );
}
