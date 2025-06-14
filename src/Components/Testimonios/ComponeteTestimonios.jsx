import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";

export default function ComponenteTestimonio() {
  const [testimonios, setTestimonios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [testimoniosPerPage] = useState(6);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonios() {
      try {
        setLoading(true);
        const response = await axios.get("/testimonios");
        const dataOrdenada = response.data.testimonios.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setTestimonios(dataOrdenada);
      } catch (error) {
        console.error("Error fetching testimonios:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonios();
  }, []);

  const indexOfLastTestimonio = currentPage * testimoniosPerPage;
  const indexOfFirstTestimonio = indexOfLastTestimonio - testimoniosPerPage;
  const currentTestimonios = testimonios.slice(indexOfFirstTestimonio, indexOfLastTestimonio);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleCardClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600 mt-4 font-semibold">Cargando testimonios...</p>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-10">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 my-10 tracking-tight">
        Testimonios
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentTestimonios.map((testimonio, index) => (
          <motion.div
            key={testimonio.id}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => handleCardClick(testimonio.video)}
          >
            <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
              <img
                src={`https://img.youtube.com/vi/${testimonio.video}/hqdefault.jpg`}
                alt={`Miniatura de ${testimonio.descripcion}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-gray-700 text-sm">{testimonio.descripcion}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          count={Math.ceil(testimonios.length / testimoniosPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
          size="large"
        />
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
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
              <div className="flex justify-end mt-4">
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}