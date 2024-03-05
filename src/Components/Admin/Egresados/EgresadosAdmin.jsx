// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconButton, Pagination } from "@material-ui/core";
import { Create, Delete, Edit } from "@material-ui/icons";

export default function EgresadosAdmin() {
  const [egresados, setEgresados] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(4);

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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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

  const handleEdit = () => {
    // Implementar lógica para editar egresado
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/egresados/${id}`);
      setEgresados(egresados.filter((egresado) => egresado.id !== id));
    } catch (error) {
      console.error("Error deleting egresado:", error);
    }
  };

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = egresados.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="pt-5 pb-5">
      <div className="flex justify-end mb-4">
        <IconButton>
          <Create />
        </IconButton>
      </div>
      <h1 className="text-3xl font-bold text-center mb-8">Nuestros Egresados</h1>
      <div className="container mx-auto">
        {currentItems.map((egresado) => (
          <div
            key={egresado.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row md:hover:shadow-xl md:transition-shadow duration-300 mb-10 md:mb-20"
          >
            {/*Card Template 1 */}
            {egresado.template === "1" ? (
              <>
                {egresado.media && renderMedia(egresado.media)}
                <div className="flex-grow p-4 md:w-1/2">
                  <h2 className="text-xl font-semibold mb-2">{egresado.name}</h2>
                  <div dangerouslySetInnerHTML={{ __html: egresado.content }} className="text-gray-600"></div>
                </div>
              </>
            ) : (
              <>
                {/*Card Template 2 */}
                <div className="flex-grow p-4 md:w-1/2">
                  <h2 className="text-xl font-semibold mb-2">{egresado.name}</h2>
                  <div dangerouslySetInnerHTML={{ __html: egresado.content }} className="text-gray-600"></div>
                </div>
                {egresado.media && renderMedia(egresado.media)}
              </>
            )}
            <div className="flex justify-center md:justify-start space-x-2 md:space-x-0 mt-4 md:mt-0 md:ml-auto">
              <IconButton onClick={() => handleEdit(egresado.id)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(egresado.id)}>
                <Delete />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination
          count={Math.ceil(egresados.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}