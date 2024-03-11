import { useState, useEffect } from "react";
import axios from "axios";

function ClaseEditAdmin({ moduloId, claseId, closeModal }) {
  //const { moduloId, claseId } = match.params;
  const [claseData, setClaseData] = useState({
    name: "",
    url: "",
    pdfURL: "",
    texto: "",
    resumen: "",
  });
  const [successAlert, setSuccessAlert] = useState(false);

  useEffect(() => {
    const fetchClaseData = async () => {
      try {
        const response = await axios.get(
          `/modulo/${moduloId}/clase/${claseId}`
        );
        setClaseData(response.data);
      } catch (error) {
        console.error("Error al obtener datos de la clase:", error);
      }
    };
    fetchClaseData();
  }, [moduloId, claseId]);

  const handleInputChange = (e) => {
    setClaseData({
      ...claseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/modulo/${moduloId}/clase/${claseId}`, claseData);
      setSuccessAlert(true);

      setTimeout(() => {
        closeModal();
      }, 1000);
      console.log("Clase modificada exitosamente");
    } catch (error) {
      console.error("Error al modificar la clase:", error);
    }
  };

  return (
    <div className="container mx-auto mt-2 bg-blue-500 w-1/2 translate-y-6 rounded-md">
      {successAlert && (
        <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-md">
          ¡Clase modificada exitosamente!
        </div>
      )}

      <h1 className="text-2xl font-bold mb-2 text-white translate-x-24 p-4">
        Modificar Clase
      </h1>
      <form
        onSubmit={handleFormSubmit}
        className="max-w-lg mx-auto p-4 rounded-lg shadow-lg"
      >
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block text-white text-sm font-bold mb-2"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={claseData.name}
            onChange={handleInputChange}
            className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="url"
            className="block text-white text-sm font-bold mb-2"
          >
            URL:
          </label>
          <input
            type="text"
            id="url"
            name="url"
            value={claseData.url}
            onChange={handleInputChange}
            className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="pdfURL"
            className="block text-white text-sm font-bold mb-2"
          >
            PDF URL:
          </label>
          <input
            type="text"
            id="pdfURL"
            name="pdfURL"
            value={claseData.pdfURL}
            onChange={handleInputChange}
            className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="texto"
            className="block text-white text-sm font-bold mb-2"
          >
            Texto:
          </label>
          <textarea
            id="texto"
            name="texto"
            value={claseData.texto}
            onChange={handleInputChange}
            className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="resumen"
            className="block text-white text-sm font-bold mb-2"
          >
            Resumen:
          </label>
          <input
            type="text"
            id="resumen"
            name="resumen"
            value={claseData.resumen}
            onChange={handleInputChange}
            className="border-2 border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-b-4"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default ClaseEditAdmin;
