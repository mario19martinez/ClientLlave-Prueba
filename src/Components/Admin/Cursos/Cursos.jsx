// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import CursosList from "./CursosList";

function Cursos() {
  // Suponemos que "cursos" es un arreglo vacío para mostrar la lista de cursos
  const cursos = [];
  const [selectedCurso, setSelectedCurso] = useState(null);

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start lg:space-x-8 p-4">
      <div className="w-full lg:w-1/3">
        <CursosList cursos={cursos} onSelectCurso={setSelectedCurso} cursoSeleccionado={selectedCurso} />
      </div>
    </div>
  );
}

export default Cursos;
