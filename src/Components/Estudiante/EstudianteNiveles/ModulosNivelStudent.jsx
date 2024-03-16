// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

function ModulosNivelStudent ({ nivelId }) {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get(`/niveles/${nivelId}/modulos`);
        setModulos(response.data);
      } catch (error) {
        console.error("Error al obtener los módulos:", error);
      }
    };
    fetchModulos();
  }, [nivelId]);

  useEffect(() => {
    const fetchClases = async (moduloId) => {
      try {
        const response = await axios.get(`/modulo/${moduloId}/clases`);
        return response.data.length; // Retorna el número de clases
      } catch (error) {
        console.error("Error al obtener las clases:", error);
        return 0; // Retorna 0 si hay error
      }
    };

    const updateModulosWithClasesCount = async () => {
      const updatedModulos = await Promise.all(
        modulos.map(async (modulo) => {
          const clasesCount = await fetchClases(modulo.id);
          return { ...modulo, clasesCount };
        })
      );
      setModulos(updatedModulos);
      setLoading(false);
    };

    // Agregar verificación para evitar actualización en cada render
    if (modulos.length > 0 && loading) {
      updateModulosWithClasesCount();
    }
  }, [modulos, loading]);

  // Función para truncar la descripción a 150 caracteres
  const truncateDescription = (description) => {
    if (description.length > 150) {
      return description.slice(0, 150) + "...";
    }
    return description;
  };

  return (
    <div className="">
      <h1 className="text-3xl font-semibold mb-4">Modulos</h1>
      <div>
        {modulos.map((modulo) => (
          <div
            key={modulo.id}
            className={`bg-white hover:bg-gray-300 shadow-lg shadow-blue-800/50 p-4 rounded-lg border-t-4 border-blue-500 hover:border-gray-200 transition-transform transform hover:-translate-y-1 last:mr-0 mb-4`}
          >
            <Link to={`/estudiante/nivel/${nivelId}/modulo/${modulo.id}`}>
              <h2 className="text-lg font-semibold mb-2">{modulo.titulo}</h2>
              <p className="text-gray-600">{truncateDescription(modulo.descripcion)}</p>
              {/* Asegurarse de que modulo.clasesCount esté definido antes de intentar mostrarlo */}
              <p className="text-gray-600">{modulo.clasesCount !== undefined ? modulo.clasesCount : "Cargando..."} Clases</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

ModulosNivelStudent.propTypes = {
  nivelId: PropTypes.string.isRequired,
};

export default ModulosNivelStudent;