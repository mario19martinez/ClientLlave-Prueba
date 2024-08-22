import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import axios from "axios";
import EditarUsuarioAdmin from "../EditarUsuarioAdmin";
import AddNovedad from "./AddNovedad";
import UserHistoryDetail from "../UserHistorial/UserHistorialDetail";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from '@mui/material/CircularProgress';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function UsersDetails({ identificacion }) {
  const [userData, setUserData] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [gruposNiveles, setGruposNiveles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNovedadModalOpen, setIsNovedadModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [noCursos, setNoCursos] = useState(false);
  const [noGrupos, setNoGrupos] = useState(false);

  // Nuevo estado para almacenar los cursos con nombre
  const [cursoNames, setCursoNames] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/${identificacion}`);
        setUserData(response.data);
      } catch (err) {
        setError("Error al obtener la información del usuario.");
      }
    };

    const fetchCursos = async () => {
      try {
        const response = await axios.get(`/userCourse/${identificacion}`);
        const cursosInscritos = response.data.inscripciones;
        setCursos(cursosInscritos);

        // Obtener información de cada curso
        const cursoRequests = cursosInscritos.map((curso) =>
          axios.get(`/cursos/${curso.cursoId}`)
        );

        // Esperar a que todas las solicitudes de curso se completen
        const cursoResponses = await Promise.all(cursoRequests);
        const cursosConNombre = {};
        cursoResponses.forEach((res) => {
          cursosConNombre[res.data.id] = res.data.name;
        });

        setCursoNames(cursosConNombre);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setNoCursos(true);
        } else {
          setError("Error al obtener los cursos inscritos.");
        }
      }
    };

    const fetchGruposNiveles = async () => {
      try {
        const response = await axios.get(
          `/user/${identificacion}/grupos-nivel`
        );
        setGruposNiveles(response.data.grupos);
        console.log("Grupos y Niveles del usuario:", response.data.grupos);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setNoGrupos(true);
        } else {
          setError("Error al obtener los grupos y niveles del usuario.");
        }
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await fetchUserData();
      await fetchCursos();
      await fetchGruposNiveles();
      setLoading(false);
    };

    fetchData();
  }, [identificacion]);

  const handleEditUser = (userEmail) => {
    setIsEditModalOpen(true);
    setSelectedUserEmail(userEmail);
  };

  const handleAddNovedad = () => {
    setIsNovedadModalOpen(true);
  };

  const handleShowHistory = () => {
    setIsHistoryModalOpen(true);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600 mt-4 font-semibold">Cargando...</p>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 mt-4 font-semibold">Error: {error}</p>
          <p className="text-red-500 mt-4 font-semibold">Oops! Algo salió mal. Vuelve a intentarlo en un momento.</p>
          <p className="text-red-500 mt-4 font-semibold">
          <SentimentVeryDissatisfiedIcon fontSize="large" />
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {userData ? (
        <div className="rounded-lg p-8">
          <p className="text-center text-2xl font-bold mb-4 text-gray-800">
            Detalles del usuario
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700">Nombre:</p>
              <p className="font-semibold text-gray-800">{userData.name}</p>
            </div>
            <div>
              <p className="text-gray-700">Apellido:</p>
              <p className="font-semibold text-gray-800">
                {userData.last_name}
              </p>
            </div>
            <div>
              <p className="text-gray-700">Correo:</p>
              <p className="font-semibold text-gray-800">{userData.email}</p>
            </div>
            <div>
              <p className="text-gray-700">País:</p>
              <p className="font-semibold text-gray-800">{userData.pais}</p>
            </div>
            <div>
              <p className="text-gray-700">Teléfono:</p>
              <p className="font-semibold text-gray-800">{userData.telefono}</p>
            </div>
          </div>
          {gruposNiveles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">
                Grupos y Niveles
              </h3>
              <ul className="list-disc list-inside">
                {gruposNiveles.map((grupo, index) => (
                  <li key={index} className="font-semibold text-gray-800">
                    Grupo: {grupo.name} - Nivel: {grupo.nivel.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cursos.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">Cursos</h3>
              <ul className="list-disc list-inside">
                {(showAllCourses ? cursos : cursos.slice(0, 3)).map(
                  (curso, index) => (
                    <li key={index} className="font-semibold text-gray-800">
                      {cursoNames[curso.cursoId] ||
                        "Nombre del curso no disponible"}
                    </li>
                  )
                )}
              </ul>
              {cursos.length > 3 && (
                <button
                  className="mt-2 text-blue-500 hover:underline focus:outline-none"
                  onClick={() => setShowAllCourses(!showAllCourses)}
                >
                  {showAllCourses ? "Ver menos" : "Ver más"}
                </button>
              )}
            </div>
          ) : (
            noCursos && (
              <p className="mt-4 text-red-500 font-semibold">
                El usuario no está inscrito en ningún curso.
              </p>
            )
          )}
          {gruposNiveles.length === 0 && noGrupos && (
            <p className="mt-4 text-red-500 font-semibold">
              El usuario no está inscrito en ningún grupo.
            </p>
          )}
          {noCursos && noGrupos && (
            <p className="mt-4 text-red-500 font-semibold">
              El usuario no está inscrito en ningún curso o grupo.
            </p>
          )}
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 focus:outline-none mr-4"
              onClick={() => handleEditUser(userData.email)}
            >
              Editar
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 focus:outline-none"
              onClick={() => handleAddNovedad(userData.sub)}
            >
              Novedad
            </button>
            <button
              className="px-4 py-2 ml-4 bg-gray-600 text-white rounded hover:bg-gray-800 focus:outline-none"
              onClick={handleShowHistory}
            >
              Historial
            </button>
          </div>
        </div>
      ) : (
        <div>No se encontró información para este usuario.</div>
      )}
      {isEditModalOpen && selectedUserEmail && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          contentLabel="Editar usuario"
          className="Modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 shadow-lg z-50 max-w-md w-full"
          overlayClassName="Overlay fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
        >
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          {selectedUserEmail && (
            <EditarUsuarioAdmin userEmail={selectedUserEmail} />
          )}
        </Modal>
      )}
      {isNovedadModalOpen && (
        <Modal
          isOpen={isNovedadModalOpen}
          onRequestClose={() => setIsNovedadModalOpen(false)}
          contentLabel="Añadir Novedad"
          className="Modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 shadow-lg z-50 max-w-md w-full"
          overlayClassName="Overlay fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
        >
          <button
            onClick={() => setIsNovedadModalOpen(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          {userData && <AddNovedad userIdentificacion={userData.sub} />}
        </Modal>
      )}
      {isHistoryModalOpen && (
  <Modal
    isOpen={isHistoryModalOpen}
    onRequestClose={() => setIsHistoryModalOpen(false)}
    contentLabel="Historial de Usuario"
    className="Modal rounded-lg p-6 max-w-lg w-full"
    overlayClassName="Overlay fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
  >
    <button
      onClick={() => setIsHistoryModalOpen(false)}
      className="absolute top-0 right-0 text-gray-600 hover:text-gray-800 focus:outline-none cursor-pointer"
    >
      <Tooltip
        title="Cerrar"
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 bg-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Tooltip>
    </button>
    {userData && <UserHistoryDetail userSub={userData.sub} />}
  </Modal>
)}
    </div>
  );
}

// PropTypes validation
UsersDetails.propTypes = {
  identificacion: PropTypes.string.isRequired,
};
