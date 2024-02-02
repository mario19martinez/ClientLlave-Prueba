import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

function AgregarClases({ onAgregarClase }) {
  const [claseData, setClaseData] = useState({
    name: "",
    descripcion: "",
    url: "",
    platform: "",
    pdfFile: null,
  });
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const { id } = useParams();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setClaseData({
      ...claseData,
      pdfFile: selectedFile,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "url") {
      const vimeoRegex = /vimeo\.com/;
      const youtubeRegex = /youtube\.com/;

      if (vimeoRegex.test(value)) {
        setClaseData({ ...claseData, [name]: value, platform: "vimeo" });
        setSelectedPlatform("vimeo");
      } else if (youtubeRegex.test(value)) {
        setClaseData({ ...claseData, [name]: value, platform: "youtube" });
        setSelectedPlatform("youtube");
      } else {
        setClaseData({
          ...claseData,
          [name]: value,
          platform: "",
        });
        setSelectedPlatform("");
      }
    } else {
      setClaseData({ ...claseData, [name]: value });
      setSelectedPlatform("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", claseData.name);
    formData.append("descripcion", claseData.descripcion);
    formData.append("url", claseData.url);
    formData.append("platform", selectedPlatform);
    formData.append("pdfFile", claseData.pdfFile);

    try {
      await axios.post(`/cursos/${id}/clases`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onAgregarClase();
      toast.success("Clase agregada con éxito");
      window.location.reload();
    } catch (error) {
      console.error("Error al agregar la clase:", error);
      toast.warning(
        "Error al agregar la clase. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 w-96 bg-blue-600 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow-md z-50">
      <h2 className="text-2xl font-gabarito mb-4 text-white">
        Agregar Nueva Clase
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md"
        encType="multipart/form-data"
      >
        <div className="mb-4">
          <label htmlFor="" className="block text-sm font-medium text-white">
            Nombre de la Clase
          </label>
          <input
            type="text"
            name="name"
            value={claseData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="" className="block text-sm font-medium text-white">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={claseData.descripcion}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="" className="block text-sm font-medium text-white">
            Plataforma
          </label>
          <select
            name="platform"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="">Plataforma</option>
            <option value="vimeo">Vimeo</option>
            <option value="youtube">Youtube</option>
            <option value="pdf">Taller en PDF</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="" className="block text-sm font-medium text-white">
            URL de la Clase (Vimeo)
          </label>
          <input
            type="text"
            name="url"
            value={claseData.url}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="" className="block text-sm font-medium text-white">
            Archivo PDF
          </label>
          <input
            type="file"
            name="pdfFile"
            onChange={handleFileChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            accept=".pdf"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-400 font-gabarito text-lg"
        >
          Agregar Clase
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

AgregarClases.propTypes = {
  //id: PropTypes.number.isRequired,
  onAgregarClase: PropTypes.func.isRequired,
};

export default AgregarClases;
