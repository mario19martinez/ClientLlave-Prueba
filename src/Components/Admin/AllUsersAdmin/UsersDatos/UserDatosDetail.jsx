import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserDatosDetail() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

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
    return <p>Error al obtener los detalles del usuario: {error}</p>;
  }

  if (!userData) {
    return <p>No se encontro informacion para este usuario.</p>;
  }

  return (
    <div className="w-full p-5">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">
        Informacion de Usuario
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700">Nombre:</p>
          <p className="font-semibold">{userData.name}</p>
        </div>
        <div>
          <p className="text-gray-700">Apellido:</p>
          <p className="font-semibold">{userData.last_name}</p>
        </div>
        <div>
          <p className="text-gray-700">Email:</p>
          <p className="font-semibold">{userData.email}</p>
        </div>
        <div>
          <p className="text-gray-700">WhatsApp:</p>
          <p className="font-semibold">{userData.whatsApp}</p>
        </div>
        <div>
          <p className="text-gray-700">Iglesia:</p>
          <p className="font-semibold">{userData.iglesia}</p>
        </div>
        <div>
          <p className="text-gray-700">Pastor:</p>
          <p className="font-semibold">{userData.pastor}</p>
        </div>
        <div>
          <p className="text-gray-700">Ministerio:</p>
          <p className="font-semibold">
            {userData.ministerio || "No especificado"}
          </p>
        </div>
        <div>
          <p className="text-gray-700">Pastorea:</p>
          <p className="font-semibold">{userData.pastorea}</p>
        </div>
        <div>
          <p className="text-gray-700">Autorización del pastor:</p>
          <p className="font-semibold">{userData.autorizacion_pastor}</p>
        </div>
        <div>
          <p className="text-gray-700">Ejerce ministerio:</p>
          <p className="font-semibold">{userData.ejerce_ministerio}</p>
        </div>
        <div>
          <p className="text-gray-700">Miembros:</p>
          <p className="font-semibold">{userData.miembros}</p>
        </div>
        <div>
          <p className="text-gray-700">Tipo de documento:</p>
          <p className="font-semibold">{userData.tipo_documento}</p>
        </div>
        <div>
          <p className="text-gray-700">Identificación:</p>
          <p className="font-semibold">{userData.identificacion}</p>
        </div>
        <div>
          <p className="text-gray-700">Fecha de nacimiento:</p>
          <p className="font-semibold">{userData.fecha_nacimiento}</p>
        </div>
        <div>
          <p className="text-gray-700">País:</p>
          <p className="font-semibold">{userData.pais}</p>
        </div>
        <div>
          <p className="text-gray-700">Dirección:</p>
          <p className="font-semibold">{userData.direccion}</p>
        </div>
        <div>
          <p className="text-gray-700">Registrado el:</p>
          <p className="font-semibold">
            {new Date(userData.registeredAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserDatosDetail;
