import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CertificarModulo() {
  const [niveles, setNiveles] = useState([]);
  const [selectedNivel, setSelectedNivel] = useState(null);
  const [grupos, setGrupos] = useState([]);
  const [selectedGrupo, setSelectedGrupo] = useState(null);
  const [modulos, setModulos] = useState([]);
  const [error, setError] = useState('');
  const [nivelesVisible, setNivelesVisible] = useState(true);
  const [gruposVisible, setGruposVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNiveles();
  }, []);

  const fetchNiveles = async () => {
    try {
      const response = await axios.get('/niveles');
      setNiveles(response.data);
    } catch (err) {
      setError('Error al cargar los niveles.');
    }
  };

  const fetchGrupos = async (nivelId) => {
    try {
      const response = await axios.get(`/niveles/${nivelId}/grupos`);
      setGrupos(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Error al cargar los grupos.');
    }
  };

  const fetchModulos = async (grupoId) => {
    try {
      const response = await axios.get(`/grupo/${grupoId}/modulos`);
      setModulos(Array.isArray(response.data.modulos) ? response.data.modulos : []);
    } catch (err) {
      setError('Error al cargar los módulos.');
    }
  };

  const handleNivelSelect = (nivel) => {
    setSelectedNivel(nivel);
    setSelectedGrupo(null);
    setModulos([]);
    fetchGrupos(nivel.id);
  };

  const handleGrupoSelect = (grupo) => {
    setSelectedGrupo(grupo);
    fetchModulos(grupo.id);
  };

  const handleModuloSelect = (modulo) => {
    navigate(`/admin/certificado/CertificarModulo/${modulo.id}/${selectedGrupo.id}/${selectedNivel.id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Certificar Módulo</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold mb-3 text-gray-700">Niveles</h2>
            <button onClick={() => setNivelesVisible(!nivelesVisible)} className="text-gray-500 hover:text-gray-700">
              {nivelesVisible ? 'Minimizar' : 'Maximizar'}
            </button>
          </div>
          {nivelesVisible && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre del Nivel
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {niveles.map((nivel) => (
                    <tr key={nivel.id} onClick={() => handleNivelSelect(nivel)} className="cursor-pointer hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                        {nivel.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedNivel && (
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold mb-3 text-gray-700">Grupos de {selectedNivel.name}</h2>
              <button onClick={() => setGruposVisible(!gruposVisible)} className="text-gray-500 hover:text-gray-700">
                {gruposVisible ? 'Minimizar' : 'Maximizar'}
              </button>
            </div>
            {gruposVisible && (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre del Grupo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {grupos.map((grupo) => (
                      <tr key={grupo.id} onClick={() => handleGrupoSelect(grupo)} className="cursor-pointer hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                          {grupo.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {selectedGrupo && (
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-3 text-gray-700">Módulos del Grupo {selectedGrupo.name}</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre del Módulo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {modulos.map((modulo) => (
                    <tr key={modulo.id} onClick={() => handleModuloSelect(modulo)} className="cursor-pointer hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b border-gray-200">
                        {modulo.titulo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}