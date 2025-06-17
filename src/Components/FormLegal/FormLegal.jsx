import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../Redux/features/Users/usersSlice";
import { fetchInscripcion } from "../../Redux/features/UsersCourses/UsersCursesSlices";
import { fetchCursoDetail } from "../../Redux/features/courses/coursesSlice";
import documentos from "./documentos.json";
import Certificado from "../Estudiante/Certificado/Certificado";
import html2pdf from "html2pdf.js";

export default function FormLegal() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [documentTypes, setDocumentTypes] = useState([]);
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const [inscritoSeleccionado, setInscritoSeleccionado] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [userDataForCertificate, setUserDataForCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) dispatch(getUserData(storedEmail));
  }, [dispatch]);

  useEffect(() => {
    const loadInscripciones = async () => {
      if (userData?.sub) {
        try {
          const res = await dispatch(fetchInscripcion(userData.sub));
          const inscripciones = res.payload.inscripciones || [];

          const detalles = await Promise.all(
            inscripciones.map((i) => dispatch(fetchCursoDetail(i.cursoId)))
          );

          const cursos = detalles
            .map((d) => d.payload)
            .filter(Boolean);

          setCursosInscritos(cursos);
        } catch (err) {
          console.error("Error al cargar cursos:", err);
        }
      }
    };

    loadInscripciones();
  }, [dispatch, userData]);

  useEffect(() => {
    if (userData?.pais) {
      setSelectedCountry(userData.pais);
    }
  }, [userData]);

  useEffect(() => {
    const pais = documentos.paises.find((p) => p.nombre === selectedCountry);
    setDocumentTypes(pais?.tipo_documento || []);
  }, [selectedCountry]);

  const handleGenerateCertificate = () => {
    setUserDataForCertificate({
      nombre: userData?.name,
      apellido: userData?.last_name,
      tipoDocumento: documentType,
      numeroDocumento: documentNumber,
      nivel: inscritoSeleccionado,
    });
    setShowModal(true);
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("certificate-container");
    const filename = `Certificación ${inscritoSeleccionado} de ${userData?.name}.pdf`;
    html2pdf().from(element).save(filename);
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-lg bg-white p-6 rounded shadow">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">País</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Seleccione un país</option>
              {documentos.paises.map((pais) => (
                <option key={pais.nombre} value={pais.nombre}>
                  {pais.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="">Seleccione un tipo</option>
              {documentTypes.map((tipo, i) => (
                <option key={i} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Curso Inscrito</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              value={inscritoSeleccionado}
              onChange={(e) => setInscritoSeleccionado(e.target.value)}
            >
              <option value="">Seleccione un curso</option>
              {cursosInscritos.map((curso, i) => (
                <option key={i} value={curso.nivel}>
                  {curso.nivel.length <= 2 ? `Nivel ${curso.nivel}` : curso.nivel}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Número de Documento</label>
            <input
              type="text"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <button
            onClick={handleGenerateCertificate}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Generar Certificado
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
            <div id="certificate-container">
              <Certificado
                userData={userDataForCertificate}
                selectedCountry={selectedCountry}
                inscritoSeleccionado={inscritoSeleccionado}
                numeroDocumento={documentNumber}
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleDownloadPDF}
                className="bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
              >
                Descargar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}