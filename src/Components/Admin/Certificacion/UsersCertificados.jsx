import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import PropTypes from "prop-types";
import html2pdf from "html2pdf.js";
import { Preview, /*print*/ } from 'react-html2pdf';
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AgregarDocumentos from "./AgregarDocumento";
import Certificado from "../../Estudiante/Certificado/Certificado";

const convertirNumeroRomano = (romano) => {
  switch (romano.toUpperCase()) {
    case "I":
      return 1;
    case "II":
      return 2;
    case "LL":
      return 2;
    case "III":
      return 3;
    case "LLL":
      return 3;
    case "IV":
      return 4;
    case "LV":
      return 4;
    case "V":
      return 5;
    default:
      return romano;
  }
};

export default function UserCertificados({ cursoId }) {
  const [usuarios, setUsuarios] = useState([]);
  const [cursoNombre, setCursoNombre] = useState("");
  const [cursoNivel, setCursoNivel] = useState("");
  const [cursoHora, setCursoHora] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCertificadoId, setSelectedCertificadoId] = useState(null);
  const [selectedUserSub, setSelectedUserSub] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(`/usuariosPorCurso/${cursoId}`);
        const userIds = response.data.usuariosEnCurso;

        const cursoResponse = await axios.get(`/cursos/${cursoId}`);
        setCursoNombre(cursoResponse.data.name);
        setCursoHora(cursoResponse.data.horas_catedra)
        console.log('Horas catedra: ', cursoResponse.data.horas_catedra )

        const nivel = cursoResponse.data.nivel.toLowerCase();
        console.log("Valor de nivel:", nivel);
        const cursoNivelValue =
          nivel === "especialización" || nivel === "especializacion"
            ? "5"
            : convertirNumeroRomano(nivel);
        setCursoNivel(cursoNivelValue);

        const usuariosData = await Promise.all(
          userIds.map(async (userId) => {
            const userResponse = await axios.get(`/user/${userId}`);
            const user = userResponse.data;

            try {
              const certificadoResponse = await axios.get(
                `/certificadosCurso/usuario/${user.sub}/curso/${cursoId}`
              );
              if (certificadoResponse.data) {
                user.certificacion = "Certificado";
                user.certificadoId = certificadoResponse.data.id;
                user.numero_certificado =
                  certificadoResponse.data.numero_certificado;
                user.tipoDocumento = certificadoResponse.data.tipoDocumento;
                user.documento = certificadoResponse.data.documento;
                user.createdAt = certificadoResponse.data.createdAt;
              } else {
                user.certificacion = "No certificado";
              }
            } catch (certError) {
              user.certificacion = "No certificado";
            }

            return user;
          })
        );

        setUsuarios(usuariosData);
      } catch (error) {
        setError(error.response?.data?.error || "Error al cargar los usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [cursoId]);

  useEffect(() => {
    const handleSearch = () => {
      const filteredUsers = usuarios.filter((user) => {
        const { name, last_name, email } = user;
        const fullName = `${name} ${last_name}`.toLowerCase();
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

  const filteredUsers = searchResults.filter((usuario) => {
    if (filter === "Todos") return true;
    return usuario.certificacion === filter;
  });

  const certificarUsuario = async (userSub) => {
    try {
      if (!userSub || !cursoNivel) {
        console.error("Datos del certificado faltantes:", {
          userSub,
          cursoNivel,
        });
        return;
      }

      const certificadoData = {
        userSub: userSub,
        tipoDocumento: "",
        documento: "",
        cursoId: cursoId,
        numero_nivel: cursoNivel,
      };

      console.log("Datos del certificado que se envían:", certificadoData);

      const response = await axios.post("/certificadosCurso", certificadoData);

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.sub === userSub
            ? {
                ...usuario,
                certificacion: "Certificado",
                certificadoId: response.data.id,
                numero_certificado: response.data.numero_certificado,
                tipoDocumento: response.data.tipoDocumento,
                documento: response.data.documento,
              }
            : usuario
        )
      );
    } catch (error) {
      console.error("Error al certificar el usuario:", error);
    }
  };

  const eliminarCertificado = async (certificadoId, userSub) => {
    try {
      await axios.delete(`/certificadosCurso/${certificadoId}`);

      setUsuarios((prevUsuarios) =>
        prevUsuarios.map((usuario) =>
          usuario.sub === userSub
            ? {
                ...usuario,
                certificacion: "No certificado",
                certificadoId: null,
                numero_certificado: null,
                tipoDocumento: null,
                documento: null,
              }
            : usuario
        )
      );
    } catch (error) {
      console.error("Error al eliminar el certificado:", error);
    }
  };

  const certificarTodos = async () => {
    try {
      for (const usuario of usuarios) {
        await certificarUsuario(usuario.sub);
      }
    } catch (error) {
      console.error("Error al certificar todos los usuarios:", error);
    }
  };

  const visto = (documento) => {
    if (documento) {
      return (
        <div className="relative group">
          <CheckCircleIcon className="text-green-600" />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-80 shadow-lg">
            Descargado o visto
          </span>
        </div>
      );
    } else {
      return (
        <div className="relative group">
          <VisibilityOffIcon className="text-red-600" />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-80 shadow-lg">
            No_visto
          </span>
        </div>
      );
    }
  };

  const openModal = (certificadoId, userSub) => {
    setSelectedCertificadoId(certificadoId);
    setSelectedUserSub(userSub);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCertificadoId(null);
    setSelectedUserSub(null);
  };

  const handleGenerateCertificate = (usuario) => {
    setSelectedUser(usuario);
    setShowModal(true);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("certificado");
    
    // Obtener el ancho y alto del contenido del certificado
    const contentWidth = 1300; // Ancho deseado
    const contentHeight = 914; // Alto deseado
  
    // Configurar el formato del PDF como horizontal y ajustar el tamaño del contenido
    html2pdf()
      .from(element)
      .set({
        filename: `Certificado_${selectedUser.name}_${selectedUser.last_name}_${cursoNombre}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: {
          orientation: "landscape", // Formato horizontal
          unit: "px", // Unidad en píxeles
          format: [contentWidth, contentHeight], // Tamaño del contenido
        },
      })
      .save();
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
        Usuarios inscritos en el curso {cursoNombre}
      </h1>
      <div className="flex items-center mb-4 space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform hover:scale-105"
          onClick={certificarTodos}
        >
          Certificar Todos
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar por nombre, apellido o correo electrónico"
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
                Apellido
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Certificación
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Seleccionar
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Visto
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((usuario) => (
              <tr key={usuario.sub}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 font-medium text-gray-900">
                    {usuario.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div className="text-sm leading-5 text-gray-900">
                    {usuario.last_name}
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
                  {usuario.certificacion === "Certificado" ? (
                    <div className="flex justify-center space-x-4">
                      <button
                        className="relative group bg-transparent hover:bg-green-100 text-green-500 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onClick={() => handleGenerateCertificate(usuario)}
                      >
                        <CardMembershipIcon className="text-green-500" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-80 shadow-lg">
                          Ver certificado
                        </span>
                      </button>
                      <button
                        className="relative group bg-transparent hover:bg-red-100 text-red-500 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={() =>
                          eliminarCertificado(
                            usuario.certificadoId,
                            usuario.sub
                          )
                        }
                      >
                        <RemoveCircleIcon className="text-red-500" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-80 shadow-lg">
                          Quitar certificado
                        </span>
                      </button>
                      <button
                        className="relative group bg-transparent hover:bg-blue-100 text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() =>
                          openModal(usuario.certificadoId, usuario.sub)
                        }
                      >
                        <EditNoteIcon className="text-blue-500" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-80 shadow-lg">
                          Editar Documentos
                        </span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => certificarUsuario(usuario.sub)}
                      className="relative group bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Certificar
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-80 shadow-lg">
                        Certificar usuario
                      </span>
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-center">
                {visto(usuario.documento)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90vw",
            width: "400px",
            height: "auto",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            backgroundColor: "white",
            overflow: "hidden",
          },
        }}
      >
        <div>
          <AgregarDocumentos
            idCertificado={selectedCertificadoId}
            idUser={selectedUserSub}
          />
        </div>
      </ReactModal>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full px-2 py-2">
              <div className="bg-white">
                <div id="certificado">
                  <Preview id="certificado">
                    <Certificado
                      userData={selectedUser}
                      cursoNombre={cursoNombre}
                      cursoNivel={cursoNivel}
                      numeroCertificado={selectedUser.numero_certificado}
                      tipoDocumento={selectedUser.tipoDocumento}
                      documento={selectedUser.documento}
                      fechaCreacion={selectedUser.createdAt}
                      horas={cursoHora}
                    />
                  </Preview>
                </div>
              </div>
              <div className="flex bg-gray-50 px-4 py-3 ">
                {/* Botón para descargar el certificado en PDF */}
                <button
                  onClick={handleDownloadPDF}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                >
                  Descargar
                </button>

                {/* Botón para cerrar el modal */}
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

UserCertificados.propTypes = {
  cursoId: PropTypes.string.isRequired,
};