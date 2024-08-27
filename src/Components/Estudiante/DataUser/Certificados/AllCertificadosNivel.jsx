import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { FaEye, FaDownload } from "react-icons/fa";
import CertificadoNivels from "../../Certificado/CertificadoNivels";
import AgregarDocumentos from "../../../Admin/Certificacion/CertificadoNivel/AgregarDocumentoNivel";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getUserData } from "../../../../Redux/features/Users/usersSlice";
import CircularProgress from '@mui/material/CircularProgress';

export default function AllCertificadosNivel() {
  const dispatch = useDispatch();
  const [certificados, setCertificados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [selectedCertificado, setSelectedCertificado] = useState(null);
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  useEffect(() => {
    const fetchCertificados = async () => {
      if (userData?.sub) {
        try {
          setLoading(true);
          const response = await axios.get(`/certificados/${userData.sub}`);
          setCertificados(response.data);
        } catch (error) {
          console.error("Error al obtener los certificados:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCertificados();
  }, [userData]);

  const registroHistorial = async (actionType, certificado) => {
    try {
      const historyData = {
        userSub: userData.sub,
        grupoId: certificado.grupoId,
        certificadoId: certificado.id,
        actionType,
        timestamp: new Date().toISOString(),
      };

      await axios.post("/user-history", historyData);
    } catch (error) {
      console.error("Error al registrar el historial:", error);
    }
  }

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const openModal = (certificado) => {
    if (!certificado.documento) {
      openAddDocumentModal(certificado);
    } else {
      setSelectedCertificado(certificado);
      setShowModal(true);
      registroHistorial("Vio el Certificado", certificado)
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCertificado(null);
  };

  const openAddDocumentModal = (certificado) => {
    setSelectedCertificado(certificado);
    setShowAddDocumentModal(true);
  };

  const closeAddDocumentModal = () => {
    setShowAddDocumentModal(false);
  };

  const handleDownloadPDF = async () => {
    const certificadoElement = document.getElementById("certificado-nivel");
    if (!certificadoElement) return;

    const canvas = await html2canvas(certificadoElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("certificado-nivel.pdf");

    if (selectedCertificado) {
      registroHistorial("Descargado", selectedCertificado) // Registra la descarga
    }
  };

  if (loading){
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600 mt-4 font-semibold">Cargando...</p>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        Certificados de Niveles
      </h1>
      {certificados.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-3 px-6 text-left">Nivel del Certificado</th>
                <th className="py-3 px-6 text-left">Fecha de Emisión</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {certificados.map((certificado) => (
                <tr
                  key={certificado.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-6 border-b">
                    {certificado.nivel.name}
                  </td>
                  <td className="py-3 px-6 border-b">
                    {formatFecha(certificado.createdAt)}
                  </td>
                  <td className="py-3 px-6 border-b text-center">
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        onClick={() => openModal(certificado)}
                        className="relative group bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                      >
                        <FaEye />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-80 shadow-lg">
                          Ver Certificado
                        </span>
                      </button>
                      <button
                        onClick={handleDownloadPDF}
                        className="relative group bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                      >
                        <FaDownload />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-80 shadow-lg">
                          Descargar
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-xl text-gray-500">
            No tienes certificados de niveles disponibles.
          </p>
        </div>
      )}

      {showModal && selectedCertificado && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full px-2 py-2">
              <div className="bg-white">
                <div id="certificado-nivel" className="sm:p-4">
                  <CertificadoNivels
                    certificadoId={selectedCertificado.id}
                    usuario={userData}
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="flex bg-gray-50 px-4 py-3">
                <button
                  onClick={handleDownloadPDF}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                >
                  Descargar
                </button>
                <button
                  onClick={closeModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddDocumentModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={closeAddDocumentModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full px-2 py-2">
              <div className="bg-white">
                <AgregarDocumentos
                  certificadoId={selectedCertificado.id}
                  idUser={userData.sub}
                  onClose={closeAddDocumentModal}
                />
              </div>
              <div className="flex bg-gray-50 px-4 py-3">
                <button
                  onClick={closeAddDocumentModal}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
