// eslint-disable-next-line no-unused-vars
import React from 'react';

const Empresas = () => {
  return (
    <div className="py-8 bg-gray-200 pt-32">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-6">Empresas que nos respaldan:</h1>
        <div className="flex flex-wrap justify-center items-center pt-10 pb-20">
          <a href="https://institutodeinvestigacioncientificadelaconductahumana.org/" target="_blank" rel="noopener noreferrer" className="w-full md:w-1/2 mb-6 px-4 md:px-2">
            <img src="https://llaveparalasnaciones.online/wp-content/uploads/2024/02/facebook-profile-picture-mp8XDX5WDruxMGPW.jpg" alt="Facebook Logo" className="w-48 md:w-auto transition duration-300 ease-in-out transform hover:scale-105 mx-auto" />
          </a>
          <a href="https://viviendoenplenitud-aopnb88rqmfa80n9.builder-preview.com/" target="_blank" rel="noopener noreferrer" className="w-full md:w-1/2 mb-8 px-4 md:px-2">
            <img src="https://llaveparalasnaciones.online/wp-content/uploads/2024/03/white_logo_color_background-scaled.jpg" alt="Logo Transparente" className="w-48 md:w-auto transition duration-300 ease-in-out transform hover:scale-105 mx-auto" />
          </a>
          <a target="_blank" rel="noopener noreferrer" className="w-full md:w-1/2 mb-6 px-4 md:px-2">
            <img src="https://llaveparalasnaciones.online/wp-content/uploads/2023/08/logo-1.png" alt="Logo 1" className="w-48 md:w-auto transition duration-300 ease-in-out transform hover:scale-105 mx-auto" />
          </a>
          <a target="_blank" rel="noopener noreferrer" className="w-full md:w-1/2 mb-6 px-4 md:px-2">
            <img src="https://llaveparalasnaciones.online/wp-content/uploads/2024/02/Logo-Isacar-Consulting-1.jpg" alt="Logo 2" className="w-48 md:w-auto transition duration-300 ease-in-out transform hover:scale-105 mx-auto" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Empresas;