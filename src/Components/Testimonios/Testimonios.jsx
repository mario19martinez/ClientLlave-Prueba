// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonios() {
  const [testimonios, setTestimonios] = useState([]);

  useEffect(() => {
    const fetchTestimonios = async () => {
      try {
        const response = await axios.get("/testimonios");
        setTestimonios(response.data.testimonios);
      } catch (error) {
        console.error("Error al obtener testimonios", error);
      }
    };
    fetchTestimonios();
  }, []);

  const testimoniosSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    centerMode: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const testimonioItems =
    testimonios.length > 0 &&
    testimonios.map((testimonio) => (
      <div
        key={testimonio.id}
        className="p-4 border rounded-lg shadow-md max-w-md mx-auto"
      >
        <h3 className="text-xl font-bold mb-2">
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
    <div className="container mx-auto my-8 pt-10 text-center">
      <h1 className="text-3xl font-bold mb-6" style={{ color: "#012677" }}>
        Testimonios
      </h1>
      <Slider {...testimoniosSettings}>{testimonioItems}</Slider>
    </div>
  );
}

export default Testimonios;