import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function UserCertificarModulo() {
  const { moduloId, GrupoId, nivelId } = useParams();
  const navigate = useNavigate();
  const [modulo, setModulo] = useState({});
  const [grupo, setGrupo] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

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

  const filteredUsuarios = usuarios.filter((usuario) =>
    `${usuario.name} ${usuario.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsuarios.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < Math.ceil(filteredUsuarios.length / usersPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mb-4"
      >
        Atrás
      </button>
      <div className="flex flex-col mb-6 px-5 py-5">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {grupo.name} - {modulo.titulo}
        </h1>
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded mb-4"
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre del Usuario
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((usuario) => (
              <tr key={usuario.sub} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                  {usuario.name} {usuario.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200">
                  No Apto
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-b border-gray-200">
                  <button
                    onClick={() => alert("Funcionalidad de certificar aún no implementada")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
                  >
                    Certificar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-3 py-2 rounded disabled:opacity-50"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <span className="text-gray-700">
          Página {currentPage} de {Math.ceil(filteredUsuarios.length / usersPerPage)}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === Math.ceil(filteredUsuarios.length / usersPerPage)}
          className="bg-gray-300 text-gray-700 px-3 py-2 rounded disabled:opacity-50"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}