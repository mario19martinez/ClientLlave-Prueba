// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function ModulosNivelStudent({ userSub }) {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const response = await axios.get(`/usuario/${userSub}/grupost-nivel`);
        setGrupos(response.data.grupo);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserGroups();
  }, [userSub]);

  if (loading) {
    return <div className="p-4 bg-white rounded shadow">Cargando...</div>;
  }

  if (error) {
    return <div className="p-4 bg-white rounded shadow">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Mis Niveles</h2>
      <ul>
        {grupos.map((grupo) => (
          <li key={grupo.id} className="mb-2">
            <div className="bg-gray-100 rounded p-4">
              <h3 className="text-lg font-semibold mb-2">{grupo.name}</h3>
              <h3 className="text-lg font-semibold mb-2">{grupo.descripcion}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

ModulosNivelStudent.propTypes = {
  userSub: PropTypes.string.isRequired,
};

export default ModulosNivelStudent;
