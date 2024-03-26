// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import CursoDetail from "../../Components/CursoDetail/CursoDetail";
import Cursos from "../../Components/Cursos/Cursos";
import Nav from "../../Components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EventIcon from "@mui/icons-material/Event";

export default function ViewClases() {
  const navigate = useNavigate();

  return (
    <div>
      <Nav />
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 translate-y-2 translate-x-8 rounded transition duration-300 ease-in-out"
      >
        Atras
      </button>
      <div className="flex flex-col">
        <CursoDetail />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex flex-col space-y-4 py-10">
            <p className="text-gray-700 font-semibold text-center hidden sm:block">
              ¿Quieres más información sobre cómo ser parte del entrenamiento
              profético? Comunícate con administración:
            </p>
            <button
              onClick={() =>
                window.open("https://wa.me/+573126096603", "_blank")
              }
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded items-center justify-center hidden sm:flex"
            >
              <WhatsAppIcon className="mr-2" />
              Más información
            </button>
            <p className="text-gray-700 font-semibold text-center hidden sm:block">
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
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded items-center justify-center hidden sm:flex"
            >
              <WhatsAppIcon className="mr-2" />
              Grupo de WhatsApp de clases en vivo
            </button>
            <p className="text-gray-700 font-semibold text-center hidden sm:block">
              ¿Quieres agendar una cita?
            </p>
            <button
              onClick={() =>
                window.open(
                  "https://calendly.com/llaveparalasnaciones/llamada-personal?month=2024-03",
                  "_blank"
                )
              }
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded items-center justify-center hidden sm:flex"
            >
              <EventIcon className="mr-2" />
              Agendar Cita
            </button>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
            Descripción
          </h3>
          <p className="text-lg sm:text-xl leading-relaxed text-gray-700 text-justify">
            El Entrenamiento Profético es útil cuando las personas desean un
            cambio radical y buscan cambiar de manera definitiva su forma de
            vivir, apuntando siempre a una mejora integral y con resultados
            extraordinarios, más allá de lo común.
          </p>
        </div>
        <Cursos />
      </div>
    </div>
  );
}