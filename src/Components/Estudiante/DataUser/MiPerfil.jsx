// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from '../../../Redux/features/Users/usersSlice';

function MiPerfil() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  const containerStyle = "mx-auto p-4 md:p-8 lg:p-12"; // Margen y relleno responsivo
  const cardStyle = "bg-white p-4 md:p-8 lg:p-12 rounded-lg shadow-lg"; // Estilo del cuadro
  const titleStyle = "text-3xl md:text-4xl font-semibold mb-6 text-blue-400"; // Tamaño del título

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={containerStyle}>
      <div className={cardStyle}>
        <div className="text-center">
          <div className={titleStyle}>
            Mi Perfil
          </div>
        </div>
        <div className="md:flex md:flex-col">
          <div className="text-xl md:text-2xl mb-4 font-medium text-gray-800">
            <img
              src={userData.image} 
              alt="Imagen de perfil"
              className="block mx-auto rounded-full mt-2 h-20 w-20 md:h-32 md:w-32"
            />
          </div>
          <h1 className="text-xl md:text-2xl mb-4 font-medium text-gray-800">
            Nombre: <strong className="font-normal text-lg">{userData.name}</strong>
          </h1>
          <h1 className="text-xl md:text-2xl mb-4 font-medium text-gray-800">
            Apellidos: <strong className="font-normal text-lg">{userData.last_name}</strong>
          </h1>
          <h1 className="text-xl md:text-2xl mb-4 font-medium text-gray-800">
            ID: <strong className="font-normal text-lg">{userData.sub}</strong>
          </h1>
          <h1 className="text-xl md:text-2xl mb-4 font-medium text-gray-800">
            Correo electrónico:{" "}
            <strong className="font-normal text-lg">{userData.email}</strong>
          </h1>
          <h1 className="text-xl md:text-2xl mb-4 font-medium text-gray-800">
            Número de teléfono:{" "}
            <strong className="font-normal text-lg">{userData.telefono}</strong>
          </h1>
          <h1 className="text-xl md:text-2xl mb-4 font-medium text-gray-800">
            País:{" "}
            <strong className="font-normal text-lg">{userData.pais}</strong>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default MiPerfil;
