import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function UserDatosDetail({ id }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/dato/${id}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los detalles del usuario:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-xl font-semibold text-blue-600">
          Cargando...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 font-semibold">
          Error al obtener los detalles del usuario: {error}
        </p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700 font-semibold">
          No se encontro informacion para este usuario.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 w-4/5 border-2 border-blue-500 rounded translate-y-00 bg-gray-100">
      <h1 className="text-2xl font-bold mb-8 text-gray-600 translate-x-6">
        Informacion de Usuario
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 translate-x-6">
        <div>
          <p className="text-gray-700">Nombre:</p>
          <p className="text-gray-800 font-gabarito ">{userData.name}</p>
        </div>
        <div>
          <p className="text-gray-700">Apellido:</p>
          <p className="text-gray-800 font-gabarito">{userData.last_name}</p>
        </div>
        <div>
          <p className="text-gray-700">Email:</p>
          <p className="text-gray-800 font-gabarito">{userData.email}</p>
        </div>
        <div>
          <p className="text-gray-700">WhatsApp:</p>
          <p className="text-gray-800 font-gabarito">{userData.whatsApp}</p>
        </div>
        <div>
          <p className="text-gray-700">Iglesia:</p>
          <p className="text-gray-800 font-gabarito">{userData.iglesia}</p>
        </div>
        <div>
          <p className="text-gray-700">Pastor:</p>
          <p className="text-gray-800 font-gabarito">{userData.pastor}</p>
        </div>
        <div>
          <p className="text-gray-700">Ministerio:</p>
          <p className="text-gray-800 font-gabarito">
            {userData.ministerio || "No especificado"}
          </p>
        </div>
        <div>
          <p className="text-gray-700">Pastorea:</p>
          <p className="text-gray-800 font-gabarito">{userData.pastorea}</p>
        </div>
        <div>
          <p className="text-gray-700">Autorización del pastor:</p>
          <p className="text-gray-800 font-gabarito">
            {userData.autorizacion_pastor}
          </p>
        </div>
        <div>
          <p className="text-gray-700">Ejerce ministerio:</p>
          <p className="text-gray-800 font-gabarito">
            {userData.ejerce_ministerio}
          </p>
        </div>
        <div>
          <p className="text-gray-700">Miembros:</p>
          <p className="text-gray-800 font-gabarito">{userData.miembros}</p>
        </div>
        <div>
          <p className="text-gray-700">Tipo de documento:</p>
          <p className="text-gray-800 font-gabarito">
            {userData.tipo_documento}
          </p>
        </div>
        <div>
          <p className="text-gray-700">Identificación:</p>
          <p className="text-gray-800 font-gabarito">
            {userData.identificacion}
          </p>
        </div>
        <div>
          <p className="text-gray-700">Fecha de nacimiento:</p>
          <p className="text-gray-800 font-gabarito">
            {userData.fecha_nacimiento}
          </p>
        </div>
        <div>
          <p className="text-gray-700">País:</p>
          <p className="text-gray-800 font-gabarito">{userData.pais}</p>
        </div>
        <div>
          <p className="text-gray-700">Dirección:</p>
          <p className="text-gray-800 font-gabarito">{userData.direccion}</p>
        </div>
        <div>
          <p className="text-gray-700">Registrado el:</p>
          <p className="text-gray-800 font-gabarito">
            {new Date(userData.registeredAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

UserDatosDetail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UserDatosDetail;
