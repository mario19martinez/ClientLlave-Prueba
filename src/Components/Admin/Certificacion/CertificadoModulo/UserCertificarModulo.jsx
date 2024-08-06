import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  DocumentIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import ReactModal from "react-modal";
import DocumentoModulo from "./DocumentoModulo";
import CertificadoModulo from "../../../Estudiante/Certificado/CertificadoModulo";

export default function UserCertificarModulo() {
  const { moduloId, GrupoId, nivelId } = useParams();
  const navigate = useNavigate();
  const [modulo, setModulo] = useState({});
  const [grupo, setGrupo] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpenDocument, setModalIsOpenDocument] = useState(false);
  const [modalIsOpenCertificado, setModalIsOpenCertificado] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCertificadoId, setSelectedCertificadoId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const usersPerPage = 10;

  const fetchModulo = useCallback(async (id) => {
    try {
      const response = await axios.get(`/modulo/${id}`);
      setModulo(response.data);
      console.log("Modulo response:", response.data);
    } catch (err) {
      setError("Error al cargar la información del módulo.");
      console.log("Modulo error:", err);
    }
  }, []);

  const fetchGrupo = useCallback(async (nivelId, grupoId) => {
    try {
      const response = await axios.get(`/niveles/${nivelId}/grupos/${grupoId}`);
      setGrupo(response.data);
      console.log("Grupo response:", response.data);
    } catch (err) {
      setError("Error al cargar los detalles del grupo.");
      console.log("Grupo error:", err);
    }
  }, []);

  const fetchUsuarios = useCallback(
    async (nivelId, grupoId) => {
      try {
        const response = await axios.get(
          `/nivel/${nivelId}/grupos/${grupoId}/usuarios`
        );
        const usuariosConDetalles = await Promise.all(
          response.data.map(async (usuario) => {
            try {
              const certificadoResponse = await axios.get(
                `/certificadosModulo/usuario/${usuario.sub}/modulo/${moduloId}`
              );
              const resultadoResponse = await axios.get(
                `/resultados/${usuario.sub}/${moduloId}`
              );
              console.log(
                `Certificado para usuario ${usuario.sub}:`,
                certificadoResponse.data
              );
              console.log(
                `Resultados para usuario ${usuario.sub}:`,
                resultadoResponse.data
              );

              // Aquí asumimos que el resultadoResponse.data es un array
              const aprobado =
                resultadoResponse.data.length > 0
                  ? resultadoResponse.data[0].aprobado
                  : false;

              return {
                ...usuario,
                certificadoId: certificadoResponse.data.id,
                aprobado,
                resultados: resultadoResponse.data,
              };
            } catch (err) {
              if (err.response && err.response.status === 404) {
                console.log(
                  `Certificado o resultados no encontrados para usuario ${usuario.sub}`
                );
                return { ...usuario, certificadoId: null, aprobado: false };
              }
              console.log(`Error para usuario ${usuario.sub}:`, err);
              throw err;
            }
          })
        );
        setUsuarios(usuariosConDetalles);
        console.log("Usuarios response:", usuariosConDetalles);
      } catch (err) {
        setError("Error al cargar los usuarios del grupo.");
        console.log("Usuarios error:", err);
      }
    },
    [moduloId]
  );

  useEffect(() => {
    if (moduloId) {
      fetchModulo(moduloId);
    }
  }, [moduloId, fetchModulo]);

  useEffect(() => {
    if (nivelId && GrupoId) {
      fetchGrupo(nivelId, GrupoId);
    }
  }, [nivelId, GrupoId, fetchGrupo]);

  useEffect(() => {
    if (nivelId && GrupoId) {
      fetchUsuarios(nivelId, GrupoId);
    }
  }, [nivelId, GrupoId, fetchUsuarios]);

  const handleCertificar = async (usuario) => {
    if (usuario.certificadoId) {
      try {
        await axios.delete(`/certificadosModulo/${usuario.certificadoId}`);
        alert("Certificado eliminado con éxito.");
        console.log(
          `Certificado eliminado para usuario ${usuario.sub} con certificadoId ${usuario.certificadoId}`
        );
        fetchUsuarios(nivelId, GrupoId);
      } catch (err) {
        alert("Error al eliminar el certificado.");
        console.log(
          `Error al eliminar certificado para usuario ${usuario.sub}:`,
          err
        );
      }
    } else {
      const certificadoData = {
        userSub: usuario.sub,
        moduloId: modulo.id,
        numero_nivel: 1,
        nivelId: nivelId,
      };

      try {
        await axios.post("/certificadosModulo", certificadoData);
        alert("Certificado creado con éxito.");
        console.log(
          `Certificado creado para usuario ${usuario.sub}:`,
          certificadoData
        );
        fetchUsuarios(nivelId, GrupoId);
      } catch (err) {
        alert("Error al crear el certificado.");
        console.log(
          `Error al crear certificado para usuario ${usuario.sub}:`,
          err
        );
      }
    }
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    `${usuario.name} ${usuario.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsuarios.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const handlePageChange = (direction) => {
    if (
      direction === "next" &&
      currentPage < Math.ceil(filteredUsuarios.length / usersPerPage)
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const getEstado = (usuario) => {
    if (usuario.aprobado && usuario.grupos[0]?.usergrupo?.hasPaid) {
      return "Apto";
    } else if (!usuario.aprobado && usuario.grupos[0]?.usergrupo?.hasPaid) {
      return "Módulo no completado";
    } else if (usuario.aprobado && !usuario.grupos[0]?.usergrupo?.hasPaid) {
      return "Falta Pago";
    } else {
      return "No Apto";
    }
  };

  const handleOpenModalDocument = (certificadoId, userId) => {
    setSelectedCertificadoId(certificadoId || "");
    setSelectedUserId(userId || "");
    setModalIsOpenDocument(true);
  };

  const handleOpenModalCertificado = (certificadoId) => {
    setSelectedCertificadoId(certificadoId);
    setModalIsOpenCertificado(true);
  };

  const closeModal = () => {
    setModalIsOpenDocument(false);
    setModalIsOpenCertificado(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none mb-4"
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
          className="border border-gray-300 px-4 py-2 rounded-lg mb-4 focus:border-blue-500 focus:ring-blue-500"
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
                Certificación
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
                <td className="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-200">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      getEstado(usuario) === "Apto"
                        ? "bg-green-100 text-green-800"
                        : getEstado(usuario) === "Falta Pago"
                        ? "bg-yellow-100 text-yellow-800"
                        : getEstado(usuario) === "Módulo no completado"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {getEstado(usuario)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm border-b border-gray-200">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      usuario.certificadoId
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {usuario.certificadoId ? "Certificado" : "No Certificado"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-b border-gray-200 flex space-x-2">
                  <button
                    onClick={() => handleCertificar(usuario)}
                    className={`px-4 py-2 rounded-full focus:outline-none ${
                      usuario.certificadoId
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {usuario.certificadoId ? (
                      <XCircleIcon className="h-5 w-5" />
                    ) : (
                      "Certificar"
                    )}
                  </button>
                  {usuario.certificadoId && (
                    <>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none"
                        onClick={() =>
                          handleOpenModalCertificado(usuario.certificadoId)
                        }
                        title="Ver Certificado"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 focus:outline-none"
                        onClick={() =>
                          handleOpenModalDocument(usuario.certificadoId, usuario.sub)
                        }
                        title="Añadir Documentos"
                      >
                        <DocumentIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
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
          className="bg-gray-300 text-gray-700 px-3 py-2 rounded-full disabled:opacity-50"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <span className="text-gray-700">
          Página {currentPage} de{" "}
          {Math.ceil(filteredUsuarios.length / usersPerPage)}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={
            currentPage === Math.ceil(filteredUsuarios.length / usersPerPage)
          }
          className="bg-gray-300 text-gray-700 px-3 py-2 rounded-full disabled:opacity-50"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Modal para ver el certificado */}
      <ReactModal
        isOpen={modalIsOpenCertificado}
        onRequestClose={closeModal}
        contentLabel="Ver Certificado"
        overlayClassName="modal-overlay"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
          content: {
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90vw",
            width: "600px",
            height: "auto",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            backgroundColor: "white",
            overflow: "hidden",
          },
        }}
      >
        <CertificadoModulo certificadoId={selectedCertificadoId} />
        <button onClick={closeModal} className="absolute top-2 right-2">
          <XCircleIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
        </button>
      </ReactModal>

      {/* Modal para añadir documentos */}
      <ReactModal
        isOpen={modalIsOpenDocument}
        onRequestClose={closeModal}
        contentLabel="Agregar Documento"
        overlayClassName="modal-overlay"
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
        <DocumentoModulo
          certificadoId={selectedCertificadoId}
          sub={selectedUserId}
          onCloseModal={closeModal}
        />
        <button onClick={closeModal} className="absolute top-2 right-2">
          <XCircleIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
        </button>
      </ReactModal>
    </div>
  );
}