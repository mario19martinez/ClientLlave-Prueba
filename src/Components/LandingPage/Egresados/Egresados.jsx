// eslint-disable-next-line no-unused-vars
import React from 'react';

const Egresados = () => {
  return (
    <div className="flex flex-row items-center justify-center w-screen">
      <div className="rounded-lg max-w-5xl overflow-hidden shadow-lg p-8 mx-6">
        <h2 className="text-4xl font-bold mb-6 text-center">Egresados</h2>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/2 pr-4 md:pr-8">
            <p className="text-gray-800 text-lg md:text-xl text-center">¡Explora las historias de nuestros egresados y su éxito después de graduarse!</p>
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <img src="https://llaveparalasnaciones.online/wp-content/uploads/2024/02/EGRESADOS.png" alt="Egresados" className="w-full h-auto rounded-lg transition transform hover:scale-105" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Egresados;