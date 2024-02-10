import { useState } from "react";
import axios from "axios"; // Asegúrate de tener axios instalado en tu proyecto

const CreateNoticias = () => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [fecha, setFecha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envía la solicitud para crear la noticia al servidor
      const response = await axios.post("/noticias", {
        titulo,
        contenido,
        fecha,
      });

      // Muestra un mensaje de éxito o redirige a otra página
      console.log("Noticia creada con éxito:", response.data);
      // Redirigir a otra página, si es necesario
    } catch (error) {
      console.error("Error al crear la noticia:", error);
      // Muestra un mensaje de error al usuario
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Noticia</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titulo" className="block font-semibold mb-1">
            Título:
          </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="contenido" className="block font-semibold mb-1">
            Contenido:
          </label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="fecha" className="block font-semibold mb-1">
            Fecha:
          </label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Crear Noticia
        </button>
      </form>
    </div>
  );
};

export default CreateNoticias;
