import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import AgregarDocumentoNivel from "./AgregarDocumentoNivel";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function CertificadoNivel({ nivelId, grupoId }) {
  const [usuarios, setUsuarios] = useState([]);
  const [numeroNivel, setNumeroNivel] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [certificando, setCertificando] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCertificadoId, setSelectedCertificadoId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(
          `/nivel/${nivelId}/grupos/${grupoId}/usuarios`
        );
        setUsuarios(response.data);
        setSearchResults(response.data);
        fetchCertificados(response.data);
        fetchModuloResults(response.data);
      } catch (error) {
        setError("Error al obtener los usuarios");
        setLoading(false);
      }
    };

    const fetchNivel = async () => {
      try {
        const response = await axios.get(`/nivel/${nivelId}`);
        setNumeroNivel(response.data.numero);
      } catch (error) {
        setError("Error al obtener el nivel");
        setLoading(false);
      }
    };

    const fetchCertificados = async (usuarios) => {
      try {
        const certificadosPromises = usuarios.map(async (user) => {
          try {
            const response = await axios.get(
              `/certificados/${user.sub}/${nivelId}`
            );
            return {
              userSub: user.sub,
              certificado: response.data.certificado,
              certificadoId: response.data.id || null,
            };
          } catch (error) {
            return {
              userSub: user.sub,
              certificado: null,
              certificadoId: null,
            };
          }
        });

        const certificados = await Promise.all(certificadosPromises);

        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) => {
            const certificadoInfo = certificados.find(
              (cert) => cert.userSub === usuario.sub
            );
            return certificadoInfo && certificadoInfo.certificado !== null
              ? {
                  ...usuario,
                  certificacion: "Certificado",
                  certificadoId: certificadoInfo.certificadoId,
                }
              : {
                  ...usuario,
                  certificacion: "No certificado",
                  certificadoId: null,
                };
          })
        );
      } catch (error) {
        setError("Error al obtener los certificados");
      } finally {
        setLoading(false);
      }
    };

    const fetchModuloResults = async (usuarios) => {
      try {
        const modulosResponse = await axios.get(
          `/nivel/${nivelId}/grupo/${grupoId}/detalles`
        );
        const modulos = modulosResponse.data.modulos;
        // console.log('Modulos: ', modulos);
    
        const resultadosPromises = usuarios.map(async (user) => {
          const resultados = await Promise.all(
            modulos.map(async (modulo) => {
              const resultadoResponse = await axios.get(
                `/resultados/${user.sub}/${modulo.id}`
              );
              // console.log('info respuestas: ', resultadoResponse.data);
              // Asumiendo que resultadoResponse.data es un array y queremos el primer elemento
              const aprobado = resultadoResponse.data.length > 0 ? resultadoResponse.data[0].aprobado : false;
              // console.log('Aprobo ? : ', aprobado);
              return aprobado;
            })
          );
          return {
            userSub: user.sub,
            resultados: resultados,
          };
        });
    
        const resultados = await Promise.all(resultadosPromises);
    
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) => {
            const resultadoInfo = resultados.find(
              (res) => res.userSub === usuario.sub
            );
            return {
              ...usuario,
              resultados: resultadoInfo ? resultadoInfo.resultados : [],
            };
          })
        );
      } catch (error) {
        setError("Error al obtener los resultados de los módulos");
      }
    };

    fetchUsuarios();
    fetchNivel();
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

  const handleCertificar = async (userId) => {
    setCertificando(true);
    try {
      const response = await axios.post("/certificado", {
        userSub: userId,
        nivelId: nivelId,
        numero_nivel: numeroNivel,
      });

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((user) =>
          user.sub === userId
            ? {
                ...user,
                certificacion: "Certificado",
                certificadoId: response.data.id,
              }
            : user
        )
      );
    } catch (error) {
      setError("Error al certificar el usuario");
    } finally {
      setCertificando(false);
    }
  };

  const handleQuitarCertificado = async (certificadoId) => {
    if (!certificadoId) {
      setError("Certificado ID is null or undefined.");
      return;
    }

    try {
      await axios.delete(`/certificado/${certificadoId}`);
      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((user) =>
          user.certificadoId === certificadoId
            ? {
                ...user,
                certificacion: "No certificado",
                certificadoId: null,
              }
            : user
        )
      );
    } catch (error) {
      setError("Error al quitar el certificado");
    }
  };

  const handleOpenModal = (certificadoId, userId) => {
    setSelectedCertificadoId(certificadoId);
    setSelectedUserId(userId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCertificadoId(null);
    setSelectedUserId(null);
  };

  const isApto = (user) => {
    const hasPaid = user.grupos && user.grupos.length > 0 && user.grupos[0].usergrupo && user.grupos[0].usergrupo.hasPaid;
    const allModulesApproved = user.resultados && user.resultados.every((aprobado) => aprobado === true);
    return hasPaid && allModulesApproved;
  };

  const filteredUsers = searchResults.filter((usuario) => {
    if (filter === "Todos") return true;
    return usuario.certificacion === filter;
  });

  const getUserState = (user) => {
    const hasPaid = user.grupos && user.grupos.length > 0 && user.grupos[0].usergrupo && user.grupos[0].usergrupo.hasPaid;
    const allModulesApproved = user.resultados && user.resultados.every((aprobado) => aprobado === true);
  
    if (hasPaid && allModulesApproved) {
      return 'completo';
    } else if (!hasPaid && allModulesApproved) {
      console.log('pago: ', hasPaid);
      return 'faltaPago';
    } else if (hasPaid && !allModulesApproved) {
      return 'modulosNoCompletados';
    } else if (!hasPaid && !allModulesApproved) {
      return 'noCompletado';
    }
  };
  
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
      <h1 className="text-2xl font-bold mb-4 text-center">
        Usuarios del grupo
      </h1>
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
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider text-center">
                Estado
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
            {filteredUsers.map((user) => (
              <tr key={user.sub}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div>
                    <div className="text-sm leading-5 font-medium text-gray-900">
                      {user.name} {user.last_name}
                    </div>
                    <div className="text-sm leading-5 text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                {getUserState(user) === 'completo' ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completo
                  </span>
                ) : getUserState(user) === 'noCompletado' ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    No completado
                  </span>
                ) : getUserState(user) === 'faltaPago' ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                    Falta pago
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Módulos no completados
                  </span>
                )}
              </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                  <div className="text-sm leading-5 text-gray-900">
                    {user.certificacion === "Certificado" ? (
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
                  {user.certificacion === "No certificado" ? (
                    <button
                      onClick={() => handleCertificar(user.sub)}
                      className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none"
                      disabled={certificando}
                    >
                      {certificando ? "Certificando..." : "Certificar"}
                    </button>
                  ) : (
                    <div className="space-x-2">
                      <button className="relative group bg-transparent hover:bg-green-100 text-green-500 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500">
                        <CardMembershipIcon className="text-green-500" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-80 shadow-lg">
                          Ver certificado
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          handleQuitarCertificado(user.certificadoId)
                        }
                        className="relative group bg-transparent hover:bg-red-100 text-red-500 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <DoDisturbOnIcon className="text-red-500" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-80 shadow-lg">
                          Quitar certificado
                        </span>
                      </button>

                      <button
                        onClick={() =>
                          handleOpenModal(user.certificadoId, user.sub)
                        }
                        className="relative group bg-transparent hover:bg-blue-100 text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <EditNoteIcon className="text-blue-500" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-80 shadow-lg">
                          Editar Documentos
                        </span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Agregar Documento"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <AgregarDocumentoNivel
          certificadoId={selectedCertificadoId}
          userId={selectedUserId}
          onCloseModal={closeModal}
        />
      </ReactModal>
    </div>
  );
}

CertificadoNivel.propTypes = {
  nivelId: PropTypes.string.isRequired,
  grupoId: PropTypes.string.isRequired,
};