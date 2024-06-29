import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PropTypes from "prop-types";

export default function SelectedGrupo({ id }) {
  const [grupos, setGrupos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener los grupos del nivel
    const fetchGrupos = async () => {
      try {
        const response = await axios.get(`/niveles/${id}/grupos`);
        setGrupos(response.data);
      } catch (error) {
        console.error("Error al obtener los grupos:", error);
      }
    };

    fetchGrupos();
  }, [id]);

  return (
    <div className="p-6 bg-gray-100 w-full items-center">
      <button
        className="self-start mb-4 p-2 flex items-center bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        onClick={() => window.history.back()}
      >
        <ArrowBackIcon className="mr-2" />
        Atrás
      </button>
      <h1 className="text-2xl font-bold mb-6">Seleccionar grupo del nivel</h1>
      <div className="w-full flex flex-col items-center">
        {grupos.length > 0 ? (
          grupos.map((grupo) => (
            <button
              onClick={() => navigate(`/admin/certificado/${id}/${grupo.id}`)}
              key={grupo.id}
              className="w-full max-w-xs m-2 p-4 bg-green-500 text-white rounded shadow-lg hover:bg-green-600"
            >
              {grupo.name}
            </button>
          ))
        ) : (
          <p>No se encontraron grupos.</p>
        )}
      </div>
    </div>
  );
}

SelectedGrupo.propTypes = {
  id: PropTypes.string.isRequired,
};