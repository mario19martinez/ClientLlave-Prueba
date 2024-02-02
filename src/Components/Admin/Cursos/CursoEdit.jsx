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
  });

  useEffect(() => {
    if (cursoDetail.id) {
      setFormData({
        name: cursoDetail.name,
        image: cursoDetail.image,
        duracion: cursoDetail.duracion,
        nivel: cursoDetail.nivel,
        costo: cursoDetail.costo,
      });
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
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error al actualizar el curso:", error);
        });
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} className="modal-style">
      <div className="max-w-md mx-auto mt-8 p-6 bg-blue-600 rounded shadow-lg">
        <div>
          <button
            onClick={closeModal}
            className="text-white font-bold py-2 px-2 -translate-x-6 -translate-y-6"
          >
            <CloseIcon fontSize="medium" className="bg-gray-400 hover:bg-blue-900" />
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-white translate-y-2">
          Editar Curso
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Nombre:{" "}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Imagen:{" "}
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
            <label className="block text-sm font-medium text-white">
              Duración:{" "}
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
            <label className="block text-sm font-medium text-white">
              Nivel:{" "}
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
            <label className="block text-sm font-medium text-white">
              Costo:{" "}
            </label>
            <input
              type="text"
              name="costo"
              value={formData.costo}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </Modal>
  );
}

CursoEdit.propTypes = {
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default CursoEdit;