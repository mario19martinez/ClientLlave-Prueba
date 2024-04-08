// eslint-disable-next-line no-unused-vars
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
  const [documentNumber, setDocumentNumber] = useState("");
  const [userDataForCertificate, setUserDataForCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (userData?.sub && cursosInscritos.length === 0) {
        try {
          const inscripcionResponse = await dispatch(
            fetchInscripcion(userData.sub)
          );
          const inscripciones = inscripcionResponse.payload.inscripciones || [];
          const cursoIds = inscripciones.map(
            (inscripcion) => inscripcion.cursoId
          );
          const cursoPromises = cursoIds.map((cursoId) =>
            dispatch(fetchCursoDetail(cursoId))
          );

          Promise.all(cursoPromises).then((responses) => {
            const cursos = responses
              .filter((cursoResponse) => cursoResponse.payload)
              .map((cursoResponse) => cursoResponse.payload);

            setCursosInscritos(cursos);
          });
        } catch (error) {
          console.error("Error al obtener los cursos:", error);
        }
      }
    };

    fetchCourses();
  }, [dispatch, userData, cursosInscritos]);

  useEffect(() => {
    if (userData && userData.pais) {
      setSelectedCountry(userData.pais);
    }
  }, [userData]);

  useEffect(() => {
    if (selectedCountry) {
      const selectedCountryData = documentos.paises.find(
        (country) => country.nombre === selectedCountry
      );
      if (selectedCountryData) {
        setDocumentTypes(selectedCountryData.tipo_documento);
      }
    }
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleInscritoChange = (e) => {
    setInscritoSeleccionado(e.target.value);
  };

  const handleDocumentNumberChange = (e) => {
    setDocumentNumber(e.target.value);
  };

  const handleGenerateCertificate = () => {
    setUserDataForCertificate({
      nombre: userData?.name,
      apellido: userData?.last_name,
      tipoDocumento: document.getElementById("documentType").value,
      numeroDocumento: documentNumber,
      nivel: inscritoSeleccionado,
    });

    // Mostrar el modal después de generar el certificado
    setShowModal(true);
  };

  // Función para generar y descargar el certificado en PDF
  const handleDownloadPDF = () => {
    const element = document.getElementById("certificate-container");
    const filename = `Certificación ${inscritoSeleccionado} de ${userData?.name}.pdf`;
    html2pdf().from(element).save(filename);
  };

  return (
    <div>
      <div className="justify-center items-center">
        <div className="max-w-md p-6 bg-slate-300 rounded-md shadow-md">
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              País
            </label>
            <select
              id="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccione un país</option>
              {documentos.paises.map((country) => (
                <option key={country.nombre} value={country.nombre}>
                  {country.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="documentType"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo de Documento
            </label>
            <select
              id="documentType"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccione un tipo de documento</option>
              {documentTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="cursoInscrito"
              className="block text-sm font-medium text-gray-700"
            >
              Curso Inscrito
            </label>
            <select
              id="cursoInscrito"
              value={inscritoSeleccionado}
              onChange={handleInscritoChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccione un curso inscrito</option>
              {cursosInscritos.map((curso, index) => {
                const nivelLabel =
                  curso.nivel.length <= 2
                    ? `Nivel ${curso.nivel}`
                    : curso.nivel;
                return (
                  <option key={index} value={curso.nivel}>
                    {nivelLabel}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="documentNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Número de Documento
            </label>
            <input
              type="text"
              id="documentNumber"
              value={documentNumber}
              onChange={handleDocumentNumberChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Botón para generar el certificado */}
          <div className="flex justify-center">
            <button
              onClick={handleGenerateCertificate}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Generar Certificado
            </button>
          </div>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-4xl">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {/* Agregar un ID al contenedor del certificado */}
                <div id="certificate-container">
                  <Certificado
                    userData={userDataForCertificate}
                    selectedCountry={selectedCountry}
                    inscritoSeleccionado={inscritoSeleccionado}
                    numeroDocumento={documentNumber}
                  />
                </div>
              </div>
              <div className="flex bg-gray-50 px-4 py-3 ">
                {/* Botón para descargar el certificado en PDF */}
                <button
                  onClick={handleDownloadPDF}
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
                >
                  Descargar
                </button>

                {/* Botón para cerrar el modal */}
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
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