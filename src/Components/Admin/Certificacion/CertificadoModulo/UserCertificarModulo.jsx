import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserCertificarModulo() {
  const { moduloId, GrupoId, nivelId } = useParams();
  const navigate = useNavigate();
  const [modulo, setModulo] = useState({});
  const [grupo, setGrupo] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (moduloId && GrupoId && nivelId) {
      fetchModulo(moduloId);
      fetchGrupo(nivelId, GrupoId);
      fetchUsuarios(nivelId, GrupoId);
    }
  }, [moduloId, GrupoId, nivelId]);

  const fetchModulo = async (id) => {
    try {
      const response = await axios.get(`/modulo/${id}`);
      setModulo(response.data);
    } catch (err) {
      setError("Error al cargar la información del módulo.");
    }
  };

  const fetchGrupo = async (nivelId, grupoId) => {
    try {
      const response = await axios.get(`/niveles/${nivelId}/grupos/${grupoId}`);
      setGrupo(response.data);
    } catch (err) {
      setError("Error al cargar los detalles del grupo.");
    }
  };

  const fetchUsuarios = async (nivelId, grupoId) => {
    try {
      const response = await axios.get(
        `/nivel/${nivelId}/grupos/${grupoId}/usuarios`
      );
      setUsuarios(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError("Error al cargar los usuarios del grupo.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Atrás
      </button>
      <div className="flex justify-between items-center mb-6 px-5 py-5">
        <h1 className="text-3xl font-bold text-gray-800">
          {grupo.name} - {modulo.titulo}
        </h1>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre del Usuario
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.sub} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                  {usuario.name} {usuario.last_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}