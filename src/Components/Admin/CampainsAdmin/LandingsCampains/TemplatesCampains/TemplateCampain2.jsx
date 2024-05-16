import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import FormBlanco from "../../FormsCampains/FormBlanco";
import FormModal from "../../FormsCampains/FormModal";

export default function TemplateCampain2({ campeinId, landingId }) {
  const [landingData, setLandingData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Función para obtener los datos de la landing page
    const fetchLandingData = async () => {
      try {
        const response = await axios.get(
          `/campein/${campeinId}/landingcampein/${landingId}`
        );
        setLandingData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de la landing page:", error);
      }
    };

    fetchLandingData(); // Llamar a la función al montar el componente
  }, [campeinId, landingId]); // Ejecutar solo una vez al montar el componente

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {landingData && (
        <>
          <div className="relative">
            <img
              src={
                landingData.img ||
                "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
              }
              className="absolute inset-0 object-cover w-full h-full"
              alt=""
            />
            <div className="relative bg-gray-900 bg-opacity-75">
              <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="flex flex-col items-center justify-between xl:flex-row">
                  <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                      {landingData.titulo || "Aqui va el titulo de la landing"}
                    </h2>
                    <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
                      {landingData.contenido || "Aqui va el contenido"}
                    </p>
                  </div>
                  <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                    <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                      <FormBlanco idCampain={campeinId} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
              <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
                <a href="/" className="mb-6 sm:mx-auto">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
                    <svg
                      className="w-10 h-10 text-deep-purple-accent-400"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </div>
                </a>
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                  <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    {landingData.subtitulo ||
                      "Aqui va el subtitulo de la campaña"}
                  </h2>
                  <p className="text-base text-gray-700 md:text-lg">
                    {landingData.contenido2 || "Aqui va el contenido2"}
                  </p>
                </div>
                <div>
                  <a
                    onClick={openModal}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                  >
                    Registro
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 text-gray-800 font-sans">
            <div className="container mx-auto p-6">
              <h1 className="text-3xl lg:text-4xl text-blue-900 mb-6 text-center font-semibold">
                Conoce a tus presentadores
              </h1>
              <div className="flex flex-col lg:flex-row justify-center items-center">
                <div className="lg:flex-1 m-4">
                  <img
                    src="https://llaveparalasnaciones.online/wp-content/uploads/2023/09/Profeta-e1693861035649.jpg"
                    alt="profeta"
                    className="w-40 h-40 lg:w-60 lg:h-60 rounded-full mx-auto"
                  />
                  <h3 className="text-xl lg:text-2xl mt-4 text-blue-900 text-center">
                    Petra Montecino
                  </h3>
                  <h4 className="text-lg lg:text-xl text-center">Profeta</h4>
                </div>
                <div className="lg:flex-1 m-4">
                  <img
                    src="https://llaveparalasnaciones.online/wp-content/uploads/2023/09/Apostol-e1693861235915.jpg"
                    alt="Apostol"
                    className="w-40 h-40 lg:w-60 lg:h-60 rounded-full mx-auto"
                  />
                  <h3 className="text-xl lg:text-2xl mt-4 text-blue-900 text-center">
                    Diego Rullier
                  </h3>
                  <h4 className="text-lg lg:text-xl text-center">Apóstol</h4>
                </div>
              </div>
              <p className="text-base lg:text-lg mt-8 text-gray-700 text-center">
                Somos mentores altamente calificados y experimentados para
                trabajar en áreas como: matrimonio, familia, finanzas, negocios,
                relaciones personales, salud, bienestar y desarrollo personal.
                Con más de 25 años de experiencia, ayudamos a las personas a
                lograr una transformación total en sus vidas, brindándoles las
                herramientas y el apoyo necesarios para alcanzar sus sueños y
                vivir una vida plena y satisfactoria. Nuestra forma de trabajo
                es única porque ofrece la posibilidad de adentrarse en una
                mirada introspectiva. Y a partir de allí, iniciar un proceso de
                reconocimiento personal e identificación necesario para
                establecer los lineamientos del trabajo posterior.
              </p>
            </div>
            <div className="text-center py-4">
              <h1 className="text-2xl text-blue-900">
                ¿PARA QUIÉN ES ESTE ENTRENAMIENTO?
              </h1>
              <p className="text-base my-2">
                Entrenamiento Profético Para Quienes Quieren Crecer En Estatura
                Espiritual.
                <br />
                Descubre El Fundamento Por La Palabra Que Te Llevará A Vivir Con
                El Direccionamiento De Dios Y Así Poder Avanzar Al Cumplimiento
                De Tu Destino Profético.
              </p>
              <p className="text-base my-2">
                TE VEMOS EN EL ENTRENAMIENTO PORQUE SI PUEDES VIVIR SIENDO
                DIRECCIONADO POR DIOS.
              </p>
            </div>
            <div className="text-center pb-4">
              <button
                type="button"
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-600 text-white text-lg md:text-xl lg:text-2xl px-14 py-8 rounded-full font-bold transition duration-300 transform hover:scale-105 hover:shadow-md"
              >
                ¡Regístrate Ahora!
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white p-8 rounded-md max-w-lg w-full">
              <FormModal idCampain={campeinId} />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-400"
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

TemplateCampain2.propTypes = {
  campeinId: PropTypes.string.isRequired,
  landingId: PropTypes.string.isRequired,
};