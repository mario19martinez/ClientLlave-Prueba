// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createCurso } from "../../../Redux/features/courses/coursesSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AgregarCurso({ closeModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const [modalVisible, setModalVisible] = useState(false)
  const [nuevoCurso, setNuevoCurso] = useState({
    name: "",
    image: "",
    duracion: "",
    nivel: "",
    costo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCurso({ ...nuevoCurso, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(createCurso(nuevoCurso));

      // Limpiar el formulario después de agregar el curso
      setNuevoCurso({
        name: "",
        image: "",
        duracion: "",
        nivel: "",
        costo: "",
        fechaInicio: "",
        fechaFinalizacion: "",
      });

      // Mostrar mensaje de éxito
      toast.success("Curso agregado exitosamente!", {
        position: "top-center",
        autoClose: 1500,
        closeOnClick: true,
        theme: "colored",
      });
      setTimeout(() => {
        closeModal();
        navigate("/admin/cursos");
      }, 2000);
    } catch (error) {
      // Mostrar mensaje de error si no se pueden agregar los datos
      toast.error("Error al agregar el curso", {
        position: "top-center",
        autoClose: 3500,
        closeOnClick: true,
        theme: "colored",
      });

      console.error("Error al agregar el curso:", error);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 w-96 bg-blue-200 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow-md z-50">
      <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Curso</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Nombre
            <input
              type="text"
              id="name"
              name="name"
              value={nuevoCurso.name}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded focus:outline-none focus:border-blue-500 w-full"
            />
          </label>
        </div>

        <div className="mb-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Imagen
            <input
              type="text"
              id="image"
              name="image"
              value={nuevoCurso.image}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded focus:outline-none focus:border-blue-500 w-full"
            />
          </label>
        </div>

        <div className="mb-2">
          <label
            htmlFor="duracion"
            className="block text-sm font-medium text-gray-600"
          >
            Duración
            <input
              type="text"
              id="duracion"
              name="duracion"
              value={nuevoCurso.duracion}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded focus:outline-none focus:border-blue-500 w-full"
            />
          </label>
        </div>

        <div className="mb-2">
          <label
            htmlFor="nivel"
            className="block text-sm font-medium text-gray-600"
          >
            Nivel
            <select
              id="nivel"
              name="nivel"
              value={nuevoCurso.nivel}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded focus:outline-none focus:border-blue-500 w-full"
            >
              <option value="">Seleccionar</option>
              <option value="1">Nivel 1</option>
              <option value="2">Nivel 2</option>
              <option value="3">Nivel 3</option>
              <option value="4">Nivel 4</option>
              <option value="5">Especialización</option>
            </select>
          </label>
        </div>

        <div className="mb-2">
          <label
            htmlFor="costo"
            className="block text-sm font-medium text-gray-600"
          >
            Costo
            <input
              type="text"
              id="costo"
              name="costo"
              value={nuevoCurso.costo}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded focus:outline-none focus:border-blue-500 w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label
            htmlFor="fechaInicio"
            className="block text-sm font-medium text-gray-600"
          >
            Fecha Inicio
            <input
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              value={nuevoCurso.fechaInicio}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded focus:outline-none focus:border-blue-500 w-full"
            />
          </label>
        </div>
        <div className="mb-2">
          <label
            htmlFor="fechaFinalizacion"
            className="block text-sm font-medium text-gray-600"
          >
            Fecha Finalizacion
            <input
              type="date"
              id="fechaFinalizacion"
              name="fechaFinalizacion"
              value={nuevoCurso.fechaFinalizacion}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded focus:outline-none focus:border-blue-500 w-full"
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Agregar Curso
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

AgregarCurso.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default AgregarCurso;
