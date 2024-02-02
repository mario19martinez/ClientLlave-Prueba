import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function ClaseDetail() {
  const [pdfFilePath, setPdfFilePath] = useState("");
  const [downloadInProgress, setDownloadInProgress] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false); // Nuevo estado para controlar la descarga completada
  const { id, claseId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/cursos/${id}/clases/${claseId}/pdf`);
        setPdfFilePath(response.data.pdfFilePath);
      } catch (error) {
        console.error("Error al obtener la URL del PDF:", error);
      }
    };
    fetchData();
  }, [id, claseId]);

  const startPDFDownload = () => {
    if (!downloadInProgress && pdfFilePath) {
      setDownloadInProgress(true);
      downloadPDF(pdfFilePath);
    }
  };

  const downloadPDF = (url) => {
    axios
      .get(url, { responseType: "arraybuffer" })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const fileURL = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = fileURL;
        a.download = "archivo.pdf";
        a.click();
        window.URL.revokeObjectURL(fileURL);
        setDownloadInProgress(false);
        setDownloadComplete(true); // Establecer descarga completada
        setTimeout(() => {
          setDownloadComplete(false); // Reiniciar estado después de 5 segundos
        }, 30000);
      })
      .catch((error) => {
        console.error("Error al descargar el PDF:", error);
        setDownloadInProgress(false);
      });
  };

  return (
    <div className="container mx-auto p-4">
      {pdfFilePath && (
        <div className="max-w-md mx-auto bg-white p-8 rounded shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">
            Detalles de la Clase
          </h1>
          {downloadComplete && ( // Mostrar la alerta cuando la descarga esté completa
            <Alert severity="success">
              <AlertTitle>Taller descargado</AlertTitle>
              El taller se ha descargado en su dispositivo. Verifique los archivos de descargas de su dispositivo o el historial de su navegador o aplicación.
            </Alert>
          )}
          <div className="flex flex-col space-y-4">
            <button
              className={`bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded ${
                downloadInProgress ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={startPDFDownload}
              disabled={downloadInProgress}
            >
              {downloadInProgress
                ? "Descargando..."
                : "Descargar Taller en PDF"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClaseDetail;