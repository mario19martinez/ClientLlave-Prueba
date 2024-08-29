import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactModal from "react-modal";
import { Tooltip, CircularProgress } from "@mui/material";

ReactModal.setAppElement("#root");

export default function SeguimientoGeneralGrupo() {
  const { nivelId, grupoId } = useParams();
  const [usuarios, setUsuarios] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [progresos, setProgresos] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(`/nivel/${nivelId}/grupos/${grupoId}/usuarios`);
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchModulos = async () => {
      try {
        const response = await axios.get(`/grupo/${grupoId}/modulos`);
        let modulosArray = response.data.modulos;

        // Ordena los módulos según el número en su título
        modulosArray.sort((a, b) => {
          const numA = parseInt(a.titulo.split(" ")[0]);
          const numB = parseInt(b.titulo.split(" ")[0]);
          return numA - numB;
        });

        const modulosWithClases = await Promise.all(
          modulosArray.map(async (modulo) => {
            const clasesResponse = await axios.get(`/modulo/${modulo.id}/clases`);

            // Ordena las clases por la fecha de creación
            const clasesOrdenadas = clasesResponse.data.sort((a, b) => {
              return new Date(a.createdAt) - new Date(b.createdAt);
            });

            return {
              ...modulo,
              clases: clasesOrdenadas,
            };
          })
        );

        setModulos(modulosWithClases);
      } catch (error) {
        console.error("Error fetching modules and classes:", error);
      }
    };

    fetchUsuarios();
    fetchModulos();
  }, [nivelId, grupoId]);

  useEffect(() => {
    const fetchProgresos = async () => {
      try {
        const progresosPorUsuario = {};
        for (const usuario of usuarios) {
          progresosPorUsuario[usuario.sub] = {};
          for (const modulo of modulos) {
            for (const clase of modulo.clases) {
              try {
                const progresoResponse = await axios.get(`/actividad/${grupoId}/usuario/${usuario.sub}`);
                const progreso = progresoResponse.data.find(
                  (p) => p.modulo.id === modulo.id && p.nivelclase.id === clase.id
                );
                progresosPorUsuario[usuario.sub][clase.id] = progreso ? progreso.progreso : 0;
              } catch (error) {
                if (error.response && error.response.status === 404) {
                  progresosPorUsuario[usuario.sub][clase.id] = 0;
                } else {
                  // Silencia otros errores para no mostrarlos en consola.
                }
              }
            }
          }
        }
        setProgresos(progresosPorUsuario);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching progress:", error);
        setLoading(false);
      }
    };

    if (usuarios.length && modulos.length) {
      fetchProgresos();
    }
  }, [usuarios, modulos, grupoId]);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalIsOpen(false);
  };

  const getProgressClass = (progreso) => {
    if (progreso === 0) {
      return "bg-gray-200";
    } else if (progreso >= 80) {
      return "bg-green-400";
    } else {
      return "bg-yellow-400";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Seguimiento del grupo</h1>

      {/* Esquema de colores de progreso en una sola línea */}
      <div className="mb-6 flex space-x-4 items-center">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
          <span className="text-gray-700">No vista</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
          <span className="text-gray-700">En progreso</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-400 rounded mr-2"></div>
          <span className="text-gray-700">Vista</span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <CircularProgress />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-1 text-left text-xs font-semibold text-gray-600">Usuario</th>
                {modulos.map((modulo, index) => (
                  <th
                    key={index}
                    className="px-2 py-1 text-left text-xs font-semibold text-gray-600 relative"
                    colSpan={modulo.clases.length}
                  >
                    <Tooltip title={modulo.titulo} arrow>
                      <span className="block truncate max-w-[8ch] cursor-pointer">
                        {modulo.titulo}
                      </span>
                    </Tooltip>
                  </th>
                ))}
              </tr>
              <tr>
                <th className="px-2 py-1 text-left text-xs font-semibold text-gray-600"></th>
                {modulos.map((modulo, moduloIndex) =>
                  modulo.clases.map((clase, claseIndex) => (
                    <th
                      key={`${moduloIndex}-${claseIndex}`}
                      className="px-1 py-1 text-center text-xs font-semibold text-gray-600 relative"
                    >
                      <Tooltip title={clase.name} arrow>
                        <span className="block cursor-pointer">{claseIndex + 1}</span>
                      </Tooltip>
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usuarios.map((user) => (
                <tr key={user.sub}>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <button
                      className="text-blue-500 hover:text-blue-700 font-medium text-sm"
                      onClick={() => openModal(user)}
                    >
                      {user.name} {user.last_name}
                    </button>
                  </td>
                  {modulos.map((modulo) =>
                    modulo.clases.map((clase) => (
                      <td
                        key={`${modulo.id}-${clase.id}`}
                        className={`px-1 py-2 whitespace-nowrap border border-gray-300 text-center ${getProgressClass(
                          progresos[user.sub]?.[clase.id]
                        )}`}
                        title={clase.nombre}
                      >
                        <div className={`w-2 h-2 mx-auto ${getProgressClass(progresos[user.sub]?.[clase.id])}`} />
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Información del usuario"
        className="modal-content fixed inset-0 flex items-center justify-center p-6 bg-white rounded-lg shadow-xl max-w-lg mx-auto"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
      >
        {selectedUser && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Información del Usuario</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Nombre Completo:</strong> {selectedUser.name} {selectedUser.last_name}
              </p>
              <p className="text-gray-700">
                <strong>Correo Electrónico:</strong> {selectedUser.email}
              </p>
              <p className="text-gray-700">
                <strong>Teléfono:</strong> {selectedUser.telefono}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Cerrar
            </button>
          </div>
        )}
      </ReactModal>
    </div>
  );
}
