import { useState, useEffect } from "react";
import axios from "axios"; // Asegúrate de tener axios instalado en tu proyecto

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [selectedNoticia, setSelectedNoticia] = useState(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get("/noticias");
        setNoticias(response.data);
      } catch (error) {
        console.error("Error al obtener las noticias:", error);
      }
    };

    fetchNoticias();
  }, []);

  const handleNoticiaClick = async (noticiaId) => {
    try {
      const response = await axios.get(`/noticias/${noticiaId}`);
      setSelectedNoticia(response.data);
    } catch (error) {
      console.error("Error al obtener la noticia:", error);
    }
  };

  return (
    <div className="w-64 h-60 bg-gradient-to-br from-blue-400 via-blue-700 to-blue-400 shadow-md rounded-md overflow-hidden border-solid border-2 border-blue-500">
      {/* <h1 className="text-2xl font-bold mb-4">Noticias</h1> */}
      {noticias.length === 0 && <div className="text-white">No hay noticias disponibles.</div>}
      {noticias.map((noticia) => (
        <div
          key={noticia.id}
          onClick={() => handleNoticiaClick(noticia.id)}
          className=" shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:shadow-lg transition duration-300"
        >
          <h2 className="text-lg font-semibold mb-2 text-white">{noticia.titulo}</h2>
          <p className="text-white">{noticia.contenido}</p>
        </div>
      ))}
      {selectedNoticia && (
        <div className=" shadow-md rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">{selectedNoticia.titulo}</h2>
          <p className="text-gray-600">{selectedNoticia.contenido}</p>
          <p className="text-gray-600">Fecha: {selectedNoticia.fecha}</p>
        </div>
      )}
    </div>
  );
};

export default Noticias;
