import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function CertificadoNivel({ nivelId, grupoId }) {
    const [usuarios, setUsuarios] = useState([]);
    const [numeroNivel, setNumeroNivel] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [filter, setFilter] = useState("Todos");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [certificando, setCertificando] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get(`/nivel/${nivelId}/grupos/${grupoId}/usuarios`);
                setUsuarios(response.data);
                setSearchResults(response.data);
            } catch (error) {
                setError('Error al obtener los usuarios');
            } finally {
                setLoading(false);
            }
        };

        const fetchNivel = async () => {
            try {
                const response = await axios.get(`/nivel/${nivelId}`);
                setNumeroNivel(response.data.numero);
            } catch (error) {
                console.error('Error al obtener el nivel:', error);
            }
        };

        const fetchCertificados = async () => {
            try {
                const response = await axios.get(`/certificados/${userId}/${nivelId}`);
                const certificados = response.data;
                setUsuarios((prevUsuarios) =>
                    prevUsuarios.map((usuario) =>
                        certificados.includes(usuario.sub)
                            ? { ...usuario, certificacion: 'Certificado' }
                            : usuario
                    )
                );
            } catch (error) {
                console.error('Error al obtener los certificados:', error);
            }
        };

        fetchUsuarios();
        fetchNivel();
        fetchCertificados();
    }, [nivelId, grupoId]);

    useEffect(() => {
        const handleSearch = () => {
            const filteredUsers = usuarios.filter((user) => {
                const { name, email } = user;
                const fullName = name.toLowerCase();
                const searchValue = searchTerm.toLowerCase();
                return (
                    fullName.includes(searchValue) ||
                    email.toLowerCase().includes(searchValue)
                );
            });
            setSearchResults(filteredUsers);
        };

        handleSearch();
    }, [searchTerm, usuarios]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleCertificar = async (userId, documento) => {
        setCertificando(true);
        try {
            const response = await axios.post('/certificado', {
                userSub: userId,
                documento: documento,
                nivelId: nivelId,
                numero_nivel: numeroNivel // pasar el número de nivel aquí
            });

            setUsuarios(prevUsuarios =>
                prevUsuarios.map(user =>
                    user.sub === userId ? { ...user, certificacion: 'Certificado' } : user
                )
            );
        } catch (error) {
            console.error('Error al certificar el usuario:', error);
            setError('Error al certificar el usuario');
        } finally {
            setCertificando(false);
        }
    };

    const handleQuitarCertificado = async (userId) => {
        try {
            // await axios.delete(`/certificado/${userId}/${nivelId}`);
            // setUsuarios(prevUsuarios =>
            //     prevUsuarios.map(user =>
            //         user.sub === userId ? { ...user, certificacion: 'No certificado' } : user
            //     )
            // );
            console.log('Funcion de eliminar no tiene ruta');
        } catch (error) {
            console.error('Error al quitar el certificado:', error);
            setError('Error al quitar el certificado');
        }
    };

    const filteredUsers = searchResults.filter((usuario) => {
        if (filter === "Todos") return true;
        return usuario.certificacion === filter;
    });

    if (loading)
        return (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <p className="text-center text-lg font-semibold mb-4">Cargando ...</p>
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
            </div>
        );
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Usuarios del grupo</h1>
            <div className="flex items-center mb-4 space-x-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Buscar por nombre o correo electrónico"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="Todos">Todos</option>
                    <option value="Certificado">Certificado</option>
                    <option value="No certificado">No certificado</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Certificación
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((usuario) => (
                            <tr key={usuario.sub}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm leading-5 font-medium text-gray-900">
                                        {usuario.name} {usuario.last_name}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm leading-5 text-gray-900">
                                        {usuario.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                    <div className="text-sm leading-5 text-gray-900">
                                        {usuario.certificacion === "Certificado" ? (
                                            <span className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-xs">
                                                Certificado
                                            </span>
                                        ) : (
                                            <span className="bg-red-200 text-red-800 py-1 px-3 rounded-full text-xs">
                                                No certificado
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                                    {usuario.certificacion !== "Certificado" ? (
                                        <button
                                            onClick={() => handleCertificar(usuario.sub, usuario.identificacion)}
                                            className={`px-4 py-2 text-white ${certificando ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} rounded-md focus:outline-none`}
                                            disabled={certificando}
                                        >
                                            {certificando ? 'Certificando...' : 'Certificar'}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleQuitarCertificado(usuario.sub)}
                                            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none"
                                        >
                                            Quitar Certificado
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

CertificadoNivel.propTypes = {
    nivelId: PropTypes.string.isRequired,
    grupoId: PropTypes.string.isRequired,
};