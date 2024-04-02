// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../Redux/features/Users/usersSlice";
import documentos from './documentos.json';

export default function FormLegal() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [documentTypes, setDocumentTypes] = useState([]);

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

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

  const handleGenerateCertificate = () => {
    // Aquí puedes agregar la lógica para generar el certificado
    console.log("Generar certificado");
  };

  return (
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
  );
}