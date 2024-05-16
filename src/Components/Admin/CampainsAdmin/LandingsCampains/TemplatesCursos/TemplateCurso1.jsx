import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCursoDetail } from "../../../../../Redux/features/courses/coursesSlice";
import axios from "axios";
import ClasesLanding from "./ClasesLanding";
import PropTypes from "prop-types";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EventIcon from "@mui/icons-material/Event";

export default function TemplateCurso1({ idCurso, campeinId, landingId }) {
  const dispatch = useDispatch();

  const [landingData, setLandingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursoDetail, setCursoDetail] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    dispatch(fetchCursoDetail(idCurso))
      .then((response) => {
        setCursoDetail(response.payload);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [dispatch, idCurso]);

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col items-center justify-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            {landingData.titulo || "Aquí va el título de la landing"}
          </h1>
          <button
            onClick={() => setShowMoreInfo(!showMoreInfo)}
            className="text-blue-500 font-semibold mb-2 focus:outline-none"
          >
            {showMoreInfo ? "Ver menos información" : "Ver más información"}
          </button>
        </div>
        {showMoreInfo && (
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 lg:mr-4">
              <p className="text-gray-700 mb-4">
                {landingData.contenido || "Aquí va el contenido"}
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                className="object-cover w-full h-56 rounded-lg shadow-lg mb-4"
                src={
                  landingData.img ||
                  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                }
                alt=""
              />
            </div>
          </div>
        )}
      </div>

      {/* Desktop view */}
      <div className="hidden lg:flex bg-white shadow-md p-8 rounded-lg mb-8">
        <img
          src={cursoDetail?.image || "https://via.placeholder.com/300"}
          alt="Curso"
          className="w-1/2 h-auto object-cover rounded-lg mr-8"
        />
        <div className="w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {cursoDetail?.name}
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Duración: </strong> {cursoDetail?.duracion}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Horas Cátedra: </strong> {cursoDetail?.horas_catedra}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Costo: </strong> {cursoDetail?.costo}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Nivel: </strong> {cursoDetail?.nivel}
          </p>
        </div>
      </div>

      {/* Mobile view */}
      <div className="block lg:hidden bg-white shadow-md p-8 rounded-lg mb-8 text-gray-800">
        <img
          src={cursoDetail?.image || "https://via.placeholder.com/300"}
          alt="Curso"
          className="w-full h-auto object-cover rounded-lg mb-4"
        />
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-2 text-gray-900">
            {cursoDetail?.name}
          </h1>
          <p className="text-base text-gray-700 mb-2">
            <strong>Duración: </strong> {cursoDetail?.duracion}
          </p>
          <p className="text-base text-gray-700 mb-2">
            <strong>Horas Cátedra: </strong> {cursoDetail?.horas_catedra}
          </p>
          <p className="text-base text-gray-700 mb-2">
            <strong>Costo: </strong> {cursoDetail?.costo}
          </p>
          <p className="text-base text-gray-700 mb-2">
            <strong>Nivel: </strong> {cursoDetail?.nivel}
          </p>
        </div>
      </div>

      <ClasesLanding id={idCurso} />

      <div className="bg-gray-50 py-10 px-2 rounded-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col space-y-6 text-center">
            <p className="text-gray-700 font-semibold">
              ¿Quieres más información sobre cómo ser parte del entrenamiento
              profético? Comunícate con administración:
            </p>
            <button
              onClick={() =>
                window.open("https://wa.me/+573126096603", "_blank")
              }
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded flex items-center justify-center mx-auto"
            >
              <WhatsAppIcon className="mr-2" />
              Más información
            </button>
            <p className="text-gray-700 font-semibold">
              ¿Quieres participar en nuestras clases magistrales en vivo con el
              Apóstol Diego y la Profeta Petra? Únete al grupo de WhatsApp:
            </p>
            <button
              onClick={() =>
                window.open(
                  "https://chat.whatsapp.com/K5QAcc547LF0vlXotYiZat",
                  "_blank"
                )
              }
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded flex items-center justify-center mx-auto"
            >
              <WhatsAppIcon className="mr-2" />
              <span className="text-sm">
                Grupo de WhatsApp para clases en vivo
              </span>
            </button>
            <p className="text-gray-700 font-semibold">Agendar una cita:</p>
            <button
              onClick={() =>
                window.open(
                  "https://calendly.com/llaveparalasnaciones/llamada-personal?month=2024-03",
                  "_blank"
                )
              }
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded flex items-center justify-center mx-auto"
            >
              <EventIcon className="mr-2" />
              Agendar Cita
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

TemplateCurso1.propTypes = {
  idCurso: PropTypes.string.isRequired,
  campeinId: PropTypes.string.isRequired,
  landingId: PropTypes.string.isRequired,
};
