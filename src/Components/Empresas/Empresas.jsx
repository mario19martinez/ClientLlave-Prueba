// eslint-disable-next-line no-unused-vars
import React from "react";

const Empresas = () => {
  return (
    <div className="py-8 bg-gray-200 pt-32">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 md:mb-6">
          Empresas que nos respaldan:
        </h1>

        {/* Sección para pantallas pequeñas */}
        <div className="md:hidden">
          {/* Imágenes en pantallas pequeñas */}
          <div className="flex flex-col items-center">
            <a
              href="https://institutodeinvestigacioncientificadelaconductahumana.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://llaveparalasnaciones.online/wp-content/uploads/2024/02/facebook-profile-picture-mp8XDX5WDruxMGPW.jpg"
                alt="Facebook Logo"
                className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mb-4 max-w-xs"
              />
            </a>
            <a
              href="https://viviendoenplenitud-aopnb88rqmfa80n9.builder-preview.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://llaveparalasnaciones.online/wp-content/uploads/2024/03/Diseno-sin-titulo-26.png"
                alt="Logo Transparente"
                className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mb-4 max-w-xs"
              />
            </a>

            <img
              src="https://llaveparalasnaciones.online/wp-content/uploads/2023/08/logo-1.png"
              alt="Logo 1"
              className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mb-4 max-w-xs"
            />
            <img
              src="https://llaveparalasnaciones.online/wp-content/uploads/2024/02/Logo-Isacar-Consulting-1.jpg"
              alt="Logo 2"
              className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mb-4 max-w-xs"
            />
          </div>
        </div>

        {/* Sección para pantallas medianas y grandes */}
        <div className="hidden md:flex flex-col justify-center">
          {/* Imágenes en pantallas medianas y grandes */}
          <div className="flex flex-wrap justify-center items-center pt-10">
            {/* Primer elemento */}
            <div
              className="w-full md:w-1/2 mb-6 px-2 md:px-4 max-w-72 custom-margin"
              style={{
                marginRight: "80px",
                marginTop: "60px",
              }}
            >
              <a
                href="https://institutodeinvestigacioncientificadelaconductahumana.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://llaveparalasnaciones.online/wp-content/uploads/2024/02/facebook-profile-picture-mp8XDX5WDruxMGPW.jpg"
                  alt="Facebook Logo"
                  className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mx-auto"
                />
              </a>
            </div>

            {/* Segundo elemento */}
            <div
              className="w-full md:w-1/2 mb-6 px-2 md:px-4 max-w-72 custom-margin"
              style={{
                marginLeft: "80px",
                marginTop: "60px",
              }}
            >
              <a
                href="https://viviendoenplenitud-aopnb88rqmfa80n9.builder-preview.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://llaveparalasnaciones.online/wp-content/uploads/2024/03/Diseno-sin-titulo-26.png"
                  alt="Logo Transparente"
                  className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mx-auto"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center pb-20">
            {/* Tercer elemento */}
            <div
              className="w-full md:w-1/2 mb-6 px-2 md:px-4 max-w-72 custom-margin"
              style={{
                marginRight: "80px",
                marginTop: "60px",
                marginBottom: "60px",
                "@media (max-width: 768px)": {
                  marginRight: 0,
                  marginTop: 0,
                  marginBottom: 0,
                },
              }}
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://llaveparalasnaciones.online/wp-content/uploads/2023/08/logo-1.png"
                  alt="Logo 1"
                  className="transition rounded-xl duration-300 ease-in-out transform hover:scale-105 mx-auto"
                />
              </a>
            </div>

            {/* Cuarto elemento */}
            <div
              className="w-full md:w-1/2 mb-6 px-2 md:px-4 max-w-72 custom-margin"
              style={{
                marginLeft: "80px",
                "@media (max-width: 768px)": { marginLeft: 0 },
              }}
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://llaveparalasnaciones.online/wp-content/uploads/2024/02/Logo-Isacar-Consulting-1.jpg"
                  alt="Logo 2"
                  className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mx-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empresas;