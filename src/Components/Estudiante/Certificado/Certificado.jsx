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
    alignItems: 'center'
  };

  const contentStyle = {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '10px',
    maxWidth: '80%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Certificado de Teología</h1>
        <p style={{ fontSize: '24px', marginBottom: '20px' }}>Este documento certifica que</p>
        <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Niria Alvira Rojas</h2>
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>ha completado satisfactoriamente el Nivel 2 de Teología con orientación Profética</p>
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>en la Fundación Llave Para Las Naciones</p>
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>Con una intensidad horaria de Ochenta (80) Horas</p>
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>Número de Identificación 35473962 de Colombia</p>
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>Sahagún - Colombia</p>
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>www.llaveparalasnaciones.com</p>
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>La autenticidad de este documento puede ser verificada mediante la solicitud al correo admin@llaveparalasnaciones.com</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
          <div>
            <p style={{ fontSize: '20px' }}>Apostol Diego Rullier</p>
            <p style={{ fontSize: '20px' }}>Rector</p>
          </div>
          <div>
            <p style={{ fontSize: '20px' }}>Profeta Petra Montecino</p>
            <p style={{ fontSize: '20px' }}>Directora</p>
          </div>
        </div>
        <p style={{ fontSize: '20px', marginTop: '50px' }}>Se expide a los 22 días del mes de Abril del año 2023</p>
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>Registrado en el libro de Actas N.02-0</p>
      </div>
    </div>
  );
}