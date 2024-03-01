// eslint-disable-next-line no-unused-vars
import React from 'react';

const Empresas = () => {
  return (
    <div className="py-8 bg-gray-200 ">
      <div className="py-8 bg-gray-200 mt-4"></div>
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-6">Empresas que nos respaldan:</h1>
        <div className="flex flex-wrap justify-center items-center h-full pt-20 pb-20">
          <a href="https://institutodeinvestigacioncientificadelaconductahumana.org/" target="_blank" rel="noopener noreferrer" className="w-full md:w-1/2 mb-6 pl-56">
            <img src="https://llaveparalasnaciones.online/wp-content/uploads/2024/02/facebook-profile-picture-mp8XDX5WDruxMGPW.jpg" alt="Facebook Logo" className="w-1/2 pl-4 transition duration-300 ease-in-out transform hover:scale-105 mx-auto" />
          </a>
          <a href="https://viviendoenplenitud-aopnb88rqmfa80n9.builder-preview.com/" target="_blank" rel="noopener noreferrer" className="w-full md:w-1/2 mb-8 pr-56">
            <img src="https://llaveparalasnaciones.online/wp-content/uploads/2024/03/white_logo_color_background-scaled.jpg" alt="Logo Transparente" className="w-1/2 pl-4 transition duration-300 ease-in-out transform hover:scale-105 mx-auto" />
          </a>
          <a target="_blank" rel="noopener noreferrer" className="w-full md:w-1/2 mb-6 pl-56">
            <img src="https://llaveparalasnaciones.online/wp-content/uploads/2023/08/logo-1.png" alt="Logo 1" className="w-1/2 pl-4 transition duration-300 ease-in-out transform hover:scale-105 mx-auto" />
          </a>
          <a target="_blank" rel="noopener noreferrer" className="w-full md:w-1/2 mb-6 pr-56">
            <img src="https://llaveparalasnaciones.online/wp-content/uploads/2024/02/Logo-Isacar-Consulting-1.jpg" alt="Logo 2" className="w-1/2 pl-4 transition duration-300 ease-in-out transform hover:scale-105 mx-auto" />
          </a>
        </div>

      </div> 
    </div>
  );
};

export default Empresas;
