import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import AgregarClases from "../Clases/AgregarClases";
import { useNavigate } from "react-router-dom";
import ClaseEdit from "./ClaseEdit";
import Modal from "react-modal";
import Vimeo from "@vimeo/player";

function Clases() {
  const { id } = useParams();
  const [clases, setClases] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAgregarClaseIsOpen, setModalAgregarClaseIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get(`/cursos/${id}/clases`);
        console.log("response", response);
        if (response.status === 200) {
          const data = await response.data;
          setClases(data);
        } else {
          throw new Error("Curso no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener las clases:", error);
      }
    };
    fetchClases();
  }, [id]);

  const handleClaseClick = (clase) => {
    if (clase) {
      setClaseSeleccionada(clase);
    }
  };

  const extractYoutubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleEliminarClase = async (claseId) => {
    try {
      await axios.delete(`/cursos/${id}/clases/${claseId}`);
      const nuevasClases = clases.filter((clase) => clase.id !== claseId);
      setClases(nuevasClases);
      alert("Clase eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
    }
  };

  useEffect(() => {
    if (claseSeleccionada && claseSeleccionada.url) {
      if (claseSeleccionada.platform === "vimeo") {
        const vimeoPlayer = new Vimeo(`vimeoPlayer-${claseSeleccionada.id}`, {
          id: claseSeleccionada.url,
        });
        return () => {
          vimeoPlayer.destroy();
        };
      }
    }
  }, [claseSeleccionada]);
  const clasesOrdenadas = [...clases].sort((a, b) => a.id - b.id);

  return (
    <div className="container p-6 w-3/5">
      <div className="bg-gray-300 h-2 w-full"></div>
      <h2 className="text-2xl font-semibold mb-2 text-gray-900 pt-6">
        Clases del Curso
      </h2>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="Modal"
        contentLabel="Editar Clase"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40"
      >
        {claseSeleccionada && (
          <ClaseEdit
            id={claseSeleccionada.id}
            cursoId={parseInt(id)}
            isOpen={modalIsOpen}
            closeModal={() => setModalIsOpen(false)}
          />
        )}
      </Modal>

      <Modal
        isOpen={modalAgregarClaseIsOpen}
        onRequestClose={() => setModalAgregarClaseIsOpen(false)}
        className="Modal"
        contentLabel="Agregar Clase"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40"
      >
        <AgregarClases
          id={id}
          onAgregarClase={() => {
            setModalAgregarClaseIsOpen(false);
          }}
        />
      </Modal>

      <div>
        <button
          className="bg-blue-600 hover:bg-blue-900 text-white py-2 px-4 rounded mb-4 font-bold"
          onClick={() => setModalAgregarClaseIsOpen(true)}
        >
          Agregar Clase
        </button>

        <button
          className="bg-green-600 hover:bg-green-900 text-white py-2 px-4 rounded mb-4 font-bold"
          onClick={() => navigate("/admin/cursos/crearTaller")}
        >
          Agregar Taller
        </button>
      </div>

      <ul className="space-y-4">
      {clasesOrdenadas.map((clase) => (
          <li
            key={clase.id}
            className={`cursor-pointer bg-gray-300 p-4 rounded-lg ${
              claseSeleccionada && claseSeleccionada.id === clase.id
                ? "bg-blue-200"
                : ""
            }`}
            onClick={() => handleClaseClick(clase)}
          >
            <h3 className="text-xl font-semibold mb-2">{clase.name}</h3>
            {claseSeleccionada && claseSeleccionada.id === clase.id && (
              <div className="aspect-w-16 aspect-h-9">
                {claseSeleccionada &&
                claseSeleccionada.url &&
                claseSeleccionada.platform === "vimeo" ? (
                  <div id={`vimeoPlayer-${claseSeleccionada.id}`} />
                ) : claseSeleccionada &&
                  claseSeleccionada.url &&
                  claseSeleccionada.platform === "youtube" ? (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "0",
                      paddingBottom: "56.25%",
                    }}
                  >
                    <iframe
                      title="url"
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "80%",
                        height: "90%",
                      }}
                      src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
                        claseSeleccionada.url
                      )}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : claseSeleccionada && claseSeleccionada.pdfURL ? (
                  <div className="mt-4">
                    <ul className="space-y-2">
                      <li key={claseSeleccionada.id}>
                        {claseSeleccionada.id === claseSeleccionada?.id && (
                          <Link
                            to={`/admin/cursos/${id}/clases/${claseSeleccionada.id}/pdf`} 
                            className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-md"
                          >
                            <span>{claseSeleccionada.name} PDF</span>
                            <button className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-md">
                              Descargar
                            </button>
                          </Link>
                        )}
                      </li>
                    </ul>
                  </div>
                ) : (
                  <p>No hay contenido disponible para esta clase.</p>
                )}
                <div className="mt-4">
                  <button
                    onClick={() => setModalIsOpen(true)}
                    className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Editar Clase
                  </button>
                  <button
                    onClick={() => handleEliminarClase(clase.id)}
                    className="bg-red-600 hover.bg-red-900 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out"
                  >
                    Eliminar Clase
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Clases;
