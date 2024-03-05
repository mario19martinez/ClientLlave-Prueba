// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi"; 

export default function Egresados() {
  const [egresados, setEgresados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [egresadosPerPage] = useState(2);
  const [selectedEgresado, setSelectedEgresado] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navegate = useNavigate();

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

  const handleDelete = async () => {
    try {
      await axios.delete(`/egresados/${selectedEgresado.id}`);
      setEgresados(egresados.filter((egresado) => egresado.id !== selectedEgresado.id));
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error deleting egresado:", error);
    }
  };

  // Obtener índices de egresados para la paginación
  const indexOfLastEgresado = currentPage * egresadosPerPage;
  const indexOfFirstEgresado = indexOfLastEgresado - egresadosPerPage;
  const currentEgresados = egresados.slice(
    indexOfFirstEgresado,
    indexOfLastEgresado
  );

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="py-8 px-8">
      <h1 className="text-3xl font-bold text-center mb-8">Nuestros Egresados</h1>
      <div className="container mx-auto">
        {/* Botón para crear testimonio de egresado */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center"
        onClick={() => navegate("/admin/egresados/crear")}>
          <FiPlus className="mr-2" />
          Crear testimonio de egresado
        </button>

        {/* Lista de egresados */}
        {currentEgresados.map((egresado, index) => (
          <div
            key={egresado.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row md:hover:shadow-xl md:transition-shadow duration-300 mb-10 md:mb-20"
          >
            {/* Intercale los templates 1 y 2 en cada página */}
            {index % 2 === 0 ? (
              <>
                {egresado.template === "1" ? (
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
                      <div className="flex mt-4">
                        <button className="flex items-center text-blue-500 hover:text-blue-700">
                          <MdEdit className="mr-1" />
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            setSelectedEgresado(egresado);
                            setShowConfirmation(true);
                          }}
                          className="flex items-center text-red-500 hover:text-red-700 ml-4"
                        >
                          <MdDelete className="mr-1" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-grow p-4 md:w-1/2">
                      <h2 className="text-xl font-semibold mb-2">
                        {egresado.name}
                      </h2>
                      <div
                        dangerouslySetInnerHTML={{ __html: egresado.content }}
                        className="text-gray-600"
                      ></div>
                      <div className="flex mt-4">
                        <button className="flex items-center text-blue-500 hover:text-blue-700">
                          <MdEdit className="mr-1" />
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            setSelectedEgresado(egresado);
                            setShowConfirmation(true);
                          }}
                          className="flex items-center text-red-500 hover:text-red-700 ml-4"
                        >
                          <MdDelete className="mr-1" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                    {egresado.media && renderMedia(egresado.media)}
                  </>
                )}
              </>
            ) : (
              <>
                {egresado.template === "2" ? (
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
                      <div className="flex mt-4">
                        <button className="flex items-center text-blue-500 hover:text-blue-700">
                          <MdEdit className="mr-1" />
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            setSelectedEgresado(egresado);
                            setShowConfirmation(true);
                          }}
                          className="flex items-center text-red-500 hover:text-red-700 ml-4"
                        >
                          <MdDelete className="mr-1" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-grow p-4 md:w-1/2">
                      <h2 className="text-xl font-semibold mb-2">
                        {egresado.name}
                      </h2>
                      <div
                        dangerouslySetInnerHTML={{ __html: egresado.content }}
                        className="text-gray-600"
                      ></div>
                      <div className="flex mt-4">
                        <button className="flex items-center text-blue-500 hover:text-blue-700">
                          <MdEdit className="mr-1" />
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            setSelectedEgresado(egresado);
                            setShowConfirmation(true);
                          }}
                          className="flex items-center text-red-500 hover:text-red-700 ml-4"
                        >
                          <MdDelete className="mr-1" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                    {egresado.media && renderMedia(egresado.media)}
                  </>
                )}
              </>
            )}
          </div>
        ))}

        {/* Paginación */}
        <div className="flex justify-center">
          {Array.from({ length: Math.ceil(egresados.length / egresadosPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 hover:bg-blue-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Mensaje de confirmación emergente */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-8 rounded shadow-md">
              <p className="text-lg font-semibold mb-4">¿Estás seguro de eliminar este egresado?</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}