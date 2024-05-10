// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CampaignIcon from "@mui/icons-material/Campaign";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function AdminLanding({ campeinId }) {
  const [landings, setLandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLandings = async () => {
      try {
        const response = await axios.get(
          `/campein/${campeinId}/landingcampein`
        );
        setLandings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching landings:", error);
        setLoading(false);
      }
    };

    fetchLandings();
  }, [campeinId]);

  const handleDelete = async (landingId) => {
    try {
      await axios.delete(`/campein/${campeinId}/landingcampein/${landingId}`);
      setLandings(landings.filter((landing) => landing.id !== landingId));
      console.log("Landing eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la landing:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Landings campaña</h1>
      <div className="flex mb-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4 flex items-center"
          onClick={() =>
            navigate(`/Admin/campain/landing/SelecForm/${campeinId}`)
          }
        >
          Crear LandigPage <CampaignIcon />
        </button>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : landings.length === 0 ? (
        <p>Por el momento esta campaña no tiene ninguna landingPage.</p>
      ) : (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Contenido</th>
              <th className="px-4 py-2">Template</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {landings.map((landing) => ( 
              <tr key={landing.id}>
                <td className="border px-4 py-2">{landing.titulo}</td>
                <td className="border px-4 py-2">{landing.contenido}</td>
                <td className="border px-4 py-2">{landing.template}</td>
                <td className="border px-4 py-2">
                  <button
                    className="mr-2 text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(landing.id)}
                  >
                    <DeleteIcon />
                  </button>
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() =>
                      navigate(`/campain/${landing.id}/Landing/${campeinId}`)
                    }
                  >
                    <VisibilityIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

AdminLanding.propTypes = {
  campeinId: PropTypes.string.isRequired,
};