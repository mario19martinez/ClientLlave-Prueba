import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CrearTestimonios({ isOpen, onRequestClose }) {
  const [video, setVideo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar la solicitud para crear un nuevo testimonio
      const response = await axios.post("/testimonio", {
        video,
        descripcion,
      });

      // Manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
      console.log("Testimonio creado exitosamente:", response.data);
      onRequestClose();
      navigate('/admin/testimonios')

      // Puedes redirigir al usuario o realizar otras acciones después de crear el testimonio
    } catch (error) {
      console.error("Error al crear testimonio", error);
      setError("Error al crear testimonio. Verifica los datos e inténtalo de nuevo.");
      // Puedes mostrar un mensaje de error al usuario
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Agregar Testimonio"
      className="modal"
    >
      <div className="container mx-auto my-8 translate-y-10">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-10 rounded shadow-md bg-blue-500">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="mb-4">
            <label
              htmlFor="video"
              className="block text-gray-700 font-bold mb-2"
            >
              URL del video de YouTube:
            </label>
            <input
              type="text"
              id="video"
              className="w-full p-2 border rounded"
              placeholder="Ej. https://www.youtube.com/watch?v=VIDEO_ID"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="descripcion"
              className="block text-gray-700 font-bold mb-2"
            >
              Descripción:
            </label>
            <textarea
              id="descripcion"
              className="w-full p-2 border rounded"
              placeholder="Escribe tu testimonio..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white p-2 rounded hover:bg-blue-900 focus:outline-none focus:shadow-outline-blue font-semibold text-xl"
          >
            Crear Testimonio
          </button>
        </form>
      </div>
    </Modal>
  );
}

CrearTestimonios.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default CrearTestimonios;
