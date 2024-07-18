import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCog } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { FaUserNinja } from "react-icons/fa";
import { MdEngineering } from "react-icons/md";

function Roles() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usuariosPerPage] = useState(10);
  const [filtroRol, setFiltroRol] = useState("");
  const pageRangeDisplayed = 7;

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get("/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };
    obtenerUsuarios();
  }, []);

  const cambiarRol = async (sub, nuevoRol) => {
    try {
      await axios.put(`/rol/${sub}`, { newRole: nuevoRol });
      setUsuarios((prevUsuarios) => {
        return prevUsuarios.map((usuario) => {
          if (usuario.sub === sub) {
            return { ...usuario, rol: nuevoRol };
          }
          return usuario;
        });
      });
    } catch (error) {
      console.log("Error al cambiar el rol del usuario:", error);
    }
  };

  const mostrarModalRoles = (sub) => {
    setUsuarioSeleccionado(sub);
    setModalVisible(true);
  };

  const cerrarModalRoles = () => {
    setModalVisible(false);
  };

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  // Nuevo manejador para cambiar el filtro de roles
  const handleFiltroRolChange = (event) => {
    setFiltroRol(event.target.value);
  };

  // Contadores de usuarios por rol
  const contadorUsuariosPorRol = {
    admin: usuarios.filter((usuario) => usuario.rol === "admin").length,
    docente: usuarios.filter((usuario) => usuario.rol === "docente").length,
    client: usuarios.filter((usuario) => usuario.rol === "client").length,
    editor: usuarios.filter((usuario) => usuario.rol === "editor").length,
    monitor: usuarios.filter((usuario) => usuario.rol === "monitor").length,
  };

  const usuariosFiltrados = usuarios.filter((usuario) => {
    return (
      (usuario.name.toLowerCase().includes(busqueda.toLowerCase()) ||
        usuario.last_name.toLowerCase().includes(busqueda.toLowerCase())) &&
      (filtroRol === "" || usuario.rol === filtroRol)
    ); // Aplicar filtro de rol
  });

  // Paginación - Calcula índices de usuarios
  const indexOfLastUser = currentPage * usuariosPerPage;
  const indexOfFirstUser = indexOfLastUser - usuariosPerPage;
  const usuariosActuales = usuariosFiltrados.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  // Cambia de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcula qué números de página mostrar en el paginado
  const calculatePageNumbers = () => {
    const totalPages = Math.ceil(usuariosFiltrados.length / usuariosPerPage);
    const halfPageRange = Math.floor(pageRangeDisplayed / 2);
    let startPage = Math.max(1, currentPage - halfPageRange);
    let endPage = Math.min(totalPages, startPage + pageRangeDisplayed - 1);

    if (totalPages <= pageRangeDisplayed) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= halfPageRange) {
      startPage = 1;
      endPage = pageRangeDisplayed;
    } else if (currentPage + halfPageRange >= totalPages) {
      startPage = totalPages - pageRangeDisplayed + 1;
      endPage = totalPages;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  // Array de páginas a mostrar
  const pageNumbers = calculatePageNumbers();

  return (
    <div className="container mx-auto mt-8 px-3">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">
        Roles de Usuarios
      </h1>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={busqueda}
          onChange={handleBusquedaChange}
          className="px-4 py-2 border border-gray-300 rounded-md mr-2"
        />
        {/* Nuevo filtro de roles */}
        <select
          value={filtroRol}
          onChange={handleFiltroRolChange}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Todos los roles</option>
          <option value="admin">Admin</option>
          <option value="docente">Docente</option>
          <option value="client">Estudiante</option>
          <option value="editor">Editor</option>
          <option value="monitor">Monitor</option>
        </select>
        {/* Contadores de usuarios por rol */}
        <div className="ml-4 flex items-center space-x-4">
          <span className="text-gray-700">
            Admin: {contadorUsuariosPorRol.admin}
          </span>
          <span className="text-gray-700">
            Docente: {contadorUsuariosPorRol.docente}
          </span>
          <span className="text-gray-700">
            Estudiante: {contadorUsuariosPorRol.client}
          </span>
          <span className="text-gray-700">
            Editor: {contadorUsuariosPorRol.editor}
          </span>
          <span className="text-gray-700">
            Monitor: {contadorUsuariosPorRol.monitor}
          </span>
        </div>
      </div>
      <div className="overflow-x-scroll px-5">
        <table className="min-w-full border-collapse border bg-blue-600">
          <thead>
            <tr className="text-white">
              <th className="py-2 px-4 border">Nombre</th>
              <th className="py-2 px-4 border">Apellido</th>
              <th className="py-2 px-4 border">Rol</th>
              <th className="py-2 px-4 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosActuales.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 bg-gray-100">
                  No se encontraron usuarios
                </td>
              </tr>
            ) : (
              usuariosActuales.map((usuario, index) => (
                <tr
                  key={usuario.sub}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-2 px-4 border">{usuario.name}</td>
                  <td className="py-2 px-4 border">{usuario.last_name}</td>
                  <td className="py-2 px-4 border">
                    {usuario.rol === "client" ? "Estudiante" : usuario.rol}
                  </td>
                  <td className="py-2 px-4 border">
                    <div className="flex items-center ">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-2 py-1 rounded mr-2"
                        onClick={() => mostrarModalRoles(usuario.sub)}
                      >
                        Administrar Rol
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <nav className="mt-4" aria-label="Pagination">
        <ul className="flex justify-center">
          <li>
            <button
              onClick={() => paginate(currentPage === 1 ? 1 : currentPage - 1)}
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "bg-gray-200 text-gray-600"
                  : "bg-white hover:bg-gray-50"
              } px-3 py-1 border border-gray-300 rounded-l-md font-medium text-sm focus:outline-none`}
            >
              {"<"}
            </button>
          </li>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => paginate(pageNumber)}
                className={`${
                  pageNumber === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-gray-50"
                } px-3 py-1 border border-gray-300 font-medium text-sm focus:outline-none`}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() =>
                paginate(
                  currentPage === pageNumbers.length
                    ? pageNumbers.length
                    : currentPage + 1
                )
              }
              disabled={currentPage === pageNumbers.length}
              className={`${
                currentPage === pageNumbers.length
                  ? "bg-gray-200 text-gray-600"
                  : "bg-white hover:bg-gray-50"
              } px-3 py-1 border border-gray-300 rounded-r-md font-medium text-sm focus:outline-none`}
            >
              {">"}
            </button>
          </li>
        </ul>
      </nav>

      {/* Modal de Roles */}
      {modalVisible && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-400 sm:mx-0 sm:h-12 sm:w-12 text-white">
                    <FaUserCog className="text-xl" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Administrar Rol
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm leading-5 text-gray-500">
                        Selecciona un rol para el usuario:
                      </p>
                      <div className="mt-4 flex flex-wrap justify-center">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded mr-2 mb-2 flex items-center transition-colors duration-300"
                          onClick={() => {
                            cambiarRol(usuarioSeleccionado, "admin");
                            cerrarModalRoles();
                          }}
                        >
                          <FaUserAstronaut className="mr-1" />
                          Admin
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mr-2 mb-2 flex items-center transition-colors duration-300"
                          onClick={() => {
                            cambiarRol(usuarioSeleccionado, "docente");
                            cerrarModalRoles();
                          }}
                        >
                          <FaUserTie className="mr-1" />
                          Docente
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded mr-2 mb-2 flex items-center transition-colors duration-300"
                          onClick={() => {
                            cambiarRol(usuarioSeleccionado, "client");
                            cerrarModalRoles();
                          }}
                        >
                          <FaUserGraduate className="mr-1" />
                          Estudiante
                        </button>
                        <button
                          className="bg-orange-500 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded mr-2 mb-2 flex items-center transition-colors duration-300"
                          onClick={() => {
                            cambiarRol(usuarioSeleccionado, "editor");
                            cerrarModalRoles();
                          }}
                        >
                          <FaUserNinja className="mr-1" />
                          Editor
                        </button>
                        <button
                          className="bg-purple-500 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded mr-2 mb-2 flex items-center transition-colors duration-300"
                          onClick={() => {
                            cambiarRol(usuarioSeleccionado, "monitor");
                            cerrarModalRoles();
                          }}
                        >
                          <MdEngineering className="mr-1" />
                          Monitor
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    onClick={cerrarModalRoles}
                  >
                    Cancelar
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Roles;