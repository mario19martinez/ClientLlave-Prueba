// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../Redux/features/Users/usersSlice";
import { fetchInscripcion } from "../../Redux/features/UsersCourses/UsersCursesSlices";
import { fetchCursoDetail } from "../../Redux/features/courses/coursesSlice";
import documentos from './documentos.json';
import Certificado from '../Estudiante/Certificado/Certificado'; 

export default function FormLegal() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [documentTypes, setDocumentTypes] = useState([]);
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const [inscritoSeleccionado, setInscritoSeleccionado] = useState('');

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
          const inscripcionResponse = await dispatch(fetchInscripcion(userData.sub));
          const inscripciones = inscripcionResponse.payload.inscripciones || [];
          const cursoIds = inscripciones.map((inscripcion) => inscripcion.cursoId);
          const cursoPromises = cursoIds.map((cursoId) => dispatch(fetchCursoDetail(cursoId)));

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
      const selectedCountryData = documentos.paises.find((country) => country.nombre === selectedCountry);
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

  const handleGenerateCertificate = () => {
    // Aquí puedes agregar la lógica para generar el certificado
    console.log("Generar certificado");
  };

  return (
    <div>
      <div className="justify-center items-center">
        <div className="max-w-md p-6 bg-slate-300 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">País</label>
            <select
              id="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccione un país</option>
              {documentos.paises.map((country) => (
                <option key={country.nombre} value={country.nombre}>{country.nombre}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="documentType" className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
            <select
              id="documentType"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccione un tipo de documento</option>
              {documentTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="cursoInscrito" className="block text-sm font-medium text-gray-700">Curso Inscrito</label>
            <select
              id="cursoInscrito"
              value={inscritoSeleccionado}
              onChange={handleInscritoChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccione un curso inscrito</option>
              {cursosInscritos.map((curso, index) => {
                const nivelLabel = curso.nivel.length <= 2 ? `Nivel ${curso.nivel}` : curso.nivel;
                return <option key={index} value={curso.nivel}>{nivelLabel}</option>;
              })}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700">Número de Documento</label>
            <input
              type="text"
              id="documentNumber"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-center">
            <button onClick={handleGenerateCertificate} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
              Generar Certificado
            </button>
          </div>
        </div>
      </div>
      {/* Pasa los datos necesarios como props al componente Certificado */}
      <Certificado
        selectedCountry={selectedCountry}
        inscritoSeleccionado={inscritoSeleccionado}
      />
    </div>
  );
}