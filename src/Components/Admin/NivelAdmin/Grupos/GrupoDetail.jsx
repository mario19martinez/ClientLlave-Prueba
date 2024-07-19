import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Modal from "react-modal";
import UsersGrupo from "../UserGrupo/UsersGrupo";
import AddModulo from "../AddModulo/AddModulo";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";
import GrupoEdit from "./GrupoEdit";

function GrupoDetail() {
  const [grupo, setGrupo] = useState(null);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id, grupoId } = useParams();

  useEffect(() => {
    const fetchGrupo = async () => {
      try {
        if (!id || !grupoId) {
          setError("ID de nivel o grupo no encontrados");
          return;
        }
        const response = await axios.get(`/niveles/${id}/grupos/${grupoId}`);
        setGrupo(response.data);
      } catch (error) {
        setError(error.response.data.error);
        console.error("Ocurrio un error:", error);
      }
    };
    fetchGrupo();
  }, [id, grupoId]);

  const handleDeleteGrupo = async () => {
    // Primero, mostramos un cuadro de confirmación al usuario
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este grupo?"
    );

    // Si el usuario confirma, procedemos con la eliminación
    if (confirmDelete) {
      try {
        await axios.delete(`/nivel/${id}/grupo/${grupoId}`);
        toast.success("Eliminando...!", {
          position: "top-center",
          autoClose: 1500,
          closeOnClick: true,
          theme: "light",
        });
        // Redirige a la pagina anterior
        setTimeout(() => {
          navigate(-1);
        }, 1700);
      } catch (error) {
        console.error("Error al eliminar el grupo:", error);
        toast.warn("Ocurrio un error al eliminar el grupo.", {
          position: "top-center",
          autoClose: 1700,
          closeOnClick: true,
          theme: "light",
        });
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const openEditModal = () => {
    setEditModalIsOpen(true);
  };

  const closeEditModulo = () => {
    setEditModalIsOpen(false);
  };

  if (error) {
    return <p className="text-center text-red-500 mt-4">Error: {error}</p>;
  }

  if (!grupo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-xl font-semibold text-blue-600">
          Cargando...
        </span>
      </div>
    );
  }

  if (id === undefined) {
    return (
      <p className="text-center text-red-500 mt-4">
        Error: ID de nivel no encontrado
      </p>
    );
  }

  return (
    <div className="px-2 py-2 w-full">
      <ToastContainer />
      <Tooltip
        title="Haz clic para volver atrás"
        arrow
        placement="right"
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
          onClick={handleGoBack}
          className="bg-blue-500 text-white w-20 h-10 mb-8 font-semibold py-0 px-4 rounded hover:bg-gray-400 transition-transform ease-in-out duration-300 hover:translate-y-2"
        >
          <KeyboardBackspaceIcon fontSize="large" />
        </button>
      </Tooltip>
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Detalle del Grupo
      </h2>
      <p className="mb-4 font-gabarito text-gray-700">
        <strong className="text-gray-700 font-bold">Nombre:</strong>{" "}
        {grupo.name}
      </p>
      <p className="mb-4 font-gabarito text-gray-700">
        <strong className="text-gray-700 font-bold">Descripción:</strong>{" "}
        {grupo.descripcion}
      </p>
      <p className="mb-4 font-gabarito text-gray-700">
        <strong className="text-gray-700 font-bold">Inicia:</strong>{" "}
        {grupo.fechaInicio}
      </p>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-indigo-500 text-white font-bold py-2 px-6 rounded-s-lg shadow-md hover:bg-indigo-700 hover:shadow-lg focus:outline-none transition-all duration-300"
      >
        Agregar Modulo
      </button>
      <button
        onClick={openEditModal}
        className="bg-green-500 text-white font-bold ml-1 py-2 px-6 shadow-md hover:bg-green-700 hover:shadow-lg focus:outline-none transition-all duration-300"
      >
        Editar
      </button>
      <button
        onClick={handleDeleteGrupo}
        className="bg-red-500 text-white font-bold ml-1 py-2 px-6 rounded-r-lg shadow-md hover:bg-red-700 hover:shadow-lg focus:outline-none transition-all duration-300"
      >
        Eliminar
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Agregar Modulo"
      >
        <AddModulo nivelId={id} grupoId={grupoId} />
        <Tooltip
          title="Haz clic para cerrar"
          arrow
          placement="left"
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
            onClick={() => setModalIsOpen(false)}
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
          >
            <CancelIcon fontSize="large" />
          </button>
        </Tooltip>
      </Modal>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModulo}
        contentLabel="Editar Grupo"
        className="flex items-center"
      >
        <div className="p-2 w-2/5 h-screen mx-auto rounded-lg shadow-lg">
          <GrupoEdit nivelId={id} grupoId={grupoId} />
          <Tooltip
            title="Haz clic para cerrar"
            arrow
            placement="left"
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
              onClick={closeEditModulo}
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
            >
              <CancelIcon fontSize="large" />
            </button>
          </Tooltip>
        </div>
      </Modal>
      <UsersGrupo nivelId={id} grupoId={grupoId} />
    </div>
  );
}

export default GrupoDetail;