import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../Redux/features/Users/usersSlice";
import axios from "axios";
import { FaEye, FaDownload } from "react-icons/fa";
import { FiFileText } from "react-icons/fi"; // Icono para "sin certificados"
import CertificadoStudent from "../Certificado/CertificadoStudent";
import AgregarDocumentos from "../../Admin/Certificacion/AgregarDocumento";
import html2pdf from "html2pdf.js";

export default function Certificados() {
  const dispatch = useDispatch();
  const [certificados, setCertificados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCertificado, setSelectedCertificado] = useState(null);
  const [showAgregarDocumentos, setShowAgregarDocumentos] = useState(false);
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
          const response = await axios.get(
            `/certificadosCurso/usuario/${userData.sub}`
          );
          console.log("Datos de certificados:", response.data);
          setCertificados(response.data);
        } catch (error) {
          console.error("Error fetching certificates:", error);
        }
      }
    };

    fetchCertificados();
  }, [userData]);

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getNivelTexto = (numero_nivel) => {
    if (numero_nivel === 5) {
      return "Especialización";
    }
    return `Nivel ${numero_nivel}`;
  };

  const openModal = (certificado) => {
    setSelectedCertificado(certificado);
    if (certificado.documento && certificado.tipoDocumento) {
      setShowModal(true); // Mostrar el modal de certificado
    } else {
      setShowModal(false); // Ocultar el modal de certificado
      // Mostrar el modal de agregar documentos
      setShowAgregarDocumentos(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowAgregarDocumentos(false);
    setSelectedCertificado(null);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("certificado");

    // Obtener el ancho y alto del contenido del certificado
    const contentWidth = 1300; // Ancho deseado
    const contentHeight = 914; // Alto deseado

    // Configurar el formato del PDF como horizontal y ajustar el tamaño del contenido
    html2pdf()
      .from(element)
      .set({
        filename: `Certificado_${userData.name}_${userData.last_name}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: {
          orientation: "landscape", // Formato horizontal
          unit: "px", // Unidad en píxeles
          format: [contentWidth, contentHeight], // Tamaño del contenido
        },
      })
      .save();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        Mis Certificados
      </h1>
      {certificados.length > 0 ? (
        <>
          <p className="text-xl mb-6 text-center">
            Tienes {certificados.length} certificados:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="py-3 px-6 text-left">
                    Nombre del Certificado
                  </th>
                  <th className="py-3 px-6 text-left hidden sm:table-cell">
                    Fecha de Emisión
                  </th>
                  <th className="py-3 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {certificados.map((certificado, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-3 px-6 border-b">
                      {getNivelTexto(certificado.numero_nivel)}
                    </td>
                    <td className="py-3 px-6 border-b hidden sm:table-cell">
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
                          onClick={() => {
                            openModal(certificado);
                            handleDownloadPDF();
                          }}
                          className="relative group bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                        >
                          <FaDownload />
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-80 shadow-lg">
                            Descargar Certificado
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <FiFileText className="text-6xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-500">
            Aún no tienes certificados disponibles.
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
                <div id="certificado" className="sm:p-4">
                  {" "}
                  {/* Añadimos padding solo en dispositivos grandes */}
                  <CertificadoStudent
                    certificado={selectedCertificado}
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

      {showAgregarDocumentos && selectedCertificado && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          onClick={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full px-2 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <button
                  onClick={closeModal}
                  className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
                <AgregarDocumentos
                  idUser={userData.sub}
                  idCertificado={selectedCertificado.id}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
