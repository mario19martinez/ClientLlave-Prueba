import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import UploadWidget from '../../UploadWidget/UploadWidget';

function NivelCreate({ closeModalAndReload }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [duracion, setDuracion] = useState("");
  const [description, setDescription] = useState("");
  const [costo, setCosto] = useState("");
  const [grupoWhatsApp, setGrupoWhatsApp] = useState("");
  const [numero, setNumero] = useState("");
  const [premium, setPremium] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/nivel", {
        name,
        image,
        duracion,
        description,
        costo,
        grupoWhatsApp,
        numero,
        premium: premium.toString() === "true",
      });

      setSuccessMessage("El Nivel se creó exitosamente.", response.data);
      setName("");
      setImage("");
      setDuracion("");
      setDescription("");
      setCosto("");
      setGrupoWhatsApp("");
      setNumero("");
      setPremium(false);
      toast.success("Nivel creado exitosamente!", {
        position: "top-center",
        autoClose: 1500,
        closeOnClick: true,
        theme: "colored",
      });

      setTimeout(() => {
        closeModalAndReload();
      }, 1800);
    } catch (error) {
      setError("Se produjo un error al crear el nivel.");
      console.error("Error al crear el nivel:", error);
    }
  };

  return (
    <div className="p-4 max-h-full overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4 text-blue-800">
          Crear Nuevo Nivel
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block font-semibold mb-1 text-gray-700"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md bg-gray-50 p-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block font-semibold mb-1 text-gray-700"
            >
              Imagen:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border border-gray-300 rounded-md bg-gray-50 p-2 flex-grow"
              />
              <UploadWidget onImageUpload={(url) => setImage(url)} />
            </div>
          </div>
          <div>
            <label
              htmlFor="duracion"
              className="block font-semibold mb-1 text-gray-700"
            >
              Duración:
            </label>
            <input
              type="text"
              id="duracion"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              className="border border-gray-300 rounded-md bg-gray-50 p-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block font-semibold mb-1 text-gray-700"
            >
              Descripción:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md bg-gray-50 p-2 w-full"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="costo"
              className="block font-semibold mb-1 text-gray-700"
            >
              Costo:
            </label>
            <input
              type="text"
              id="costo"
              value={costo}
              onChange={(e) => setCosto(e.target.value)}
              className="border border-gray-300 rounded-md bg-gray-50 p-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="grupoWhatsApp"
              className="block font-semibold mb-1 text-gray-700"
            >
              Grupo de WhatsApp:
            </label>
            <input
              type="text"
              id="grupoWhatsApp"
              value={grupoWhatsApp}
              onChange={(e) => setGrupoWhatsApp(e.target.value)}
              className="border border-gray-300 rounded-md bg-gray-50 p-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="numero"
              className="block font-semibold mb-1 text-gray-700"
            >
              Nivel:
            </label>
            <input
              type="number"
              id="numero"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              className="border border-gray-300 rounded-md bg-gray-50 p-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="premium"
              className="block font-semibold mb-1 text-gray-700"
            >
              Premium:
            </label>
            <select
              id="premium"
              value={premium.toString()}
              onChange={(e) => setPremium(e.target.value === "true")}
              className="border border-gray-300 rounded-md bg-gray-50 p-2 w-full"
            >
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 w-full"
          >
            Crear Nivel
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

NivelCreate.propTypes = {
  closeModalAndReload: PropTypes.func.isRequired,
};

export default NivelCreate;