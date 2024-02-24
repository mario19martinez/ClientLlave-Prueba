// eslint-disable-next-line no-unused-vars
import React from 'react';

const Empresas = () => {
  return (
    <div className="py-8 bg-gray-200">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Empresas que nos respaldan:</h1>
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-center md:items-center">
          <img src="https://llaveparalasnaciones.online/wp-content/uploads/2024/02/facebook-profile-picture-mp8XDX5WDruxMGPW.jpg" alt="Facebook Logo" className="h-20 mx-6 mb-4 md:mb-0 transition duration-300 transform hover:scale-110" />
          <img src="https://llaveparalasnaciones.online/wp-content/uploads/2023/10/logo_transparent_background.png" alt="Logo Transparente" className="h-20 mx-6 mb-4 md:mb-0 transition duration-300 transform hover:scale-110" />
          <img src="https://llaveparalasnaciones.online/wp-content/uploads/2023/08/logo-1.png" alt="Logo 1" className="h-20 mx-6 mb-4 md:mb-0 transition duration-300 transform hover:scale-110" />
          <img src="https://llaveparalasnaciones.online/wp-content/uploads/2024/02/Logo-Isacar-Consulting-1.jpg" alt="Logo 2" className="h-20 mx-6 mb-4 md:mb-0 transition duration-300 transform hover:scale-110" />
        </div>
      </div>
    </div>
  );
};

export default Empresas;