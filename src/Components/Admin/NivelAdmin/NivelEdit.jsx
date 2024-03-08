import { useState, useEffect } from "react";
import axios from "axios";

function NivelEdit({ id }) {
  const [nivelData, setNivelData] = useState({
    name: "",
    image: "",
    certificacion: "",
    duracion: "",
    description: "",
    costo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNivelData = async () => {
      try {
        const response = await axios.get(`/nivel/${id}`);
        setNivelData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener la información del nivel:", error);
        setError("Error al obtener la información del nivel.");
        setLoading(false);
      }
    };

    fetchNivelData();
  }, [id]);

  const handleChange = (e) => {
    setNivelData({ ...nivelData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/nivel/${id}`, nivelData);
      alert("La información del nivel ha sido actualizada correctamente.");
    } catch (error) {
      console.error("Error al actualizar la información del nivel:", error);
      alert(
        "Error al actualizar la información del nivel. Por favor, inténtalo de nuevo."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-xl font-semibold text-gray-900">
          Cargando...
        </span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=" min-h-screen flex items-center justify-center">
        <div className="p-4 bg-blue-600 shadow rounded-md w-full -translate-y-4">
      <h2 className="text-lg font-bold mb-0 text-gray-100">
        Editar Nivel
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label
            htmlFor="name"
            className="block font-semibold mb-0 text-gray-100"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={nivelData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md bg-gray-100 p-2 w-full"
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="image"
            className="block font-semibold mb-0 text-gray-100"
          >
            Imagen:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={nivelData.image}
            onChange={handleChange}
            className="border border-gray-300 rounded-md bg-gray-100 p-2 w-full"
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="certificacion"
            className="block font-semibold mb-0 text-gray-100"
          >
            Certificación:
          </label>
          <input
            type="text"
            id="certificacion"
            name="certificacion"
            value={nivelData.certificacion}
            onChange={handleChange}
            className="border border-gray-300 rounded-md bg-gray-100 p-2 w-full"
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="duracion"
            className="block font-semibold mb-0 text-gray-100"
          >
            Duración:
          </label>
          <input
            type="text"
            id="duracion"
            name="duracion"
            value={nivelData.duracion}
            onChange={handleChange}
            className="border border-gray-300 rounded-md bg-gray-100 p-2 w-full"
          />
        </div>
        <div className="mb-1">
          <label
            htmlFor="description"
            className="block font-semibold mb-0 text-gray-100"
          >
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            value={nivelData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md bg-gray-100 p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="costo"
            className="block font-semibold mb-0 text-gray-100"
          >
            Costo:
          </label>
          <input
            type="text"
            id="costo"
            name="costo"
            value={nivelData.costo}
            onChange={handleChange}
            className="border border-gray-300 rounded-md bg-gray-100 p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Guardar Cambios
        </button>
      </form>
      </div>
    </div>
  );
}

export default NivelEdit;
