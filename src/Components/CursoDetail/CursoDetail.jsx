// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCursoDetail } from "../../Redux/features/courses/coursesSlice";
import { getUserData } from "../../Redux/features/Users/usersSlice";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EventIcon from "@mui/icons-material/Event";

function CursoDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cursoDetail, setCursoDetail] = useState(null);

  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    dispatch(fetchCursoDetail(id))
      .then((response) => {
        setCursoDetail(response.payload);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [dispatch, id]);

  useEffect(() => {
    if (storedEmail && !userData) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail, userData]);

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <div className="hidden sm:block bg-gray-100 p-8 rounded-lg lg:flex">
        <div className="flex items-start ml-8 lg:w-3/4">
          {/* Reemplazar la imagen con el video */}
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dZUnrBc9PXc?autoplay=1&controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full lg:w-3/5 h-96 object-contain rounded"
          ></iframe>

          <div className="flex flex-col space-y-4 mt-4 lg:ml-4 lg:mt-0 lg:w-2/5">
            <h1 className="text-2xl font-bold mb-2 text-gray-900">
              {cursoDetail.name}
            </h1>
            <p className="font-gabarito text-gray-900">
              <strong>Duración: </strong>
              {cursoDetail.duracion}
            </p>
            <p className="font-gabarito text-gray-900">
              <strong>Costo: </strong>
              {cursoDetail.costo}
            </p>
            <p className="font-gabarito text-gray-900">
              <strong>Nivel: </strong>
              {cursoDetail.nivel}
            </p>
            <div className="flex flex-col space-y-4">
              <p className="text-gray-700 font-semibold text-sm">
                ¿Quieres más información sobre cómo ser parte del entrenamiento
                profético? Comunícate con administración:
              </p>
              <button
                onClick={() =>
                  window.open("https://wa.me/+573126096603", "_blank")
                }
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
              >
                <WhatsAppIcon className="mr-2" />
                Más información
              </button>
              <p className="text-gray-700 font-semibold text-sm">
                ¿Quieres participar en nuestras clases magistrales en vivo con
                el Apóstol Diego y la Profeta Petra? Únete al grupo de WhatsApp:
              </p>
              <button
                onClick={() =>
                  window.open(
                    "https://chat.whatsapp.com/K5QAcc547LF0vlXotYiZat",
                    "_blank"
                  )
                }
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
              >
                <WhatsAppIcon className="mr-2" />
                <span className="text-sm">
                  Grupo de WhatsApp para clases en vivo
                </span>
              </button>

              <p className="text-gray-700 font-semibold text-sm">
                ¿Quieres agendar una cita?
              </p>
              <button
                onClick={() =>
                  window.open(
                    "https://calendly.com/llaveparalasnaciones/llamada-personal?month=2024-03",
                    "_blank"
                  )
                }
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
              >
                <EventIcon className="mr-2" />
                Agendar Cita
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-8 text-gray-800 block sm:hidden">
        <div className="flex flex-col items-center">
        <iframe
              width="100%" 
              height="380"
              src="https://www.youtube.com/embed/dZUnrBc9PXc?autoplay=1&controls=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-64 object-contain rounded-lg mb-4" 
            ></iframe>
          <h1 className="text-xl font-bold mb-2">{cursoDetail.name}</h1>
          <p className="text-base text-gray-700">
            <strong>Duración: </strong>
            {cursoDetail.duracion}
          </p>
          <p className="text-base text-gray-700">
              <strong>Costo: </strong>
              {cursoDetail.costo}
            </p>
          <p className="text-base text-gray-700">
            <strong>Nivel: </strong>
            {cursoDetail.nivel}
          </p>
        </div>
      </div>
    </>
  );
}

export default CursoDetail;
