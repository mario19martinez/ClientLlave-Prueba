import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createCurso } from "../../../Redux/features/courses/coursesSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function AgregarCurso({ closeModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nuevoCurso, setNuevoCurso] = useState({
    name: "",
    image: "",
    duracion: "",
    nivel: "",
    costo: "",
    horas_catedra: "",
    horario_clases: "",
    gratuito: "",
  });

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
  
    if (name === "gratuito") {
      const costoValue = checked ? "0.00" : "";
      setNuevoCurso({
        ...nuevoCurso,
        costo: costoValue,
        gratuito: checked,
      });
    } else {
      // Si el cambio no es para el interruptor gratuito, actualiza el estado normalmente
      if (name === "costo" && !checked) {
        // Si el costo se cambia y gratuito está desactivado, asegúrate de que gratuito sea falso
        setNuevoCurso({
          ...nuevoCurso,
          [name]: value,
          gratuito: false,
        });
      } else {
        setNuevoCurso({ ...nuevoCurso, [name]: value });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const costoValue = nuevoCurso.gratuito ? "0" : nuevoCurso.costo;
      const cursoConCosto = { ...nuevoCurso, costo: costoValue };

      await dispatch(createCurso(cursoConCosto));

      setNuevoCurso({
        name: "",
        image: "",
        duracion: "",
        nivel: "",
        costo: "",
        fechaInicio: "",
        fechaFinalizacion: "",
        horas_catedra: "",
        horario_clases: "",
        gratuito: "",
      });

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
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg overflow-auto"
      style={{ maxHeight: "80vh" }}
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Agregar Nuevo Curso
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1 mb-0">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-800"
            >
              Nombre
              <input
                type="text"
                id="name"
                name="name"
                value={nuevoCurso.name}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full text-sm text-gray-800"
              />
            </label>
          </div>

          <div className="flex-1 mb-0">
            <label
              htmlFor="duracion"
              className="block text-sm font-medium text-gray-800"
            >
              Duración
              <input
                type="text"
                id="duracion"
                name="duracion"
                value={nuevoCurso.duracion}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full text-sm text-gray-800"
              />
            </label>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 mb-0">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-800"
            >
              Imagen
              <input
                type="text"
                id="image"
                name="image"
                value={nuevoCurso.image}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full text-sm text-gray-800"
              />
            </label>
          </div>
          <div className="flex-1 mb-0">
            <label
              htmlFor="nivel"
              className="block text-sm font-medium text-gray-800"
            >
              Nivel
              <select
                id="nivel"
                name="nivel"
                value={nuevoCurso.nivel}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full text-sm text-gray-800"
              >
                <option value="">Seleccionar</option>
                <option value="1">Nivel I</option>
                <option value="2">Nivel II</option>
                <option value="3">Nivel III</option>
                <option value="4">Nivel IV</option>
                <option value="5">Especialización</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 mb-0">
            <label
              htmlFor="costo"
              className="block text-sm font-medium text-gray-800"
            >
              Costo
              <input
                type="text"
                id="costo"
                name="costo"
                value={nuevoCurso.costo}
                onChange={handleInputChange}
                disabled={nuevoCurso.gratuito}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full text-sm text-gray-800"
              />
            </label>
          </div>
          <div className="flex-1 mb-0">
            <label
              htmlFor="gratuito"
              className="block text-sm font-medium text-gray-800"
            >
              Gratuito
              <FormControlLabel
                control={<Switch name="gratuito" color="primary" />}
                onChange={handleInputChange}
                checked={nuevoCurso.gratuito}
              />
            </label>
          </div>
        </div>

        <div className="mb-1">
          <label
            htmlFor="horas_catedra"
            className="block text-sm font-medium text-gray-800"
          >
            Horas Cátedra
            <input
              type="text"
              id="horas_catedra"
              name="horas_catedra"
              value={nuevoCurso.horas_catedra}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full text-sm text-gray-800"
            />
          </label>
        </div>

        <div className="mb-1">
          <label
            htmlFor="horario_clases"
            className="block text-sm font-medium text-gray-800"
          >
            Horario Clases
            <ReactQuill
              theme="snow"
              value={nuevoCurso.horario_clases}
              onChange={(value) =>
                setNuevoCurso({ ...nuevoCurso, horario_clases: value })
              }
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" }, 
                  ],
                  ["clean"],
                  [{ align: [] }],
                  [{ color: [] }, { background: [] }],
                ],
              }}
              className="mt-1 bg-white text-sm text-gray-800"
            />
          </label>
        </div>

        <div className="flex space-x-4 ">
          <div className="flex-1 mb-0">
            <label
              htmlFor="fechaInicio"
              className="block text-sm font-medium text-gray-800"
            >
              Fecha Inicio
              <input
                type="date"
                id="fechaInicio"
                name="fechaInicio"
                value={nuevoCurso.fechaInicio}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full text-sm text-gray-800"
              />
            </label>
          </div>

          <div className="flex-1 mb-0">
            <label
              htmlFor="fechaFinalizacion"
              className="block text-sm font-medium text-gray-800"
            >
              Fecha Finalización
              <input
                type="date"
                id="fechaFinalizacion"
                name="fechaFinalizacion"
                value={nuevoCurso.fechaFinalizacion}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full text-sm text-gray-800"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-900 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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