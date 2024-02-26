// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";

export default function ComponenteTestimonio() {
  const [testimonios, setTestimonios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [testimoniosPerPage] = useState(6); 

  useEffect(() => {
    async function fetchTestimonios() {
      try {
        const response = await axios.get("/testimonios");
        setTestimonios(response.data.testimonios);
      } catch (error) {
        console.error("Error fetching testimonios:", error);
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

  return (
    <div className="container mx-auto pb-5">
      <h1 className="text-3xl font-bold text-center my-8">Testimonios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTestimonios.map((testimonio) => (
          <div key={testimonio.id} className="bg-white shadow-md rounded-lg p-4">
            {/* Aquí se renderiza cada card de testimonio */}
            <iframe
              title={testimonio.descripcion}
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${testimonio.video}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
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
    </div>
  );
}