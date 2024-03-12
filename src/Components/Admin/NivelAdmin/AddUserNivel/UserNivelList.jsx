import { useState, useEffect } from "react";
import axios from "axios";

function UserNivelList({ nivelId }) {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(`/nivel/${nivelId}/usuarios`);
        setUsuarios(response.data || []); // Actualizado para manejar directamente el array de usuarios
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
        <ul>
          {usuarios.map((usuario) => (
            <li
              key={usuario.sub}
              className="mb-2 p-4 bg-white rounded-md shadow-md"
            >
              <strong className="text-blue-500">
                {usuario.name} {usuario.last_name}
              </strong>{" "}
              - {usuario.email} - Fecha de inscripción: {usuario.fecha_inscripcion}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay usuarios inscritos al nivel.</p>
      )}
    </div>
  );
}

export default UserNivelList;
