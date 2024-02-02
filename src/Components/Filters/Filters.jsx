// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";

function Filters({ onFilterChange }) {
  const [filtroPais, setFiltroPais] = useState("Todos");
  const [filtroCurso, setFiltroCurso] = useState("Todos");
  const [filtroBaneo, setFiltroBaneo] = useState("Todos");

  const handlePaisChange = (e) => {
    setFiltroPais(e.target.value);
    onFilterChange("pais", e.target.value);
  };

  const handleCursoChange = (e) => {
    setFiltroCurso(e.target.value);
    onFilterChange("curso", e.target.value);
  };

  const handleBaneadoChange = (e) => {
    setFiltroBaneo(e.target.value);
    onFilterChange("baneado", e.target.value);
  };


  return (
    <div className="mb-4 flex flex-row items-center">
      <label className="block font-bold mb-1 mx-2">Pais:</label>
      <select
        className="p-2 border rounded focus:outline-none focus:border-blue-500"
        value={filtroPais}
        onChange={handlePaisChange}
      >
        <option value="Todos">Todos</option>
        <option value="Argentina">Argentina</option>
        <option value="Mexico">Mexico</option>
        <option value="Colombia">Colombia</option>
      </select>
      <label className="block font-bold mb-1 mx-4">Curso:</label>
      <select
        className="p-2 border rounded focus:outline-none focus:border-blue-500"
        value={filtroCurso}
        onChange={handleCursoChange}
      >
        <option value="Todos">Todos</option>
        <option value="Curso A">Curso A</option>
        <option value="Curso B">Curso B</option>
        <option value="Curso C">Curso C</option>
      </select>
      <label className="block font-bold mb-1 mx-6">Baneado/No baneado:</label>
      <select
        className="p-2 border rounded focus:outline-none focus:border-blue-500"
        value={filtroBaneo}
        onChange={handleBaneadoChange}
      >
        <option value="Todos">Todos</option>
        <option value="Baneados">Baneados</option>
        <option value="No Baneados">No Baneados</option>
      </select>
    </div>
  );
}

Filters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filters;
