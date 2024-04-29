import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditarBlog = ({ blogId }) => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    imageUrl: "",
    embeddedElement: "",
    estado: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/blogs/${blogId}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Hubo un error al obtener el blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleInputChange = (name, value) => {
    setBlog({ ...blog, [name]: value });
  };

  const handleRechazar = () => {
    setBlog(prevBlog => ({ ...prevBlog, estado: "rechazado" }));
  };
  
  const handleGuardarBorrador = () => {
    setBlog(prevBlog => ({ ...prevBlog, estado: "borrador" }));
  };
  
  const handlePublicarBlog = () => {
    setBlog(prevBlog => ({ ...prevBlog, estado: "publicado" }));
  };
  
  useEffect(() => {
    const handleUpdateBlog = async () => {
      try {
        await axios.put(`/blogs/${blogId}`, blog);
        alert("El blog se ha actualizado correctamente");
      } catch (error) {
        console.error("Hubo un error al actualizar el blog:", error);
      }
    };
  
    if (blog.estado !== "") {
      handleUpdateBlog();
    }
  }, [blog.estado, blogId, blog]);

  const handleImageBlur = async (e) => {
    const imageUrl = e.target.value;
    setBlog({ ...blog, imageUrl });
  };

  return (
    <div className="container mx-auto p-6 bg-white text-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Editar Blog</h2>
      <div className="mb-4">
        <label className="block mb-1">Título:</label>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">URL de la imagen:</label>
        <input
          type="text"
          name="imageUrl"
          value={blog.imageUrl}
          onChange={(e) => handleInputChange("imageUrl", e.target.value)}
          onBlur={handleImageBlur}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
        {blog.imageUrl && (
          <div className="mt-2">
            <p className="block mb-1">Miniatura de la imagen:</p>
            <img
              src={blog.imageUrl}
              alt="Miniatura de la imagen"
              className="w-32 h-32 object-cover border border-gray-300"
            />
          </div>
        )}
        {!blog.imageUrl && (
          <p className="text-gray-500">No hay imagen disponible</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1">Contenido:</label>
        <ReactQuill
          value={blog.content}
          onChange={(value) => handleInputChange("content", value)}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image", "video"],
              ["clean"],
              [{ align: [] }],
              [{ color: [] }, { background: [] }], // Cambio de color de texto y fondo
            ],
          }}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 bg-white"
          style={{ minHeight: "200px" }}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Elemento incrustado:</label>
        <textarea
          name="embeddedElement"
          value={blog.embeddedElement}
          onChange={(e) => handleInputChange("embeddedElement", e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          rows="3"
        />
      </div>

      <div className="flex justify-center mb-4">
        <p className="mr-2">Estado:</p>
        <p className="font-semibold">{blog.estado}</p>
      </div>

      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={handleRechazar}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
        >
          Rechazar
        </button>

        <button
          onClick={handleGuardarBorrador}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
        >
          Guardar Borrador
        </button>

        <button
          onClick={handlePublicarBlog}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Publicar Blog
        </button>
      </div>
    </div>
  );
};

EditarBlog.propTypes = {
  blogId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default EditarBlog;