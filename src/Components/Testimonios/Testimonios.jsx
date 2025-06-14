import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { motion, AnimatePresence } from "framer-motion";

function Testimonios() {
  const [testimonios, setTestimonios] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/testimonios");
        const sorted = response.data.testimonios.sort((a, b) => b.id - a.id);
        setTestimonios(sorted.slice(0, 4));
      } catch (error) {
        console.error("Error al obtener testimonios", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonios();
  }, []);

  const handleCardClick = (videoId) => setSelectedVideo(videoId);
  const closeModal = () => setSelectedVideo(null);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
        <div className="text-center">
          <p className="text-gray-600 font-semibold mb-3">Cargando testimonios...</p>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Testimonios
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonios.map((t) => (
          <motion.div
            key={t.id}
            onClick={() => handleCardClick(t.video)}
            className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
              <img
                src={`https://img.youtube.com/vi/${t.video}/hqdefault.jpg`}
                alt={`Miniatura de ${t.descripcion}`}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-t-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-t-xl">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-800 font-medium line-clamp-3">
                {t.descripcion}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/Testimonios")}
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Ver más testimonios
        </button>
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-3xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4">
                <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo}`}
                    title="Testimonio"
                    frameBorder="0"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded"
                  ></iframe>
                </div>
                <div className="text-right mt-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Testimonios;