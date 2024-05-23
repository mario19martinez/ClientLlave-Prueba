import PropTypes from "prop-types";
import imgCertificado from "../../../assets/fondoCertificado.png";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Certificado({
  userData,
  cursoNombre,
  //cursoNivel,
  numeroCertificado,
  tipoDocumento,
  documento,
  fechaCreacion,
}) {
  // Formatear la fecha de creación
  const formattedDate = format(new Date(fechaCreacion), "d 'de' MMMM 'del' yyyy", { locale: es });

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat flex justify-center items-center text-center"
      style={{
        backgroundImage: `url(${imgCertificado})`,
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        minHeight: "665px", // Ajusta la altura mínima del contenedor
      }}
    >
      <div className="absolute max-w-3xl p-8">
        <h1 className="text-2xl mt-8 underline">Certificado de Teología</h1>
        <p className="text-base mb-4">Este documento certifica que</p>
        <h2 className="text-2xl">
          {userData.name} {userData.last_name}
        </h2>
        <p className="text-base mb-4">
          ha completado satisfactoriamente el {cursoNombre} de <br />
          Teología con orientacion profetica
        </p>
        <p className="text-base mb-4">
          en la Fundación Llave Para Las Naciones
        </p>
        <p className="text-base mb-4">
          Con una intensidad horaria de Ochenta (80) Horas
        </p>
        <p className="text-base mb-4">
          Identificado con {tipoDocumento} {documento} de{" "}
          {userData.pais}
        </p>
        <p className="text-base mb-4">Sahagún - Colombia</p>
        <p className="text-base mb-4">www.llaveparalasnaciones.com</p>
        <p className="text-base mb-4">
          La autenticidad de este documento puede ser verificada mediante la
          solicitud al correo admin@llaveparalasnaciones.com
        </p>
        <div className="flex justify-between mb-8">
          <div>
            <p className="text-base mb-2">Apostol Diego Rullier</p>
            <p className="text-base">Rector</p>
          </div>
          <div>
            <p className="text-base mb-2">Profeta Petra Montecino</p>
            <p className="text-base">Directora</p>
          </div>
        </div>
        {/* Mostrar la fecha de expedición */}
        <p className="text-base">Se expide el {formattedDate}</p>
        <p className="text-base">
          Registrado en el libro de Actas N. {numeroCertificado}
        </p>
      </div>
    </div>
  );
}

// Validación de PropTypes
Certificado.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    pais: PropTypes.string.isRequired,
  }).isRequired,
  cursoNombre: PropTypes.string.isRequired,
  cursoNivel: PropTypes.string.isRequired,
  numeroCertificado: PropTypes.string.isRequired,
  tipoDocumento: PropTypes.string.isRequired,
  documento: PropTypes.string.isRequired,
  fechaCreacion: PropTypes.string.isRequired,
};
