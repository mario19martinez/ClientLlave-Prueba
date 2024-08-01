import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";

function UsersGrupoMonitor({ nivelId, grupoId, moduloId }) {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const usersPerPage = 10;
  const [clases, setClases] = useState([]);
  const [loadingClases, setLoadingClases] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalDetails, setModalDetails] = useState({ name: "", resumen: "" });
  const [actividadUsuarios, setActividadUsuarios] = useState({});
  const [openResponsiveModal, setOpenResponsiveModal] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(`/nivel/${nivelId}/grupos/${grupoId}/usuarios`);
        setUsuarios(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching usuarios:", error);
      }
    };

    fetchUsuarios();
  }, [nivelId, grupoId]);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get(`/nivel/${nivelId}/modulo/${moduloId}/clases`);
        setClases(response.data);
        setLoadingClases(false);
      } catch (error) {
        console.error("Error fetching clases:", error);
      }
    };

    fetchClases();
  }, [nivelId, moduloId]);

  useEffect(() => {
    setFilteredUsuarios(usuarios);
  }, [usuarios]);

  const fetchUserActivity = useCallback(async (userSub) => {
    try {
      const response = await axios.get(`/actividad/${grupoId}/usuario/${userSub}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user activity:", error);
      return [];
    }
  }, [grupoId]);

  const filterUsuarios = useCallback(() => {
    let filteredData = usuarios;

    if (searchTerm.trim() !== "") {
      filteredData = filteredData.filter(
        (usuario) =>
          usuario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.telefono.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsuarios(filteredData);
  }, [searchTerm, usuarios]);

  useEffect(() => {
    filterUsuarios();
  }, [searchTerm, filterUsuarios]);

  useEffect(() => {
    const fetchActividades = async () => {
      const actividades = {};
      for (const usuario of usuarios) {
        const actividad = await fetchUserActivity(usuario.sub);
        actividades[usuario.sub] = actividad;
      }
      setActividadUsuarios(actividades);
    };

    if (usuarios.length > 0) {
      fetchActividades();
    }
  }, [usuarios, fetchUserActivity]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsuarios.slice(startIndex, endIndex);

  const handleOpenModal = (name, resumen) => {
    setModalDetails({ name, resumen });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalDetails({ name: "", resumen: "" });
  };

  const removeHtmlTags = (html) => {
    return html.replace(/<[^>]*>/g, '').slice(0, 30);
  };

  const getCellColor = (progreso) => {
    if (progreso === null) {
      return "bg-gray-300";
    } else if (progreso >= 80) {
      return "bg-green-400";
    } else {
      return "bg-yellow-400";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOpenResponsiveModal(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCloseResponsiveModal = () => {
    setOpenResponsiveModal(false);
  };

  if (loading || loadingClases) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="overflow-x-auto translate-y-4 w-full">
      <div className="flex space-x-4 mb-4">
        <TextField
          label="Buscar por Nombre, Apellido, Correo o Teléfono"
          variant="outlined"
          className="flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="my-4 flex justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300"></div>
          <span>No vista</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-400"></div>
          <span>En progreso</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-400"></div>
          <span>Vista</span>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-blue-300 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usuario
            </th>
            {clases
              .filter(clase => clase.url && clase.texto)
              .map((clase, index) => (
                <th
                  key={clase.id}
                  className="py-2 px-4 border-b border-blue-300 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {index + 1}
                  <div>
                    <button
                      className="text-xs text-blue-500"
                      onClick={() => handleOpenModal(clase.name, clase.texto)}
                    >
                      Ver detalles
                    </button>
                  </div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((usuario) => (
            <tr key={usuario.sub}>
              <td className="py-3 px-4 border-b border-blue-300 text-sm">
                <div className="flex flex-col">
                  <span className="font-medium">{usuario.name} {usuario.last_name}</span>
                  <span className="text-gray-500">{usuario.telefono}</span>
                </div>
              </td>
              {clases
                .filter(clase => clase.url && clase.texto)
                .map((clase) => {
                  const actividad = actividadUsuarios[usuario.sub]?.find(a => a.nivelclase.name === clase.name);
                  const progreso = actividad ? actividad.progreso : null;
                  return (
                    <td
                      key={clase.id}
                      className={`py-3 px-4 border-b border-blue-300 text-sm ${getCellColor(progreso)} border-r border-blue-300`}
                    />
                  );
                })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-4">
        <Pagination
          count={Math.ceil(filteredUsuarios.length / usersPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Detalles de la Clase</DialogTitle>
        <DialogContent>
          <p><strong>Nombre:</strong> {modalDetails.name}</p>
          <p><strong>Resumen:</strong> {removeHtmlTags(modalDetails.resumen)}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openResponsiveModal} onClose={handleCloseResponsiveModal}>
        <DialogTitle>Recomendación</DialogTitle>
        <DialogContent>
          <p>Para mejorar su experiencia a la hora de las asistencias de los usuarios, se le recomienda entrar desde un PC o tablet.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResponsiveModal} color="primary">
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

UsersGrupoMonitor.propTypes = {
  nivelId: PropTypes.string.isRequired,
  grupoId: PropTypes.string.isRequired,
  moduloId: PropTypes.string.isRequired,
};

export default UsersGrupoMonitor;