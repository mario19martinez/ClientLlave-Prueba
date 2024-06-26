import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Tooltip from "@mui/material/Tooltip";

function RegistroActividad() {
  const [registros, setRegistros] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [grupos, setGrupos] = useState([]);
  const [niveles, setNiveles] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [selectedGrupo, setSelectedGrupo] = useState("");
  const [selectedNivel, setSelectedNivel] = useState("");
  const [selectedModulo, setSelectedModulo] = useState("");
  const [filteredGrupos, setFilteredGrupos] = useState([]);
  const [filteredModulos, setFilteredModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [registrosResponse, nivelesResponse] = await Promise.all([
          axios.get("/registros-actividad"),
          axios.get("/all-niveles"),
        ]);

        const sortedRegistros = registrosResponse.data.sort(
          (a, b) => new Date(b.inicio) - new Date(a.inicio)
        );
        //console.log("Fetched Registros:", sortedRegistros);

        setRegistros(sortedRegistros);
        setNiveles(nivelesResponse.data);
      } catch (error) {
        setError(error.message);
        console.error("Error al cargar datos iniciales:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await axios.get("/grupos");
        setGrupos(response.data);
        setFilteredGrupos(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGrupos();
  }, []);

  useEffect(() => {
    const fetchModulos = async () => {
      try {
        const response = await axios.get("/modulos");
        setModulos(response.data);
        setFilteredModulos(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchModulos();
  }, []);

  useEffect(() => {
    const fetchGruposPorNivel = async () => {
      try {
        if (selectedNivel === "") {
          setFilteredGrupos(grupos); // Mostrar todos los grupos cuando no hay nivel seleccionado
          //console.log("Filtered grupos reset to all grupos.");
        } else {
          const response = await axios.get(`/niveles/${selectedNivel}/grupos`);
          setFilteredGrupos(response.data);
          //console.log("response grupo:", response.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchGruposPorNivel();
  }, [selectedNivel, grupos]);

  useEffect(() => {
    const fetchModulosPorGrupo = async () => {
      try {
        if (selectedGrupo !== "") {
          const response = await axios.get(`/grupo/${selectedGrupo}/modulos`);
          setModulos(response.data.modulos);
        }
      } catch (error) {
        setError(error.message);
        console.error("Error al traer los modulos del grupo:", error);
      }
    };

    fetchModulosPorGrupo();
  }, [selectedGrupo]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNivelChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedNivel(selectedValue);
    setSelectedGrupo("");
    setModulos([]);
    //console.log("Select Nivel:", selectedNivel);
  };

  const handleGrupoChange = (e) => {
    const selectedValueGrupo = e.target.value;
    setSelectedGrupo(selectedValueGrupo);
    //console.log("Select grupo:", selectedValueGrupo);
  };

  const handleModuloChange = (e) => {
    const selectedValueModulo = e.target.value;
    setSelectedModulo(selectedValueModulo);
    //console.log("Selected Modulo:", selectedValueModulo);
  };

  const handleResetFilters = () => {
    setSelectedNivel("");
    setSelectedGrupo("");
    setSelectedModulo("");
    setFilteredGrupos(grupos);
    setModulos(filteredModulos);
  };

  const filteredRegistros = registros.filter((registro) => {
    const userMatch =
      (registro.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        registro.user?.last_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())) ??
      false;
    const grupoMatch =
      registro.modulo?.grupos[0]?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ?? false;
    const moduloMatch =
      registro.modulo?.titulo
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ?? false;
    const claseMatch =
      registro.nivelclase?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ?? false;

    const selectedNivelMatch =
      !selectedNivel ||
      (registro.modulo?.grupos &&
        registro.modulo.grupos.some(
          (grupo) => grupo.nivel.id === selectedNivel
        ));

    const selectedGrupoMatch =
      !selectedGrupo ||
      (registro.user?.grupos &&
        registro.user.grupos.some((grupo) => grupo.id === selectedGrupo));

    const selectedModuloMatch =
      !selectedModulo || registro.modulo?.id === selectedModulo;

    return (
      (userMatch || grupoMatch || moduloMatch || claseMatch) &&
      selectedGrupoMatch &&
      selectedNivelMatch &&
      selectedModuloMatch
    );
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentRegistros = filteredRegistros.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredRegistros.length / usersPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-xl font-semibold text-blue-600">
          Cargando...
        </span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-5 px-10 p-8 ">
      <button
        onClick={goBack}
        className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300 mb-4"
      >
        <KeyboardBackspaceIcon fontSize="medium" className="mr-2" />
        Volver
      </button>
      <h1 className="text-xl font-bold mb-6 text-gray-700">
        Registros de Actividad
      </h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border-2 border-gray-400 p-2 focus:border-blue-800 focus:outline-none rounded-lg"
        />
        <select
          value={selectedNivel}
          onChange={handleNivelChange}
          className="border-2 border-gray-400 p-2 focus:border-blue-800 focus:outline-none rounded-lg cursor-pointer"
        >
          <option value="">Todos los cursos</option>
          {niveles.map((nivel) => (
            <option key={nivel.id} value={nivel.id}>
              {nivel.name}
            </option>
          ))}
        </select>
        <select
          value={selectedGrupo}
          onChange={handleGrupoChange}
          className="border-2 border-gray-400 p-2 focus:border-blue-800 focus:outline-none rounded-lg cursor-pointer"
        >
          <option value="">Todos los grupos</option>
          {selectedNivel === ""
            ? grupos.map((grupo) => (
                <option key={grupo.id} value={grupo.id}>
                  {grupo.name}
                </option>
              ))
            : filteredGrupos.map((grupo) => (
                <option key={grupo.id} value={grupo.id}>
                  {grupo.name}
                </option>
              ))}
        </select>
        <select
          value={selectedModulo}
          onChange={handleModuloChange}
          className="border-2 border-gray-400 p-2 focus:border-blue-800 focus:outline-none rounded-lg cursor-pointer"
        >
          <option value="">Todos los modulos</option>
          {modulos.map((modulo) => (
            <option key={modulo.id} value={modulo.id}>
              {modulo.titulo}
            </option>
          ))}
        </select>
        <Tooltip
          title="Reset Filtros"
          arrow
          placement="top"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -6],
                  },
                },
              ],
            },
          }}
        >
          <button
            onClick={handleResetFilters}
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-700 focus:outline-none"
          >
            <RotateLeftIcon />
          </button>
        </Tooltip>
        <Tooltip
          title="Usuarios No Activos"
          arrow
          placement="top"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -6],
                  },
                },
              ],
            },
          }}
        >
          <button
            onClick={() => navigate("/admin/registros-sin-actividad")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-0 px-4 rounded"
          >
            No Activos
          </button>
        </Tooltip>
      </div>
      {currentRegistros.length === 0 ? (
        <p className="text-gray-600 font-semibold">
          No hay registros disponibles.
        </p>
      ) : (
        <div className="overflow-x-auto border border-gray-400 rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg border-separate border-spacing-2">
            <thead className="bg-blue-200 border-b border-gray-300">
              <tr className="bg-blue-100 text-gray-700 uppercase text-xs leading-normal">
                <th className="py-3 px-6 text-left">Usuario</th>
                <th className="py-3 px-6 text-left">Nivel</th>
                <th className="py-3 px-6 text-left">Grupo</th>
                <th className="py-3 px-6 text-left">Modulo</th>
                <th className="py-3 px-6 text-left">Clase</th>
                <th className="py-3 px-6 text-left">Inicio</th>
                <th className="py-3 px-6 text-left">Progreso</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-mono divide-y divide-gray-200">
              {currentRegistros.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-3 px-6 text-center">
                    No hay registros disponibles.
                  </td>
                </tr>
              ) : (
                currentRegistros.map((registro) => (
                  <tr
                    key={registro.id}
                    className="border-b border-gray-200 hover:bg-gray-100 bg-slate-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {registro.user
                        ? `${registro.user.name} ${registro.user.last_name}`
                        : ""}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {registro.modulo &&
                      registro.modulo.grupos &&
                      registro.modulo.grupos[0] &&
                      registro.modulo.grupos[0].nivel
                        ? registro.modulo.grupos[0].nivel.name
                        : ""}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {registro.user &&
                        registro.user.grupos &&
                        (selectedGrupo !== ""
                          ? registro.user.grupos.find(
                              (grupo) => grupo.id === selectedGrupo
                            )?.name
                          : registro.modulo?.grupos[0]?.name)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {registro.modulo ? registro.modulo.titulo : ""}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {registro.nivelclase ? registro.nivelclase.name : ""}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {registro.inicio
                        ? new Date(registro.inicio).toLocaleDateString()
                        : ""}
                    </td>
                    <td
                      className={`py-3 px-6 text-left font-semibold w-0 ${
                        registro.progreso >= 80
                          ? "bg-green-500 text-white"
                          : "bg-yellow-300 text-black"
                      }`}
                    >
                      {registro.progreso.toFixed(1)}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      <nav className="mt-4" aria-label="Pagination">
        <ul className="flex justify-center">
          <li>
            <button
              onClick={() =>
                setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)
              }
              disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "bg-gray-200 text-gray-600"
                  : "bg-white hover:bg-gray-50"
              } px-3 py-1 border border-gray-300 rounded-l-md font-medium text-sm focus:outline-none`}
            >
              &lt;
              <span className="sr-only">Previous</span>
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
                setCurrentPage(
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
              &gt;
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default RegistroActividad;
