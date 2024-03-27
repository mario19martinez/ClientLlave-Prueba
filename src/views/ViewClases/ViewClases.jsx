// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import CursoDetail from "../../Components/CursoDetail/CursoDetail";
import Cursos from "../../Components/Cursos/Cursos";
import Nav from "../../Components/Nav/Nav";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EventIcon from "@mui/icons-material/Event";
import { useNavigate } from "react-router-dom";

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
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Descripción
          </h3>
          <p className="text-lg sm:text-xl leading-relaxed text-gray-700">
            El Entrenamiento Profético es útil cuando las personas desean un
            cambio radical y buscan cambiar de manera definitiva su forma de
            vivir, apuntando siempre a una mejora integral y con resultados
            extraordinarios, más allá de lo común.
          </p>
        </div>
        <Cursos />
        <div className="flex flex-col space-y-4 px-10 py-10 lg:hidden">
          <p className="text-gray-700 font-semibold">
            ¿Quieres más información sobre cómo ser parte del entrenamiento
            profético? Comunícate con administración:
          </p>
          <button
            onClick={() => window.open("https://wa.me/+573126096603", "_blank")}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
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
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
          >
            <EventIcon className="mr-2" />
            Agendar Cita
          </button>
        </div>
      </div>
    </div>
  );
}