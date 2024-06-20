import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavAdmin from "../NavAdmin/NavAdmin";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ClaseModuloCreate() {
  const { nivelId, moduloId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    pdfURL: "",
    texto: "",
    resumen: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextoChange = (value) => {
    setFormData({ ...formData, texto: value });
  };

  const handlePdfChange = (value) => {
    setFormData({ ...formData, pdfURL: value});
  }

  const handleResumenChange = (value) => {
    setFormData({ ...formData, resumen: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`nivel/${nivelId}/modulo/${moduloId}/clase`, formData);
      setFormData({
        name: "",
        url: "",
        pdfURL: "",
        texto: "",
        resumen: "",
      });
      toast.success("Clase creada exitosamente!", {
        position: "top-center",
        autoClose: 1500,
        closeOnClick: true,
        theme: "colored",
      });
      setTimeout(() => {
        window.history.back();
      }, 1800);
    } catch (error) {
      console.error("Error al crear la clase:", error);
      setError("Hubo un error al crear la clase");
    } finally {
      setLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      ["clean"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
    ],
  };

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <div className="container mx-auto mt-4 p-4 w-1/2 -translate-x-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-700 translate-x-20">
            Agregar Clase
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto p-4 rounded-lg shadow-lg bg-gray-200"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombre:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-2 border-blue-600 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="url"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                URL:
              </label>
              <input
                type="text"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="border-2 border-blue-600 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="pdfURL"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Materias de apoyo (sera un archivo descargable):
              </label>
              <ReactQuill
                id="texto"
                value={formData.pdfURL}
                onChange={handlePdfChange}
                modules={quillModules}
                className="border-2 border-blue-600 rounded-md focus:border-blue-500 bg-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="texto"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Texto:
              </label>
              <ReactQuill
                id="texto"
                value={formData.texto}
                onChange={handleTextoChange}
                modules={quillModules}
                className="border-2 border-blue-600 rounded-md focus:border-blue-500 bg-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="resumen"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Resumen:
              </label>
              <ReactQuill
                id="resumen"
                value={formData.resumen}
                onChange={handleResumenChange}
                modules={quillModules}
                className="border-2 border-blue-600 rounded-md focus:border-blue-500 bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? "Creando..." : "Crear Clase"}
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default ClaseModuloCreate;
