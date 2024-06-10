import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateVideo from "./Createvideo";

const Adminvideo = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/videos");
        setVideos(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
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

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDeleteVideo = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estas seguro de eliminar este video?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/video/${id}`);
        setVideos(videos.filter((video) => video.id !== id));
      } catch (error) {
        console.error("Error al eliminar el video:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  return (
    <div className="absolute top-0 left-0 mt-28 ml-96 p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Videos</h2>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded flex items-center hover:bg-blue-600 font-semibold"
      >
        <AddIcon /> Subir Video
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={handleModalClose}
        contentLabel="Subir Video"
      >
        <CreateVideo onVideoCreated={handleModalClose} />
      </Modal>
      <div className="mt-8">
        <ul>
          {videos.map((video) => (
            <li
              key={video.id}
              className="border border-gray-200 rounded-lg p-4 mb-4"
            >
              <h3 className="text-lg font-semibold text-gray-800">{video.titulo}</h3>
              <iframe
                title="url"
                style={{
                  width: "100%",
                  height: "200px",
                }}
                src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
                  video.url
                )}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <button
                className="bg-red-500 hover:bg-white text-white hover:text-red-500 py-2 px-4 rounded mt-2"
                onClick={() => handleDeleteVideo(video.id)}
              >
                <DeleteForeverIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Adminvideo;
