import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import CancelIcon from "@mui/icons-material/Cancel";

function UserActivity({ userSub, grupoId, closeModal }) {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(
          `/actividad/${grupoId}/usuario/${userSub}`
        );
        const sortedActivity = response.data.sort((a, b) => {
            // Cambiar 'fecha' por el campo correcto en tus datos de actividad
            return new Date(a.fecha) - new Date(b.fecha);
          });
        setActivity(sortedActivity);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error al traer los datos de actividad del usuario:",
          error
        );
        setLoading(false);
      }
    };

    fetchActivity();
  }, [userSub, grupoId]);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-700 text-lg font-semibold">Cargando actividad...</div>
        </div>
      );
  }

  const chunkedActivity = [];
  for (let i = 0; i < activity.length; i += 3) {
    chunkedActivity.push(activity.slice(i, i + 3));
  }

  return (
    <div className="relative bg-white rounded-lg shadow-md p-4">
      <button
        className="absolute top-2 right-2 text-gray-100 hover:text-gray-900 translate-x-8 -translate-y-8"
        onClick={closeModal}
      >
        <CancelIcon fontSize="large" />
      </button>
      {activity.length === 0 ? (
        <div className="text-center mt-4 text-gray-600">
          No hay actividad registrada para este usuario.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse rounded-lg shadow-lg">
            <thead className="bg-gray-200 text-gray-700 uppercase">
              <tr className="">
                <th className="py-3 px-6 text-left">Módulo</th>
                <th className="py-3 px-6 text-left">Nivel de Clase</th>
                <th className="py-3 px-6 text-center">Progreso</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {activity.map((registro, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-4 px-6">
                    {registro.modulo ? registro.modulo.titulo : "N/A"}
                  </td>
                  <td className="py-4 px-6">
                    {registro.nivelclase ? registro.nivelclase.name : "N/A"}
                  </td>
                  <td className={`py-4 px-6 text-center ${registro.progreso >= 80 ? 'text-green-600 font-semibold' : 'text-yellow-600'}`}>
                    {registro.progreso.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

UserActivity.propTypes = {
  userSub: PropTypes.string.isRequired,
  grupoId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default UserActivity;
