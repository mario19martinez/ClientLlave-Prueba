// eslint-disable-next-line no-unused-vars
import React from "react";
import llve from "./Logos/llve.png"; // Asegúrate de que la ruta y el nombre del archivo sean correctos
import isacar from "./Logos/isacar.jpg";
import investigacion from "./Logos/investigacion.jpg";
import viviendo from "./Logos/viviendo.png";

const Empresas = () => {
  return (
    <div className="py-8 bg-gray-200 pt-32">
      <div className="container mx-auto">
        <h1 className="text-4xl text-gray-800 md:text-5xl font-semibold mb-4 mt-8 text-center">
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
                src={investigacion}
                alt="Instituto"
                className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mb-4 max-w-xs"
              />
            </a>
            <a
              href="https://viviendoenplenitud-aopnb88rqmfa80n9.builder-preview.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={viviendo}
                alt="Viviendo"
                className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mb-4 max-w-xs"
              />
            </a>
            <img
              src={llve}
              alt="Llave"
              className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mb-4 max-w-xs"
            />
            <img
              src={isacar}
              alt="Isacar"
              className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mb-4 max-w-xs"
            />
          </div>
        </div>

        {/* Sección para pantallas medianas y grandes */}
        <div className="hidden md:flex flex-col justify-center">
          {/* Imágenes en pantallas medianas y grandes */}
          <div className="flex flex-wrap justify-center items-center pt-10">
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
                  src={investigacion}
                  alt="Instituto"
                  className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mx-auto"
                />
              </a>
            </div>

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
                  src={viviendo}
                  alt="Viviendo"
                  className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mx-auto"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center pb-20">
            <div
              className="w-full md:w-1/2 mb-6 px-2 md:px-4 max-w-72 custom-margin"
              style={{
                marginRight: "80px",
                marginTop: "60px",
                marginBottom: "60px",
              }}
            >
              <img
                src={llve}
                alt="Llave"
                className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mx-auto"
              />
            </div>

            <div
              className="w-full md:w-1/2 mb-6 px-2 md:px-4 max-w-72 custom-margin"
              style={{
                marginLeft: "80px",
              }}
            >
              <img
                src={isacar}
                alt="Isacar"
                className="rounded-xl transition duration-300 ease-in-out transform hover:scale-105 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empresas;