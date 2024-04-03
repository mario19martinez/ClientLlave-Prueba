// eslint-disable-next-line no-unused-vars
import React from "react";

export default function Certificado() {
  const containerStyle = {
    backgroundImage: 'url("https://1.bp.blogspot.com/-2s7B0R5OrY8/X9UQW8Wx6kI/AAAAAAAAHvM/-2Bz7PvZWU0zUn2WaeS7IRQekpNFhfhcQCLcBGAsYHQ/s2048/diplomas_certificados_adrianaarunima_freepik%2B%25282%2529.jpg")',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  };

  const contentContainerStyle = {
    padding: '140px', // Padding top and bottom
    maxWidth: '11000px'
  };

  const contentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    border: '2px solid #333',
    padding: '20px', // Padding left and right
  };

  const titleStyle = {
    fontSize: '36px',
    marginBottom: '20px',
    textDecoration: 'underline',
  };

  const textStyle = {
    fontSize: '20px',
    marginBottom: '10px',
    lineHeight: '1.6',
  };

  const signatureContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '50px',
  };

  const signatureStyle = {
    fontSize: '20px',
    margin: '5px 0',
  };

  const dateStyle = {
    fontSize: '20px',
    marginTop: '50px',
  };

  return (
    <div style={containerStyle}>
      <div style={contentContainerStyle}>
        <div style={contentStyle}>
          <h1 style={titleStyle}>Certificado de Teología</h1>
          <p style={textStyle}>Este documento certifica que</p>
          <h2 style={titleStyle}>Niria Alvira Rojas</h2>
          <p style={textStyle}>ha completado satisfactoriamente el Nivel 2 de Teología con orientación Profética</p>
          <p style={textStyle}>en la Fundación Llave Para Las Naciones</p>
          <p style={textStyle}>Con una intensidad horaria de Ochenta (80) Horas</p>
          <p style={textStyle}>Número de Identificación 35473962 de Colombia</p>
          <p style={textStyle}>Sahagún - Colombia</p>
          <p style={textStyle}>www.llaveparalasnaciones.com</p>
          <p style={textStyle}>La autenticidad de este documento puede ser verificada mediante la solicitud al correo admin@llaveparalasnaciones.com</p>
          <div style={signatureContainerStyle}>
            <div>
              <p style={signatureStyle}>Apostol Diego Rullier</p>
              <p style={signatureStyle}>Rector</p>
            </div>
            <div>
              <p style={signatureStyle}>Profeta Petra Montecino</p>
              <p style={signatureStyle}>Directora</p>
            </div>
          </div>
          <p style={dateStyle}>Se expide a los 22 días del mes de Abril del año 2023</p>
          <p style={dateStyle}>Registrado en el libro de Actas N.02-0</p>
        </div>
      </div>
    </div>
  );
}