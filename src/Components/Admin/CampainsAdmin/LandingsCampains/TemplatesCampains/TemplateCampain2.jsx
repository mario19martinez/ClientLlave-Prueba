import { useState, useEffect } from "react";
import axios from "axios";
import FormBlanco from "../../FormsCampains/FormBlanco";

export default function TemplateCampain2() {
  const [landingData, setLandingData] = useState(null);

  useEffect(() => {
    // Función para obtener los datos de la landing page
    const fetchLandingData = async () => {
      try {
        const response = await axios.get("/campein/:campeinId/landingcampein");
        setLandingData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de la landing page:", error);
      }
    };

    fetchLandingData(); // Llamar a la función al montar el componente
  }, []); // Ejecutar solo una vez al montar el componente

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
                src={landingData.img || "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"}
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
                    href="/"
                    aria-label=""
                    className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700"
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
                    {landingData.subtitulo || "Aqui va el subtitulo de la campaña"}
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
    </div>
  );
}