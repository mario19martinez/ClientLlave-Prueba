// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import CursoDetail from "../../Components/CursoDetail/CursoDetail";
import Cursos from "../../Components/Cursos/Cursos";
import Nav from "../../Components/Nav/Nav";
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
      </div>
    </div>
  );
}