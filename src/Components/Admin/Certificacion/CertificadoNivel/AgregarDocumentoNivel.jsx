import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import documentos from "../documentos.json";

export default function AgregarDocumentos({ certificadoId, idUser }) {
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [tiposDocumentos, setTiposDocumentos] = useState([]);

  console.log("este es el id del certificado desde el modal: ", certificadoId);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/user/${idUser}`);
        const userData = response.data;
        console.log("Datos usuario: ", userData);
        setUserInfo(userData);

        const paisUsuario = userData.pais;
        const paisInfo = documentos.paises.find(
          (pais) => pais.nombre === paisUsuario
        );

        if (paisInfo) {
          setTiposDocumentos(paisInfo.tipo_documento);
        } else {
          setTiposDocumentos([]);
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserInfo();
  }, [idUser]);

  useEffect(() => {
    const fetchCertificado = async () => {
      try {
        const response = await axios.get(`/certificado/${certificadoId}`);
        if (response.status === 404) {
          alert("Certificado de curso no encontrado");
        } else {
          const certificado = response.data;
          setTipoDocumento(certificado.tipoDocumento || ""); 
          setDocumento(certificado.documento || ""); 
          console.log('info certificado: ', certificado);
        }
      } catch (error) {
        console.error("Error al verificar el certificado:", error);
      }
    };

    fetchCertificado();
  }, [certificadoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/certificado/${certificadoId}`, {
        tipoDocumento,
        documento,
      });

      if (response.status === 200) {
        alert("Documento actualizado con éxito");
        window.location.reload();
      } else {
        alert(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.status} ${error.response.data.message}`);
      } else if (error.request) {
        alert("Error: No se recibió respuesta del servidor");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      {userInfo && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-4 text-center">
            Actualizar Documento de {userInfo.name} {userInfo.last_name}
          </h2>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Documento:
          </label>
          <select
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Seleccione un tipo de documento</option>
            {tiposDocumentos.map((doc, index) => (
              <option key={index} value={doc}>
                {doc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Documento:
          </label>
          <input
            type="text"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            Actualizar Documento
          </button>
        </div>
      </form>
    </div>
  );
}

AgregarDocumentos.propTypes = {
  certificadoId: PropTypes.string.isRequired,
  idUser: PropTypes.string.isRequired,
};
