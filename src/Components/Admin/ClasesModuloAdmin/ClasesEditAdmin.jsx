import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import NavAdmin from "../NavAdmin/NavAdmin";
import SidebarAdmin from "../SidebarAdmin/SidebarAdmin";

function ClaseEditAdmin() {
  const { moduloId, claseId } = useParams();
  const [claseData, setClaseData] = useState({
    name: "",
    url: "",
    pdfURL: "",
    texto: "",
    resumen: "",
  });
  const [successAlert, setSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClaseData = async () => {
      try {
        const response = await axios.get(
          `/modulo/${moduloId}/clase/${claseId}`
        );
        setClaseData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener datos de la clase:", error);
        setError(
          "Error al obtener datos de la clase. Por favor, inténtalo de nuevo más tarde."
        );
        setLoading(false);
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

      //setTimeout(() => {}, 1000);
      console.log("Clase modificada exitosamente");
      toast.success("Clase modificada exitosamente!", {
        position: "top-center",
        autoClose: 1500,
        closeOnClick: true,
        theme: "colored",
      });
      setTimeout(() => {
        window.history.back();
      }, 1800);
    } catch (error) {
      console.error("Error al modificar la clase:", error);
    }
  };

  const handleQuillChange = (value) => {
    setClaseData({
      ...claseData,
      resumen: value,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-xl font-semibold text-gray-900">
          Cargando...
        </span>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <NavAdmin />
      <div className="flex">
        <SidebarAdmin />
        <div className="bg-gray-100 min-h-screen flex justify-center items-center w-1/2">
          <div className="max-w-3xl w-full p-8 bg-white rounded-lg shadow-lg">
            {successAlert && (
              <div className="bg-green-500 text-white p-2 rounded-md mb-4">
                ¡Clase modificada exitosamente!
              </div>
            )}

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Modificar Clase
            </h2>

            <form onSubmit={handleFormSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block text-gray-800 text-sm font-bold mb-2"
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
                  className="block text-gray-800 text-sm font-bold mb-2"
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
                  className="block text-gray-800 text-sm font-bold mb-2"
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
                  className="block text-gray-800 text-sm font-bold mb-2"
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
                  className="block text-gray-800 text-sm font-bold mb-2"
                >
                  Resumen:
                </label>
                <ReactQuill
                  id="resumen"
                  value={claseData.resumen}
                  onChange={handleQuillChange}
                  className="border-2 border-gray-400 rounded-md p-2 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border-b-4"
              >
                Guardar Cambios
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClaseEditAdmin;
