import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

function UserNivelList({ nivelId }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(`/nivel/${nivelId}/usuarios`);
        setUsuarios(response.data || []); 
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener usuarios del nivel:", error.message);
      }
    };
    fetchUsuarios();
  }, [nivelId]);

  return (
    <div className="bg-gray-100 p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Usuarios Inscritos al Nivel</h2>
      {loading ? (
        <p className="text-gray-500">Cargando Usuarios...</p>
      ) : usuarios.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">Telefono</th>
              <th className="px-4 py-2">Correo Electrónico</th>
              <th className="px-4 py-2">Fecha de Inscripción</th>              
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.sub} className="bg-white shadow-md">
                <td className="px-4 py-2">{usuario.name}</td>
                <td className="px-4 py-2">{usuario.last_name}</td>
                <td className="px-4 py-2">{usuario.telefono}</td>
                <td className="px-4 py-2">{usuario.email}</td>
                <td className="px-4 py-2">{new Date(usuario.fecha_inscripcion).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No hay usuarios inscritos al nivel.</p>
      )}
    </div>
  );
}

UserNivelList.propTypes = {
  nivelId: PropTypes.string.isRequired, 
};

export default UserNivelList;