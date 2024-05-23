import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";

function GrupoCreate({ closeModalAndReload }) {
  const [name, setName] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/nivel/${id}/grupo`, {
        name,
        image,
        descripcion,
      });
      toast.success("Grupo creado exitosamente!", {
        position: "top-center",
        autoClose: 1500,
        closeOnClick: true,
        theme: "colored",
      });

      setTimeout(() => {
        closeModalAndReload();
      }, 1800);
    } catch (error) {
      setError(error.response.data.error);
      console.error("ha ocurrido un error:", error);
    }
  };

  return (
    <div className="w-96 mx-auto my-8 p-8 bg-blue-600 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Crear Grupo</h2>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2 text-white">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full font-medium text-gray-800 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block font-medium mb-2 text-white">
            Image URL:
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full font-medium text-gray-800 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="descripcion"
            className="block font-medium mb-2 text-white"
          >
            Descripcion (Opcional):
          </label>
          <textarea
            id="descripcion"
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full font-medium text-gray-800 border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-900 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Crear Grupo
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

GrupoCreate.propTypes = {
  closeModalAndReload: PropTypes.func.isRequired,
};

export default GrupoCreate;
