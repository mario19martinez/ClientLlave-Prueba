// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import CursoDetail from "../../Components/CursoDetail/CursoDetail";
import Cursos from "../../Components/Cursos/Cursos";
import Nav from "../../Components/Nav/Nav";
import { useNavigate } from "react-router-dom";

export default function ViewClases() {
  const navigate = useNavigate();
  // Supongamos que tienes una variable en el estado que indica si el usuario está inscrito en el curso
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Obtén el estado de inicio de sesión
  const isUserInCourse = true; // Aquí deberías tener la lógica para determinar si el usuario está inscrito en el curso

  return (
    <div>
      <Nav />
      <button 
      onClick={() => navigate('/entrenamiento')}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 translate-y-2 translate-x-8 rounded transition duration-300 ease-in-out">
        Atras
      </button>
      <div className="flex flex-col">
        <CursoDetail />
        {/* Condición para renderizar el componente CursoClases */}
        {isLoggedIn && isUserInCourse ? (
          <Cursos />
        ) : (
          // Mensaje si el usuario no está inscrito en el curso
          <h1>Para ver las clases, debes inscribirte en el curso.</h1>
        )}
      </div>
    </div>
  );
}