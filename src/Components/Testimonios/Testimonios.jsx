import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';

function Testimonios() {
  const [testimonios, setTestimonios] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/testimonios");
        const sortedTestimonios = response.data.testimonios.sort((a, b) => b.id - a.id);
        const lastFourTestimonios = sortedTestimonios.slice(0, 4);
        setTestimonios(lastFourTestimonios);
      } catch (error) {
        console.error("Error al obtener testimonios", error);
      } finally {
        setLoading(false)
      }
    };
    fetchTestimonios();
  }, []);

  const handleCardClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const testimonioItems =
    testimonios.length > 0 &&
    testimonios.map((testimonio) => (
      <div
        key={testimonio.id}
        className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 cursor-pointer"
        onClick={() => handleCardClick(testimonio.video)}
      >
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          {testimonio.descripcion}
        </h3>
        <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
          <img
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={`https://img.youtube.com/vi/${testimonio.video}/hqdefault.jpg`}
            alt={`Miniatura de ${testimonio.descripcion}`}
          />
        </div>
      </div>
    ));

    if (loading){
      return (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="text-center">
            <p className="text-gray-600 mt-4 font-semibold">Cargando...</p>
            <CircularProgress />
          </div>
        </div>
      );
    }

  return (
    <div className="mx-auto my-12 px-4 text-center max-w-7xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 font-semibold mb-10 mt-8">
        Testimonios
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonioItems}
      </div>
      <button
        onClick={() => navigate("/Testimonios")}
        className="mt-10 text-blue-600 font-bold hover:underline"
      >
        Ver más testimonios
      </button>

      {selectedVideo && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 px-4 sm:px-0">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-3xl w-full">
            <div className="p-6">
              <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  title="video"
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${selectedVideo}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
              <button
                onClick={closeModal}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Testimonios;