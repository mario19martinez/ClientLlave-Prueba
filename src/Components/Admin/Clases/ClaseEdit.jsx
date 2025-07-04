import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";

function ClaseEdit({ id, cursoId, closeModalAndReload }) {
  const [formData, setFormData] = useState({
    name: "",
    descripcion: "",
    url: "",
    platform: "",
    pdfURL: "",
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
          platform: clase.platform,
          pdfURL: clase.pdfURL || "",
        });
      } catch (error) {
        console.error("Error al obtener la clase:", error);
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
      await axios.put(`/cursos/${cursoId}/clases/${id}`, formData);
      toast.success("Clase editada con éxito", {
        position: "top-center",
        autoClose: 1500,
        closeOnClick: true,
        theme: "colored",
      });
      closeModalAndReload(); // Esto actualiza las clases sin recargar la página
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
            Descripción:
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
            Plataforma:
          </label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border-blue-500 border rounded focus:outline-none focus:border-blue-700 bg-blue-100 font-gabarito"
          >
            <option value="">Plataforma</option>
            <option value="vimeo">Vimeo</option>
            <option value="youtube">Youtube</option>
            <option value="pdf">Taller en PDF</option>
          </select>
        </div>
        {formData.platform === "pdf" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Enlace del Taller (PDF):
            </label>
            <input
              type="text"
              name="pdfURL"
              value={formData.pdfURL}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border-blue-500 border rounded focus:outline-none focus:border-blue-700 bg-blue-100 font-gabarito"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-white">
            URL del Video:
          </label>
          <input
            type="text"
            name="url"
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
      <ToastContainer />
    </div>
  );
}

ClaseEdit.propTypes = {
  id: PropTypes.number.isRequired,
  cursoId: PropTypes.number.isRequired,
  closeModalAndReload: PropTypes.func.isRequired,
};

export default ClaseEdit;
