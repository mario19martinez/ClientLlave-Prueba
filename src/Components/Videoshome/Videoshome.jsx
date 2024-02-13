import { useState, useEffect } from "react";
import axios from "axios";

const Videoshome = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/videos");
        setVideos(response.data.slice(0, 4)); // Obtener solo los primeros cuatro videos
      } catch (error) {
        console.error("Error al obtener los videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const extractYoutubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div>
      <div className="pb-1">
        <h1 className="text-center text-2xl font-bold text-blue-900 mt-5 mb-5">
          Entrenando Tus Sentidos Espirituales
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center overflow-x-auto space-x-7 mt-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="w-full md:w-72 border rounded-lg overflow-hidden mb-4 md:mb-0"
          >
            <h3 className="text-base font-semibold p-2">{video.titulo}</h3>
            <iframe
              title="url"
              src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
                video.url
              )}`}
              className="w-full h-36 md:h-48"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videoshome;
