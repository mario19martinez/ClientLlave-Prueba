// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import styles from "./EgresadosAnimate.module.css";
import axios from "axios";

export default function VerEgresados() {
  const [egresados, setEgresados] = useState([]);

  useEffect(() => {
    axios
      .get("/egresados")
      .then((response) => {
        setEgresados(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const renderMedia = (media) => {
    if (media.includes("youtube.com")) {
      // Si la media es un video de YouTube
      const videoId = new URL(media).searchParams.get("v");
      return (
        <div className="w-full md:w-1/2 relative overflow-hidden rounded-lg mb-4 md:mb-0 md:mr-4">
          <div
            style={{ paddingTop: "56.25%" }} // Establece el mismo aspect ratio para todos los videos
            className="aspect-w-16 aspect-h-9"
          >
            <iframe
              className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-100 hover:opacity-75"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      );
    } else {
      // Si la media es una imagen
      return (
        <img
          style={{ width: "auto", height: "auto" }} // Establece el tamaño de la imagen automáticamente
          className="md:w-1/2 object-cover object-center rounded-lg mb-4 md:mb-0 md:mr-4 transition-opacity duration-300 opacity-100 hover:opacity-75"
          src={media}
          alt="Media"
        />
      );
    }
  };

  return (
    <div className="pt-5 pb-5">
      <h1 className="text-3xl font-bold text-center mb-8">Nuestros Egresados</h1>
      <div className="px-16">
        {egresados.map((egresado) => (
          <div
            key={egresado.id}
            className={`bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row md:hover:shadow-xl md:transition-shadow duration-300 mb-10 md:mb-20 ${styles.Template}`}
          >
            {/* Card Template 1 */}
            {egresado.template === "1" && (
              <>
                {egresado.media && renderMedia(egresado.media)}
                <div className="flex-grow p-4 md:w-1/2">
                  <h2 className="text-xl font-semibold mb-2">
                    {egresado.name}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: egresado.content }}
                    className="text-gray-600"
                  ></div>
                </div>
              </>
            )}
            {/* Card Template 2 */}
            {egresado.template === "2" && (
              <>
                <div className="flex-grow p-4 md:w-1/2">
                  <h2 className="text-xl font-semibold mb-2">
                    {egresado.name}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{ __html: egresado.content }}
                    className="text-gray-600"
                  ></div>
                </div>
                {egresado.media && renderMedia(egresado.media)}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}