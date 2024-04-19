// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import banner from "../../assets/Banner.jpeg";

export default function Banners() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="py-5 px-3 flex flex-col md:flex-row">
      <div className="md:w-1/2">
        <img
          src={banner}
          alt="Banner"
          onClick={toggleModal}
          className="w-full h-full object-cover cursor-pointer"
        />
      </div>

      <div className="md:w-1/2 p-4 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-3 text-gray-800 text-justify">
          ¿Qué es el Entrenamiento Profético?
        </h2>
        <p className="mb-2 text-gray-700 text-justify">
          El Entrenamiento Profético comenzó, en cierta forma, como un proceso
          para ayudar a las personas a mejorar sus resultados. Por ello, se
          puede concebir al Entrenamiento Profético como un entrenamiento en
          carácter y disciplina tendiente a bendecir el estilo de vida de las
          personas. Lo profético es una dimensión sobrenatural donde Dios,
          quien, desde su centralidad en la vida del hombre, nos revela sus
          diseños para cada vida en particular.
        </p>
        <p className="text-gray-700 text-justify">
          El Entrenamiento Profético, se puede entender como una “técnica de
          entrenamiento, para que se pueda manifestar la voluntad y los diseños
          de Dios para nuestra vida”. En el Entrenamiento Profético el entrenado
          aprende sobre sí mismo y su alrededor, identifica y comparte sus
          descubrimientos y al mismo tiempo cambia su paradigma para lograr una
          transformación profunda de sí mismo. Pasando de vivir en el alma, a
          vivir por su espíritu unido al Espíritu Santo.
        </p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <img
              src={banner}
              alt="Banner"
              style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            />
            <button
              onClick={toggleModal}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}