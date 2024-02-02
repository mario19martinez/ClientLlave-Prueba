import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function ClaseEdit({ id, cursoId, }) {
  const [formData, setFormData] = useState({
    name: "",
    descripcion: "",
    url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/cursos/${cursoId}/clases/${id}`);
        const clase = response.data;
        setFormData({
          name: clase.name,
          descripcion: clase.descripcion,
          url: clase.url,
        });
        //window.location.reload();
      } catch (error) {
        console.error("Error al obtener el curso:", error);
      }
    };
    fetchData();
  }, [id, cursoId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/cursos/${cursoId}/clases/${id}`, {
        name: formData.name,
        descripcion: formData.descripcion,
        url: formData.url,
      });
      alert("Clase actualizada con éxito");
    } catch (error) {
      console.log("Error al actualizar la clase:", error);
    }
  };

  return (
    
      <div className="max-w-md mx-auto mt-8 p-6 bg-blue-600 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-white translate-x-2">
          Editar Clase
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-blue-500 border rounded focus:outline-none focus:border-blue-700 bg-blue-100 font-gabarito"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Nombre:
            </label>
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-blue-500 border rounded focus:outline-none focus:border-blue-700 bg-blue-100 font-gabarito"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              videoURL:
            </label>
            <input
              type="text"
              name="text"
              value={formData.url}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-blue-500 border rounded focus:outline-none focus:border-blue-700 bg-blue-100 font-gabarito"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    
  );
}

ClaseEdit.propTypes = {
  id: PropTypes.number.isRequired,
  cursoId: PropTypes.number.isRequired,
};

export default ClaseEdit;
