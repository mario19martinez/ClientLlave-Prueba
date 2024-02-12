import { useState, useEffect } from "react";
import axios from "axios";

const Videoshome = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/videos");
        setVideos(response.data.slice(0, 4)); // Obtener solo los primeros tres videos
      } catch (error) {
        console.error('Error al obtener los videos:', error);
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
    <div className="flex justify-center overflow-x-auto space-x-7 mt-8">
      {videos.map((video) => (
        <div key={video.id} className="w-72 border rounded-lg overflow-hidden">
          <h3 className="text-base font-semibold p-2">{video.titulo}</h3>
          <iframe
            title="url"
            src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
                  video.url
                )}`}
            className="w-full h-36"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default Videoshome;
