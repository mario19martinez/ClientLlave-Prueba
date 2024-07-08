import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ClaseModuloAdmin from "../ClasesModuloAdmin/ClasesModuloAdmin";
import EditNoteIcon from "@mui/icons-material/EditNote";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import UsersInModulo from "./ListaModuloUser/UsersInModulo";
import AddUserModulo from "./ListaModuloUser/AddUserModulo";
import Modal from "react-modal";
import Tooltip from "@mui/material/Tooltip";
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

function ModuloDetailAdmin() {
  const [modulo, setModulo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const { nivelId, moduloId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModulo = async () => {
      try {
        const response = await axios.get(
          `/nivel/${nivelId}/modulo/${moduloId}`
        );
        const moduloData = response.data;
        setModulo(moduloData);
        setLoading(false);
      } catch (error) {
        setError("Produjo un error al cargar el detalle del modulo.");
        setLoading(false);
      }
    };
    fetchModulo();
  }, [nivelId, moduloId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/nivel/${nivelId}/modulo/${moduloId}`);
      navigate(`/nivel/${nivelId}`);
    } catch (error) {
      console.error("Error al eliminar el modulo:", error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openUserModal = () => {
    setUserModalOpen(true);
  };

  const closeUserModal = () => {
    setUserModalOpen(false);
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
    return <div className="text-center text-red-500 mt-4">Error: {error}</div>;
  }

  if (!modulo) {
    return (
      <div className="text-center mt-4">
        No se encontró ningún módulo con ID proporcionado.
      </div>
    );
  }

  return (
    <div className="px-10 py-5 translate-x-32 w-1/2">
      <button
        onClick={goBack}
        className="bg-blue-500 text-white w-20 h-10 mb-8 font-semibold py-0 px-4 rounded hover:bg-gray-400 transition-transform ease-in-out duration-300 hover:translate-y-2"
      >
        <KeyboardBackspaceIcon fontSize="large" />
      </button>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{modulo.titulo}</h2>
      <p className="text-gray-600 mb-4">
        <strong>Contenido:</strong> {modulo.contenido}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Descripción:</strong> {modulo.descripcion}
      </p>
      <h3 className="text-xl font-bold text-gray-800 mb-4">Preguntas:</h3>
      {Array.isArray(modulo.preguntas) && modulo.preguntas.length > 0 ? (
        <div className="mb-4">
          {modulo.preguntas.map((pregunta, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-700 mb-1">
                Pregunta {index + 1}: {pregunta.pregunta}
              </p>
              {pregunta.tipo === "opcion_multiple" && (
                <>
                  <p className="text-gray-600 mb-1">Opciones:</p>
                  <ul className="list-disc pl-5">
                    {pregunta.opciones.map((opcion, idx) => (
                      <li key={idx} className="text-gray-700">
                        {opcion}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p className="text-gray-600">
                Respuesta Correcta: {pregunta.respuestaCorrecta}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mb-4">
          No se encontraron preguntas para este módulo.
        </div>
      )}
      <div className="flex items-center">
        <Tooltip
          title="Eliminar Modulo"
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
            onClick={handleDelete}
            className="bg-red-500 text-white font-semibold py-2 px-2 rounded-md hover:bg-red-600 transition duration-300 mr-4"
          >
            <DeleteIcon fontSize="large" />
            <h1 className="text-xs text-white">Eliminar</h1>
          </button>
        </Tooltip>
        <Tooltip
          title="Editar Modulo"
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
            onClick={() =>
              navigate(`/nivel/${nivelId}/modulo/${moduloId}/edit`)
            }
            className="bg-blue-500 text-white font-semibold py-2 px-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            <EditNoteIcon fontSize="large" />
            <h1 className="text-xs text-white">Editar</h1>
          </button>
        </Tooltip>
        <Tooltip
          title="Agregar Usuario"
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
            onClick={openModal}
            className="bg-blue-500 text-white font-semibold py-2 px-3 rounded-md hover:bg-blue-600 transition duration-300 ml-4"
          >
            <PersonAddAlt1Icon fontSize="large" />
            <h1 className="text-xs text-white">Agregar</h1>
          </button>
        </Tooltip>
        <Tooltip
          title="Ver Usuarios"
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
            onClick={openUserModal}
            className="bg-green-500 text-white font-semibold py-2 px-3 rounded-md hover:bg-green-700 transition duration-300 ml-4"
          >
            <GroupsIcon fontSize="large" />
            <h1 className="text-xs text-white">Usuarios</h1>
          </button>
        </Tooltip>
      </div>
      <hr className="my-6" />
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Clases:</h3>
      <ClaseModuloAdmin moduloId={moduloId} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Agregar Usuario al Módulo"
        className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75"
      >
        <div className="bg-white rounded-lg p-6 w-4/5 mx-auto">
          <AddUserModulo moduloId={moduloId} closeModalAndReload={closeModal} />
          <button
            onClick={closeModal}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Cerrar
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={userModalOpen}
        onRequestClose={closeUserModal}
        contentLabel="Usuarios del Modulo"
        className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75"
      >
        <div className="bg-white rounded-lg p-6 w-4/5 mx-auto">
          <UsersInModulo moduloId={moduloId} />
          <button
            onClick={closeUserModal}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModuloDetailAdmin;
