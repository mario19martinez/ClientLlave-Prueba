// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

function Testimonios() {
  const [testimonios, setTestimonios] = useState([]);

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const response = await axios.get("/testimonios");
        // Ordenar los testimonios por ID de forma descendente para obtener los últimos 4
        const sortedTestimonios = response.data.testimonios.sort((a, b) => b.id - a.id);
        // Tomar solo los últimos 4 testimonios
        const lastFourTestimonios = sortedTestimonios.slice(0, 4);
        setTestimonios(lastFourTestimonios);
      } catch (error) {
        console.error("Error al obtener testimonios", error);
      }
    };
    fetchTestimonios();
  }, []);

  const testimonioItems =
    testimonios.length > 0 &&
    testimonios.map((testimonio) => (
      <div
        key={testimonio.id}
        className="p-6 border rounded-lg shadow-md mx-auto max-w-2xl"
      >
        <h3 className="text-xl font-bold mb-4">
          {testimonio.descripcion}
        </h3>
        <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
          <iframe
            title="video"
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${testimonio.video}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    ));

  return (
    <div className=" w-screen mx-auto my-8 pt-10 pl-2 pr-6 text-center">
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#012677" }}>
        Testimonios
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonioItems}
      </div>
      <a href="/ver-mas-testimonios" className="text-blue-500 font-bold hover:underline mt-4 block">
        Ver más testimonios
      </a>
    </div>
  );
}

export default Testimonios;