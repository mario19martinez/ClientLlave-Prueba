import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function ComponenteTestimonio() {
  const [testimonios, setTestimonios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [testimoniosPerPage] = useState(6); 
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonios() {
      try {
        setLoading(true)
        const response = await axios.get("/testimonios");
        setTestimonios(response.data.testimonios);
      } catch (error) {
        console.error("Error fetching testimonios:", error);
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonios();
  }, []);

  // Index del último testimonio en la página actual
  const indexOfLastTestimonio = currentPage * testimoniosPerPage;
  // Index del primer testimonio en la página actual
  const indexOfFirstTestimonio = indexOfLastTestimonio - testimoniosPerPage;
  // Testimonios de la página actual
  const currentTestimonios = testimonios.slice(indexOfFirstTestimonio, indexOfLastTestimonio);

  // Cambiar de página
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleCardClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

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
    <div className="container mx-auto pb-5">
      <h1 className="text-3xl font-bold text-center my-8">Testimonios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTestimonios.map((testimonio) => (
          <div
            key={testimonio.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => handleCardClick(testimonio.video)}
          >
            <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
              <img
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src={`https://img.youtube.com/vi/${testimonio.video}/hqdefault.jpg`}
                alt={`Miniatura de ${testimonio.descripcion}`}
              />
            </div>
            <p className="mt-2 text-gray-700">{testimonio.descripcion}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
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