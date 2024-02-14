import { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="flex flex-wrap justify-center">
      <div className="w-64 h-60 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-700 shadow-md rounded-md overflow-hidden border-solid border-2 border-blue-500">
        {noticias.length === 0 && <div className="text-white p-4">No hay noticias disponibles.</div>}
        {noticias.map((noticia) => (
          <div
            key={noticia.id}
            onClick={() => handleNoticiaClick(noticia.id)}
            className="shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:shadow-lg transition duration-300 bg-gray-200"
          >
            <h2 className="text-lg font-semibold mb-2 text-gray-800">{noticia.titulo}</h2>
            <p className="text-gray-700">{noticia.contenido}</p>
          </div>
        ))}
        {selectedNoticia && (
          <div className="shadow-md rounded-lg p-4 mb-4 bg-gray-200">
            <h2 className="text-lg font-semibold mb-2">{selectedNoticia.titulo}</h2>
            <p className="text-gray-700">{selectedNoticia.contenido}</p>
            <p className="text-gray-700">Fecha: {selectedNoticia.fecha}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Noticias;