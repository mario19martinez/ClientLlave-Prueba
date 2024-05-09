import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import FormBlanco from "../../FormsCampains/FormBlanco";

export default function TemplateCampain1({ campeinId, landingId }) {
  const [landingData, setLandingData] = useState(null);

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

    fetchLandingData();
  }, [campeinId, landingId]);

  return (
    <div>
      {landingData && (
        <>
          <div className="relative bg-gray-100 text-gray-800 font-sans flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
            <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
              <svg
                className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
                viewBox="0 0 100 100"
                fill="currentColor"
                preserveAspectRatio="none slice"
              >
                <path d="M50 0H100L50 100H0L50 0Z" />
              </svg>
              <img
                className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
                src={
                  landingData.img ||
                  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                }
                alt=""
              />
            </div>
            <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
              <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                  Llave Para Las Naciones
                </p>
                <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                  {landingData.titulo || "Aqui va el titulo de la landing"}
                </h2>
                <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
                  {landingData.contenido || "Aqui va el contenido"}
                </p>
                <div className="flex items-center">
                  <a
                    href="/registro"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                  >
                    Registro
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-gray-900">
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
              <div className="flex flex-col items-center justify-between xl:flex-row">
                <div className="w-full max-w-xl mb-12 xl:pr-16 xl:mb-0 xl:w-7/12">
                  <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                    {landingData.subtitulo ||
                      "Aqui va el subtitulo de la campaña"}
                  </h2>
                  <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
                    {landingData.contenido2 || "Aqui va el contenido2"}
                  </p>
                </div>
                <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                  <div className="relative">
                    <svg
                      viewBox="0 0 52 24"
                      fill="currentColor"
                      className="absolute bottom-0 right-0 z-0 hidden w-32 -mb-8 -mr-20 text-teal-accent-400 lg:w-32 lg:-mr-16 sm:block"
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
                      <FormBlanco />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
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
            Somos mentores altamente calificados y experimentados para trabajar
            en áreas como: matrimonio, familia, finanzas, negocios, relaciones
            personales, salud, bienestar y desarrollo personal. Con más de 25
            años de experiencia, ayudamos a las personas a lograr una
            transformación total en sus vidas, brindándoles las herramientas y
            el apoyo necesarios para alcanzar sus sueños y vivir una vida plena
            y satisfactoria. Nuestra forma de trabajo es única porque ofrece la
            posibilidad de adentrarse en una mirada introspectiva. Y a partir de
            allí, iniciar un proceso de reconocimiento personal e identificación
            necesario para establecer los lineamientos del trabajo posterior.
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
            Descubre El Fundamento Por La Palabra Que Te Llevará A Vivir Con El
            Direccionamiento De Dios Y Así Poder Avanzar Al Cumplimiento De Tu
            Destino Profético.
          </p>
          <p className="text-base my-2">
            TE VEMOS EN EL ENTRENAMIENTO PORQUE SI PUEDES VIVIR SIENDO
            DIRECCIONADO POR DIOS.
          </p>
        </div>
        <div className="text-center pb-4">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white text-lg md:text-xl lg:text-2xl px-14 py-8 rounded-full font-bold transition duration-300 transform hover:scale-105 hover:shadow-md"
          >
            ¡Regístrate Ahora!
          </button>
        </div>
      </div>
    </div>
  );
}

TemplateCampain1.propTypes = {
  campeinId: PropTypes.string.isRequired,
  landingId: PropTypes.string.isRequired,
};