import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import FormBlanco from "../../FormsCampains/FormBlanco";
import FormCompleto from "../../FormsCampains/FormCompleto";
import FormModal from "../../FormsCampains/FormModal";

export default function TemplateCampain1({ campeinId, landingId }) {
  const [landingData, setLandingData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const response = await axios.get(
          `/campein/${campeinId}/landingcampein/${landingId}`
        );
        setLandingData(response.data);
        console.log("Datos Landing: ", response.data);
      } catch (error) {
        console.error("Error al obtener los datos de la landing page:", error);
      }
    };

    fetchLandingData();
  }, [campeinId, landingId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="font-sans">
      {landingData && (
        <>
          <section className="relative flex flex-col items-center lg:flex-row py-8 lg:py-16 bg-white">
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
              <img
                className="object-cover w-full h-64 sm:h-96 lg:h-full rounded-lg shadow-lg"
                src={
                  landingData.img ||
                  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                }
                alt=""
              />
            </div>
            <div className="max-w-xl mx-auto lg:mx-0 lg:mr-8 lg:pl-4 lg:pr-8">
              <div className="max-w-xl mb-6 lg:mb-10">
                <p className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-400">
                  Llave Para Las Naciones
                </p>
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                  {landingData.titulo || "Aquí va el título de la landing"}
                </h2>
                <p className="text-base text-gray-700 md:text-lg">
                  {landingData.contenido || "Aquí va el contenido"}
                </p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition-colors duration-300 ease-in-out"
                >
                  Registro
                </button>
              </div>
            </div>
          </section>

          <section className="overflow-hidden bg-gray-900 text-white py-16">
            <div className="container mx-auto px-4 md:px-24 lg:px-8">
              <div className="flex flex-col items-center justify-between xl:flex-row">
                <div className="w-full max-w-xl mb-12 xl:pr-16 xl:mb-0 xl:w-7/12">
                  <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none">
                    {landingData.subtitulo ||
                      "Aquí va el subtítulo de la campaña"}
                  </h2>
                  <p className="max-w-xl mb-4 text-base md:text-lg">
                    {landingData.contenido2 || "Aquí va el contenido2"}
                  </p>
                </div>
                <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                  <div className="relative">
                    <svg
                      viewBox="0 0 52 24"
                      fill="currentColor"
                      className="absolute bottom-0 right-0 z-0 hidden w-32 -mb-8 -mr-20 text-teal-400 lg:w-32 lg:-mr-16 sm:block"
                    >
                      <defs>
                        <pattern
                          id="766323e1-e594-4ffd-a688-e7275079d540"
                          x="0"
                          y="0"
                          width=".135"
                          height=".30"
                        >
                          <circle cx="1" cy="1" r=".7" />
                        </pattern>
                      </defs>
                      <rect
                        fill="url(#766323e1-e594-4ffd-a688-e7275079d540)"
                        width="52"
                        height="24"
                      />
                    </svg>
                    <div className="relative bg-white rounded shadow-2xl p-7 sm:p-10">
                      {landingData.formulario === "completo" ? (
                        <FormCompleto idCampain={campeinId} />
                      ) : (
                        <FormBlanco idCampain={campeinId} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-100 text-gray-800 py-16">
            <div className="container mx-auto px-6">
              <h1 className="text-3xl lg:text-4xl text-blue-900 mb-6 text-center font-semibold">
                Conoce a tus presentadores
              </h1>
              <div className="flex flex-col lg:flex-row justify-center items-center">
                <div className="lg:flex-1 m-4 text-center">
                  <img
                    src="https://llaveparalasnaciones.online/wp-content/uploads/2023/09/Profeta-e1693861035649.jpg"
                    alt="profeta"
                    className="w-40 h-40 lg:w-60 lg:h-60 rounded-full mx-auto"
                  />
                  <h3 className="text-xl lg:text-2xl mt-4 text-blue-900">
                    Petra Montecino
                  </h3>
                  <h4 className="text-lg lg:text-xl">Profeta</h4>
                </div>
                <div className="lg:flex-1 m-4 text-center">
                  <img
                    src="https://llaveparalasnaciones.online/wp-content/uploads/2023/09/Apostol-e1693861235915.jpg"
                    alt="Apostol"
                    className="w-40 h-40 lg:w-60 lg:h-60 rounded-full mx-auto"
                  />
                  <h3 className="text-xl lg:text-2xl mt-4 text-blue-900">
                    Diego Rullier
                  </h3>
                  <h4 className="text-lg lg:text-xl">Apóstol</h4>
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
          </section>

          <section className="bg-white text-center py-8">
            <h1 className="text-2xl text-blue-900 mb-4">
              ¿PARA QUIÉN ES ESTE ENTRENAMIENTO?
            </h1>
            <p className="text-base my-2">
              Entrenamiento Profético Para Quienes Quieren Crecer En Estatura
              Espiritual.
              <br />
              Descubre El Fundamento Por La Palabra Que Te Llevará A Vivir Con
              El Direccionamiento De Dios Y Así Poder Avanzar Al Cumplimiento De
              Tu Destino Profético.
            </p>
            <p className="text-base my-2">
              TE VEMOS EN EL ENTRENAMIENTO PORQUE SI PUEDES VIVIR SIENDO
              DIRECCIONADO POR DIOS.
            </p>
            <button
              onClick={openModal}
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white text-lg md:text-xl lg:text-2xl px-14 py-8 rounded-full font-bold transition duration-300 transform hover:scale-105 hover:shadow-md"
            >
              ¡Regístrate Ahora!
            </button>
          </section>

          {isModalOpen && (
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen px-4 py-8">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="bg-white p-8 rounded-md max-w-lg w-full relative">
                  <FormModal idCampain={campeinId} />
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                  >
                    &times;
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

TemplateCampain1.propTypes = {
  campeinId: PropTypes.string.isRequired,
  landingId: PropTypes.string.isRequired,
};
