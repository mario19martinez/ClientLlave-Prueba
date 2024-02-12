import { useState } from 'react';
import axios from 'axios';

const CreateVideo = () => {
  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/video', {
        titulo,
        url,
        platform
      });

      setMensaje('El video ha sido creado correctamente');
      console.log(response.data); // Puedes mostrar la respuesta del servidor si lo deseas
    } catch (error) {
      console.error('Error al crear el video:', error);
      setMensaje('Hubo un error al crear el video');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Crear Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Título:</label>
          <input type="text" className="mt-1 p-2 w-full border rounded-md" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">URL:</label>
          <input type="text" className="mt-1 p-2 w-full border rounded-md" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Plataforma:</label>
          <input type="text" className="mt-1 p-2 w-full border rounded-md" value={platform} onChange={(e) => setPlatform(e.target.value)} />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Crear Video</button>
      </form>
      {mensaje && <p className="mt-4 text-center text-gray-700">{mensaje}</p>}
    </div>
  );
};

export default CreateVideo;
