// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CrearTestimonios from "./CrearTestimonios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ReactPaginate from "react-paginate";
import Modal from "react-modal";
import EditarTestimonio from "./EditarTestimonio";

function TestimoniosAdmin() {
  const [testimonios, setTestimonios] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [crearModalIsOpen, setCrearModalIsOpen] = useState(false);
  const [testimonioId, setTestimonioId] = useState(null);
  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openCrearModal = () => {
    setCrearModalIsOpen(true);
  };

  const closeCrearModal = () => {
    setCrearModalIsOpen(false);
  };

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const response = await axios.get("/testimonios");
        setTestimonios([...response.data.testimonios]);
      } catch (error) {
        console.error("Error al obtener testimonios", error);
      }
    };

    fetchTestimonios();
  }, []);

  const handleDeleteTestimonio = async (id) => {
    try {
      await axios.delete(`/testimonio/${id}`);

      const nuevoTestimonios = testimonios.filter((t) => t.id !== id);
      setTestimonios(nuevoTestimonios);
    } catch (error) {
      console.error("Error al eliminar testimonio", error);
    }
  };

  const handleEditarTestimonio = (id) => {
    setTestimonioId(id);
    openModal();
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="container mx-auto my-8 text-gray-800 pl-10 p-4">
      <button
      onClick={goBack}
      className="flex items-center bg-blue-500 text-white font-semibold h-10 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300 mb-8"
      >
        <KeyboardBackspaceIcon fontSize="large" className="mr-2" />
      </button>
      <h1 className="text-2xl font-bold mt-4">Lista de Testimonios</h1>
      <div className="pt-5 pb-5">
        <button
          onClick={openCrearModal}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Agregar Testimonio
        </button>
      </div>

      {/* Modal para crear testimonios */}
      <CrearTestimonios
        isOpen={crearModalIsOpen}
        onRequestClose={closeCrearModal}
      />

      {/* Modal para editar testimonios */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            backgroundColor: "transparent",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        {testimonioId && <EditarTestimonio testimonioId={testimonioId} />}
      </Modal>

      <div className="flex flex-wrap -mx-4">
        {Array.isArray(testimonios) &&
          testimonios.map((testimonio) => (
            <div
              key={testimonio.id}
              className="mb-8 p-4 border rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-4"
            >
              <h2 className="text-lg font-bold mb-2">
                {testimonio.descripcion}
              </h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  title="video"
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${testimonio.video}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mt-2 flex justify-center">
                <div className="pr-1">
                  <button
                    onClick={() => handleEditarTestimonio(testimonio.id)}
                    className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-700 flex items-center"
                  >
                    <EditIcon sx={{ fontSize: 20 }} />
                  </button>
                </div>
                <div className="pl-1">
                  <button
                    onClick={() => handleDeleteTestimonio(testimonio.id)}
                    className="bg-red-500 text-white py-2 px-2 rounded hover:bg-red-700 flex items-center"
                  >
                    <DeleteIcon sx={{ fontSize: 20 }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Paginacion */}
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        pageCount={Math.ceil(testimonios.length / 6)}
        containerClassName={"flex justify-center mt-4"}
        previousLinkClassName={"mr-2 bg-blue-500 text-white p-2 rounded"}
        nextLinkClassName={"ml-2 bg-blue-500 text-white p-2 rounded"}
        disabledClassName={"opacity-50"}
        activeClassName={"font-bold"}
      />
    </div>
  );
}

export default TestimoniosAdmin;
