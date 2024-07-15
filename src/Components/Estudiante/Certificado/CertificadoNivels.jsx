import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import imgCertificado from "../../../assets/fondoCertificado.png";
import Nivel1 from "../../../assets/Nivel1.png";
import Nivel3 from "../../../assets/Nivel3.png";
import Nivel4 from "../../../assets/Nivel4.png";
import Logo from "../../../assets/logo.png";
import FirmaApostol from "../../../assets/Firmas/FirmaApostol.png";
import FirmaProfeta from "../../../assets/Firmas/FirmaProfeta.png";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const convertirNumeroRomano = (valor) => {
  if (!isNaN(valor)) {
    switch (parseInt(valor)) {
      case 1:
        return "Nivel I";
      case 2:
        return "Nivel II";
      case 3:
        return "Nivel III";
      case 4:
        return "Nivel IV";
      case 5:
        return "Especialización";
      default:
        return valor;
    }
  } else {
    switch (valor.toUpperCase()) {
      case "I":
        return "Nivel I";
      case "II":
        return "Nivel II";
      case "ll":
        return "Nivel II";
      case "III":
        return "Nivel III";
      case "IV":
        return "Nivel IV";
      case "V":
        return "Especialización";
      case "ESPECIALIZACION":
        return "Especialización";
      default:
        return valor;
    }
  }
};

export default function CertificadoNivels({ certificadoId }) {
  const [certificado, setCertificado] = useState(null);
  const [nivel, setNivel] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchCertificado = async () => {
      try {
        const response = await axios.get(`/certificado/${certificadoId}`);
        console.log('datos: ', response.data);
        const certificadoData = response.data.certificado;
        setCertificado(certificadoData);
        const nivelResponse = await axios.get(`/nivel/${certificadoData.nivelId}`);
        setNivel(nivelResponse.data);
        const userResponse = await axios.get(`/user/${certificadoData.userSub}`);
        setUserData(userResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (certificadoId) {
      fetchCertificado();
    }
  }, [certificadoId]);

  if (!certificado || !nivel || !userData) {
    return <p>Cargando...</p>;
  }

  const formattedDate = format(
    new Date(certificado.createdAt),
    "d 'de' MMMM 'del' yyyy",
    { locale: es }
  );

  const nombreCurso = convertirNumeroRomano(nivel.numero);

  let imagenFondo;
  switch (nombreCurso) {
    case "Nivel I":
      imagenFondo = Nivel1;
      break;
    case "Nivel III":
      imagenFondo = Nivel3;
      break;
    case "Nivel IV":
      imagenFondo = Nivel4;
      break;
    case "Especialización":
      imagenFondo = imgCertificado;
      break;
    default:
      imagenFondo = imgCertificado;
  }

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat flex justify-center items-center text-center"
      style={{
        backgroundImage: `url(${imagenFondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "1300px",
        height: "914px",
        fontFamily: "'Georgia', serif",
      }}
    >
      <div className="absolute p-8">
        <div className="max-w-4xl mx-auto">
          <img
            src={Logo}
            alt="Logo Llave Para Las Naciones"
            style={{ maxWidth: "200px", marginBottom: "20px" }}
            className="mx-auto"
          />
          <h3 className="text-lg mb-4 font-bold">
            Fundación Llave Para Las Naciones
          </h3>
          <p className="text-base mb-2">Con número de inscripción: S0509427</p>
          <h4
            className="text-xl mb-4"
            style={{ fontFamily: "'Arial', sans-serif" }}
          >
            Hace constar que:
          </h4>
          <h2 className="text-3xl font-bold mb-6">
            {userData.name} {userData.last_name}
          </h2>
          <p
            className="text-lg mb-4"
            style={{ fontFamily: "'Arial', sans-serif", fontSize: "1.2rem" }}
          >
            Identificado con {certificado.tipoDocumento} {certificado.documento}{" "}
            de {userData.pais}
          </p>
          <p
            className="text-lg mb-4"
            style={{ fontFamily: "'Arial', sans-serif", fontSize: "1.5rem" }}
          >
            Ha completado satisfactoriamente el {nombreCurso} de <br />
            Teología con orientación profética
          </p>
          <p
            className="text-lg mb-4"
            style={{ fontFamily: "'Arial', sans-serif" }}
          >
            Sahagún - Colombia
          </p>
          <p
            className="text-lg mb-4"
            style={{ fontFamily: "'Arial', sans-serif" }}
          >
            www.llaveparalasnaciones.com
          </p>
          <p
            className="text-base mb-8"
            style={{
              fontFamily: "'Arial', sans-serif",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            La autenticidad de este documento puede ser verificada mediante la{" "}
            <br />
            solicitud al correo admin@llaveparalasnaciones.com
          </p>
          <div className="flex justify-between mb-8">
            <div>
              <img
                src={FirmaApostol}
                alt="Firma Apostol"
                style={{ maxWidth: "180px", marginBottom: "8px" }}
              />
              <p
                className="text-lg mb-2"
                style={{
                  fontFamily: "'Arial', sans-serif",
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
              >
                Apostol Diego Rullier
              </p>
              <p
                className="text-md"
                style={{ fontFamily: "'Arial', sans-serif" }}
              >
                Rector
              </p>
            </div>
            <div>
              <img
                src={FirmaProfeta}
                alt="Firma Profeta"
                style={{ maxWidth: "180px", marginBottom: "8px" }}
              />
              <p
                className="text-lg mb-2"
                style={{
                  fontFamily: "'Arial', sans-serif",
                  fontStyle: "italic",
                  fontWeight: "bold",
                }}
              >
                Profeta Petra Montecino
              </p>
              <p
                className="text-md"
                style={{ fontFamily: "'Arial', sans-serif" }}
              >
                Directora
              </p>
            </div>
          </div>
          <p
            className="text-base mb-2"
            style={{ fontFamily: "'Arial', sans-serif" }}
          >
            Se expide el {formattedDate}
          </p>
          <p
            className="text-base"
            style={{ fontFamily: "'Arial', sans-serif" }}
          >
            Registrado en el libro de Actas N. {certificado.numero_certificado}
          </p>
        </div>
      </div>
    </div>
  );
}

// Validación de PropTypes
CertificadoNivels.propTypes = {
  certificadoId: PropTypes.string.isRequired,
};