import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const EditarBlogEditor = ({ blogId }) => {
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    imageUrl: "",
    embeddedElement: "",
    estado: "borrador", 
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

  // Función para observar cambios en el DOM
  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          // Manejar cambios en el DOM aquí si es necesario
        }
      }
    });

    // Observar cambios en el nodo específico
    observer.observe(document.getElementById('editor-container'), {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleImageBlur = async (e) => {
    const imageUrl = e.target.value;
    setBlog({ ...blog, imageUrl });
  };

  const handleInputChange = (name, value) => {
    setBlog({ ...blog, [name]: value });
  };

  const handleUpdateBlog = async () => {
    try {
      await axios.put(`/blogs/${blogId}`, blog);
      alert("El blog se ha actualizado correctamente");
    } catch (error) {
      console.error("Hubo un error al actualizar el blog:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/Editor/Blogs");
  };

  return (
    <div id="editor-container" className="max-w-2xl mx-auto p-6 bg-gray-100 text-black rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Editar Blog</h2>
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
          className="rounded-md bg-white text-black"
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              [
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
              ],
              [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
              ["link", "image", "video"],
              ["clean"],
              [{ align: [] }],
              [{ color: [] }, { background: [] }],
            ],
          }}
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
      <div className="flex justify-between">
        <button
          onClick={handleGoBack}
          className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 focus:outline-none"
        >
          Atrás
        </button>
        <button
          onClick={handleUpdateBlog}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Actualizar Blog
        </button>
      </div>
    </div>
  );
};

EditarBlogEditor.propTypes = {
  blogId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default EditarBlogEditor;