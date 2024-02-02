// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CrearAbout = () => {
  const [titulo, setTitulo] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/about', {
        titulo,
        content,
      });
      console.log('Nuevo About creado:', response.data);
      setTitulo('');
      setContent('');
      toast.success('Agregando nuevo elemento a Nosotros...', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error('Hubo un error al crear el About:', error);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Link
        to="/Admin/Nosotros"
        className="inline-block mb-4 transition-colors duration-300 ease-in-out bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        &#8592; Volver
      </Link>
      <h1 className="text-3xl font-semibold mb-6">Crear Nuevo About</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="titulo" className="block mb-2 font-semibold">
            Título:
          </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 font-semibold">
            Contenido:
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(value) => setContent(value)}
            className="bg-white border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Crear Contenido
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CrearAbout;
