// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import imgCertificado from "../../../assets/fondoCertificado.png";

export default function Certificado({
  userData,
  selectedCountry,
  inscritoSeleccionado,
}) {
  // Obtener la fecha actual
  const currentDate = new Date();
  // Formatear la fecha como "DD de mes del año"
  const formattedDate = `${currentDate.getDate()} de ${
    [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ][currentDate.getMonth()]
  } del ${currentDate.getFullYear()}`;

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
          {userData.nombre} {userData.apellido}
        </h2>
        <p className="text-base mb-4">
          ha completado satisfactoriamente el {inscritoSeleccionado} de <br />
          Teología con orientación Profética
        </p>
        <p className="text-base mb-4">
          en la Fundación Llave Para Las Naciones
        </p>
        <p className="text-base mb-4">
          Con una intensidad horaria de Ochenta (80) Horas
        </p>
        <p className="text-base mb-4">
          Número de Identificación {userData.tipoDocumento}{" "}
          {userData.numeroDocumento} de {selectedCountry}
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
        <p className="text-base">Registrado en el libro de Actas N.02-0</p>
      </div>
    </div>
  );
}

// Validación de PropTypes
Certificado.propTypes = {
  userData: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    apellido: PropTypes.string.isRequired,
    tipoDocumento: PropTypes.string.isRequired,
    numeroDocumento: PropTypes.string.isRequired,
  }).isRequired,
  selectedCountry: PropTypes.string.isRequired,
  inscritoSeleccionado: PropTypes.string.isRequired,
};
