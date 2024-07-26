import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CertificarModulo() {
  const [niveles, setNiveles] = useState([]);
  const [selectedNivel, setSelectedNivel] = useState(null);
  const [grupos, setGrupos] = useState([]);
  const [selectedGrupo, setSelectedGrupo] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [error, setError] = useState('');

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

  const fetchUsuarios = async (nivelId, grupoId) => {
    try {
      const response = await axios.get(`/nivel/${nivelId}/grupos/${grupoId}/usuarios`);
      setUsuarios(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Error al cargar los usuarios.');
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
    setUsuarios([]);
    setModulos([]);
    fetchGrupos(nivel.id);
  };

  const handleGrupoSelect = (grupo) => {
    setSelectedGrupo(grupo);
    fetchUsuarios(selectedNivel.id, grupo.id);
    fetchModulos(grupo.id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Certificar Módulo</h1>
      {error && <div className="text-red-500">{error}</div>}

      <div className="flex">
        <div className="w-1/3">
          <h2 className="text-xl font-semibold mb-2">Niveles</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2">Nombre del Nivel</th>
              </tr>
            </thead>
            <tbody>
              {niveles.map((nivel) => (
                <tr key={nivel.id} onClick={() => handleNivelSelect(nivel)} className="cursor-pointer hover:bg-gray-100">
                  <td className="border px-4 py-2">{nivel.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedNivel && (
          <div className="w-1/3 ml-4">
            <h2 className="text-xl font-semibold mb-2">Grupos de {selectedNivel.name}</h2>
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="px-4 py-2">Nombre del Grupo</th>
                </tr>
              </thead>
              <tbody>
                {grupos.map((grupo) => (
                  <tr key={grupo.id} onClick={() => handleGrupoSelect(grupo)} className="cursor-pointer hover:bg-gray-100">
                    <td className="border px-4 py-2">{grupo.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedGrupo && (
        <div className="mt-4">
          <div className="flex">
            <div className="w-1/2">
              <h2 className="text-xl font-semibold mb-2">Usuarios del Grupo {selectedGrupo.name}</h2>
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Nombre del Usuario</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.sub} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{usuario.name} {usuario.last_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-1/2 ml-4">
              <h2 className="text-xl font-semibold mb-2">Módulos del Grupo {selectedGrupo.name}</h2>
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Nombre del Módulo</th>
                  </tr>
                </thead>
                <tbody>
                  {modulos.map((modulo) => (
                    <tr key={modulo.id} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{modulo.titulo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}