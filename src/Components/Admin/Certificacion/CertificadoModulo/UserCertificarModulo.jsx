import { useState, useEffect, useCallback } from "react";
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

  const fetchModulo = useCallback(async (id) => {
    try {
      const response = await axios.get(`/modulo/${id}`);
      console.log('Modulo Data:', response.data);
      setModulo(response.data);
    } catch (err) {
      console.log('Modulo Error:', err);
      setError("Error al cargar la información del módulo.");
    }
  }, []);

  const fetchGrupo = useCallback(async (nivelId, grupoId) => {
    try {
      const response = await axios.get(`/niveles/${nivelId}/grupos/${grupoId}`);
      console.log('Grupo Data:', response.data);
      setGrupo(response.data);
    } catch (err) {
      console.log('Grupo Error:', err);
      setError("Error al cargar los detalles del grupo.");
    }
  }, []);

  const fetchUsuarios = useCallback(async (nivelId, grupoId) => {
    try {
      const response = await axios.get(`/nivel/${nivelId}/grupos/${grupoId}/usuarios`);
      console.log('Usuarios Data:', response.data);
      const usuariosConCertificado = await Promise.all(response.data.map(async (usuario) => {
        try {
          const certificadoResponse = await axios.get(`/certificadosModulo/usuario/${usuario.sub}/modulo/${moduloId}`);
          return { ...usuario, certificadoId: certificadoResponse.data.id };
        } catch (err) {
          if (err.response && err.response.status === 404) {
            return { ...usuario, certificadoId: null };
          }
          throw err;
        }
      }));
      setUsuarios(usuariosConCertificado);
    } catch (err) {
      console.log('Usuarios Error:', err);
      setError("Error al cargar los usuarios del grupo.");
    }
  }, [moduloId]);

  useEffect(() => {
    if (moduloId && GrupoId && nivelId) {
      fetchModulo(moduloId);
      fetchGrupo(nivelId, GrupoId);
      fetchUsuarios(nivelId, GrupoId);
    }
  }, [moduloId, GrupoId, nivelId, fetchModulo, fetchGrupo, fetchUsuarios]);

  const handleCertificar = async (usuario) => {
    if (usuario.certificadoId) {
      try {
        await axios.delete(`/certificadosModulo/${usuario.certificadoId}`);
        alert("Certificado eliminado con éxito.");
        fetchUsuarios(nivelId, GrupoId); // Recargar usuarios para actualizar estado
      } catch (err) {
        console.log('Error al eliminar el certificado:', err);
        alert("Error al eliminar el certificado.");
      }
    } else {
      const certificadoData = {
        userSub: usuario.sub,
        moduloId: modulo.id,
        numero_nivel: 1,
        nivelId: nivelId
      };

      try {
        const response = await axios.post("/certificadosModulo", certificadoData);
        console.log('Certificado creado:', response.data);
        alert("Certificado creado con éxito.");
        fetchUsuarios(nivelId, GrupoId); // Recargar usuarios para actualizar estado
      } catch (err) {
        console.log('Error al crear el certificado:', err);
        alert("Error al crear el certificado.");
      }
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
                  {usuario.certificadoId ? "Apto" : "No Apto"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-b border-gray-200">
                  <button
                    onClick={() => handleCertificar(usuario)}
                    className={`px-4 py-2 rounded focus:outline-none ${
                      usuario.certificadoId ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {usuario.certificadoId ? "Quitar" : "Certificar"}
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