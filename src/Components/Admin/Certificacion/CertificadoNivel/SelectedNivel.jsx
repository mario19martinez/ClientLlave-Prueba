import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function SelectedNivel() {
  const [niveles, setNiveles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener los niveles
    const fetchNiveles = async () => {
      try {
        const response = await axios.get("/niveles");
        setNiveles(response.data);
      } catch (error) {
        console.error("Error al obtener los niveles:", error);
      }
    };

    fetchNiveles();
  }, []);

  return (
    <div className="p-6 w-full bg-gray-100 items-center">
      <button
        className="self-start mb-4 p-2 flex items-center bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        onClick={() => window.history.back()}
      >
        <ArrowBackIcon className="mr-2" />
        Atrás
      </button>
      <h1 className="text-2xl font-bold mb-6">
        Seleccionar nivel a certificar
      </h1>
      <div className="w-full flex flex-col items-center">
        {niveles.length > 0 ? (
          niveles.map((nivel) => (
            <button
            onClick={() => navigate(`/admin/certificado/${nivel.id}/selectedGrupo`)}
              key={nivel.id}
              className="w-full max-w-xs m-2 p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {nivel.name}
            </button>
          ))
        ) : (
          <p>No se encontraron niveles.</p>
        )}
      </div>
    </div>
  );
}