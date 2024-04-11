// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurso } from "../../../Redux/features/courses/coursesSlice";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

function CursoEdit({ id, isOpen, closeModal }) {
  const dispatch = useDispatch();
  const cursoDetail = useSelector((state) => state.courses.cursoDetail);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    duracion: "",
    nivel: "",
    costo: "",
    horas_catedra: "",
    horario_clases: "",
    fechaInicio: "",
    fechaFinalizacion: "",
  });

  useEffect(() => {
    if (cursoDetail.id) {
      setFormData(cursoDetail);
    }
  }, [cursoDetail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (id) {
      dispatch(updateCurso({ id, cursoData: formData }))
        .unwrap()
        .then(() => {
          alert("Curso actualizado con éxito");
          closeModal();
        })
        .catch((error) => {
          console.error("Error al actualizar el curso:", error);
        });
    }
  };

  // Establecer estilo base para Modal con Tailwind CSS
  Modal.setAppElement("#root");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxHeight: "90vh", // Limitar la altura máxima
      overflowY: "auto", // Habilitar desplazamiento vertical si es necesario
      width: "90%", // Ajustar ancho del modal al 90% del ancho de la ventana
      maxWidth: "500px", // Máximo ancho del modal
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)", // Fondo oscuro semitransparente
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div className="bg-white p-6 rounded shadow-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 text-gray-600 hover:text-gray-800 m-2"
        >
          <CloseIcon />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Editar Curso
        </h2>
        <form className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800">
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800">
              Imagen:
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800">
              Duración:
            </label>
            <input
              type="text"
              name="duracion"
              value={formData.duracion}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800">
              Nivel:
            </label>
            <input
              type="text"
              name="nivel"
              value={formData.nivel}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800">
              Costo:
            </label>
            <input
              type="text"
              name="costo"
              value={formData.costo}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800">
              Horas Cátedra:
            </label>
            <input
              type="text"
              name="horas_catedra"
              value={formData.horas_catedra}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800">
              Horario Clases:
            </label>
            <input
              type="text"
              name="horario_clases"
              value={formData.horario_clases}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800">
              Fecha Inicio:
            </label>
            <input
              type="date"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800">
              Fecha Finalización:
            </label>
            <input
              type="date"
              name="fechaFinalizacion"
              value={formData.fechaFinalizacion}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </Modal>
  );
}

CursoEdit.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default CursoEdit;
