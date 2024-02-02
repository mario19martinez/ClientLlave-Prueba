// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function EditarTestimonio({ testimonioId }) {
  const [testimonio, setTestimonio] = useState({});
  const [video, setVideo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  console.log(testimonio);

  useEffect(() => {
    const fetchTestimonio = async () => {
      try {
        const response = await axios.get(`/testimonios/${testimonioId}`);
        setTestimonio(response.data);
        setVideo(response.data.video);
        setDescripcion(response.data.descripcion);
      } catch (error) {
        console.error("Error al obtener el testimonio", error);
      }
    };

    fetchTestimonio();
  }, [testimonioId]);

  const handleEditarTestimonio = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/testimonios/${testimonioId}`, {
        video,
        descripcion,
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        window.location.reload(); // Esto puede ser reemplazado por tu lógica de redireccionamiento
      }, 3000); // Tiempo en milisegundos para mostrar la alerta
    } catch (error) {
      console.error("Error al editar el testimonio", error);
    }
  };

  return (
    <div className="bg-blue-500 p-8 rounded-lg w-96">
      <h2 className="text-2xl font-bold mb-4 text-white">Editar Testimonio</h2>
      {showAlert && (
        <div className="mb-4">
          <p className="text-white">Testimonio actualizado con éxito</p>
        </div>
      )}
      <form onSubmit={handleEditarTestimonio}>
        <div className="mb-4">
          <label className="block mb-2 text-white">URL del video:</label>
          <input
            type="text"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            className="border rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white">Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border rounded-md py-2 px-3 w-full h-32"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-white text-blue-500 py-2 px-4 rounded-md hover:bg-blue-700 hover:text-white transition duration-300"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

EditarTestimonio.propTypes = {
  testimonioId: PropTypes.number.isRequired,
};

export default EditarTestimonio;