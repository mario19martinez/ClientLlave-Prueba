import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ClaseDetailUser() {
  const [pdfFilePath, setPdfFilePath] = useState("");
  const { id, claseId } = useParams();

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(`/cursos/${id}/clases/${claseId}/pdf`);
        console.log(response, "Soy el response");
        setPdfFilePath(response.data.pdfFilePath);
        console.log("pdfURL from server:", response.data);
      } catch (error) {
        console.error("Error al obtener la URL del PDF:", error);
      }
    };
    fecthData();
    //console.log("pdfURL:", pdfURL);
  }, [id, claseId]);

  const downloadPDFClase = () => {
    if (pdfFilePath) {
      axios
        .get(pdfFilePath, { responseType: "arraybuffer" })
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          // Crea un enlace temporal y haz clic en el para iniciar la descarga
          const a = document.createElement("a");
          a.href = url;
          a.download = "archivo.pdf";
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Error al descargar el PDF:", error);
        });
    }
  };
  return (
    <div className="container mx-auto p-4">
      {pdfFilePath && (
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">
            Detalles de la Clase
          </h1>
          <div className="flex flex-col space-y-4">
            <a
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
              href={pdfFilePath}
              onClick={downloadPDFClase}
              download="archivo.pdf"
            >
              Descargar PDF CLase
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
export default ClaseDetailUser;
