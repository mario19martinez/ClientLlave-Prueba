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
      await axios.post('/video', {
        titulo,
        url,
        platform
      });

      setMensaje('El video ha sido creado correctamente');
      setTimeout(() => {
        window.location.reload();
      }, 1200)
    } catch (error) {
      console.error('Error al crear el video:', error);
      setMensaje('Hubo un error al crear el video');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-blue-500 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-white">Crear Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white font-semibold">Título:</label>
          <input type="text" className="mt-1 p-2 w-full border rounded-md" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-white font-semibold">URL:</label>
          <input type="text" className="mt-1 p-2 w-full border rounded-md" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-white font-semibold">Plataforma:</label>
          <input type="text" className="mt-1 p-2 w-full border rounded-md" value={platform} onChange={(e) => setPlatform(e.target.value)} />
        </div>
        <button type="submit" className="bg-blue-800 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">Crear Video</button>
      </form>
      {mensaje && <p className="mt-4 text-center text-green-600 font-bold bg-white">{mensaje}</p>}
    </div>
  );
};

export default CreateVideo;
