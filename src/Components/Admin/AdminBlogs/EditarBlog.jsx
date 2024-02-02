// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditarBlog = ({ blogId }) => {
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    imageUrl: '',
    embeddedElement: '',
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/blogs/${blogId}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Hubo un error al obtener el blog:', error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleInputChange = (name, value) => {
    setBlog({ ...blog, [name]: value });
  };

  const handleUpdateBlog = async () => {
    try {
      await axios.put(`/blogs/${blogId}`, blog);
      alert('El blog se ha actualizado correctamente');
    } catch (error) {
      console.error('Hubo un error al actualizar el blog:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-blue-500 text-black rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Editar Blog</h2>
      <div className="mb-4">
        <label className="block mb-1">Título:</label>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Contenido:</label>
        <ReactQuill
          value={blog.content}
          onChange={(value) => handleInputChange('content', value)}
          className="rounded-md bg-white text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">URL de la imagen:</label>
        <input
          type="text"
          name="imageUrl"
          value={blog.imageUrl}
          onChange={(e) => handleInputChange('imageUrl', e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Elemento incrustado:</label>
        <textarea
          name="embeddedElement"
          value={blog.embeddedElement}
          onChange={(e) => handleInputChange('embeddedElement', e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          rows="3"
        />
      </div>
      <button
        onClick={handleUpdateBlog}
        className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-blue-100 focus:outline-none"
      >
        Actualizar Blog
      </button>
    </div>
  );
};

EditarBlog.propTypes = {
  blogId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default EditarBlog;