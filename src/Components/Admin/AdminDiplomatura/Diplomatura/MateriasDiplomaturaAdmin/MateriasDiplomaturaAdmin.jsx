import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function MateriasDiplomaturaAdmin() {
  const { diplomaturaId } = useParams();
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const res = await axios.get(`/diplomatura/${diplomaturaId}/materias`);
        setMaterias(res.data);
      } catch (err) {
        console.error("Error al obtener materias:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterias();
  }, [diplomaturaId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (materias.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
        <InfoOutlinedIcon sx={{ fontSize: 60 }} className="text-blue-500 mb-4" />
        <p className="text-xl font-semibold">No hay materias registradas en esta diplomatura.</p>
        <p className="text-sm mt-1">Puedes agregarlas desde el panel correspondiente.</p>
      </div>
    );
  }

  return (
    <div className="bg-white px-6 py-6 w-full shadow-md rounded-lg mt-4">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Materias de la Diplomatura</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {materias.map((materia) => (
          <div
            key={materia.id}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow transition duration-200 bg-gray-50"
          >
            <img
              src={materia.image || "https://via.placeholder.com/100x100?text=Sin+imagen"}
              alt={materia.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800">{materia.name}</h4>
              <p className="text-blue-600 font-medium mt-1">
                ${Number(materia.precio).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
