import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NivelCreate() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [duracion, setDuracion] = useState("");
    const [description, setDescription] = useState("");
    const [costo, setCosto] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("/nivel", {
          name,
          image,
          duracion,
          description,
          costo,
        });
  
        setSuccessMessage("El Nivel se creo exitosamente.");
        setName("");
        setImage("");
        setDuracion("");
        setDescription("");
        setCosto("");
        console.log("Nuevo Nivel creado:", response.data);
        setTimeout(() => {
          navigate("/niveladmin");
        }, 1000);
      } catch (error) {
        setError("Se progujo un error al crear el nivel.");
        console.error("Error al crear el nivel:", error);
      }
    };
  
    return (
      <div className=" min-h-screen flex items-center justify-center">
        <div className="p-8 bg-blue-600 shadow rounded-md w-full">
          <h2 className="text-lg font-bold mb-2 text-gray-100">Crear Nuevo Nivel</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {successMessage && (
            <div className="text-green-500 mb-4">{successMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="name" className="block font-semibold mb-0 text-gray-100">
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md bg-gray-100 p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="image" className="block font-semibold mb-0 text-gray-100">
                Imagen URL:
              </label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border border-gray-300 rounded-md bg-gray-100 p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="duracion" className="block font-semibold mb-0 text-gray-100">
                Duración:
              </label>
              <input
                type="text"
                id="duracion"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                className="border border-gray-300 rounded-md bg-gray-100 p-2 w-full"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="description" className="block font-semibold mb-0 text-gray-100">
                Descripción:
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md bg-gray-100 p-2 w-full"
              ></textarea>
            </div>
            <div className="mb-2">
              <label htmlFor="costo" className="block font-semibold mb-0 text-gray-100">
                Costo:
              </label>
              <input
                type="text"
                id="costo"
                value={costo}
                onChange={(e) => setCosto(e.target.value)}
                className="border border-gray-500 focus:border-blue-800 rounded-md bg-gray-100 p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-400 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Crear Nivel
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  export default NivelCreate;