import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../Redux/features/Users/usersSlice";

function MiPerfil() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    if (storedEmail) {
      dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  if (!userData) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="text-center py-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-blue-400">Mi Perfil</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 py-6 px-4 md:px-8">
          <div className="flex justify-center items-center">
            <img
              src={userData.image}
              alt="Imagen de perfil"
              className="rounded-full h-32 w-32 md:h-48 md:w-48"
            />
          </div>
          <div>
            <div className="mb-4">
              <h1 className="text-xl md:text-2xl font-medium text-gray-800">Nombre:</h1>
              <p className="text-lg md:text-xl text-gray-600">{userData.name}</p>
            </div>
            <div className="mb-4">
              <h1 className="text-xl md:text-2xl font-medium text-gray-800">Apellidos:</h1>
              <p className="text-lg md:text-xl text-gray-600">{userData.last_name}</p>
            </div>
            <div className="mb-4">
              <h1 className="text-xl md:text-2xl font-medium text-gray-800">Correo electrónico:</h1>
              <p className="text-lg md:text-xl text-gray-600">{userData.email}</p>
            </div>
            <div className="mb-4">
              <h1 className="text-xl md:text-2xl font-medium text-gray-800">Número de teléfono:</h1>
              <p className="text-lg md:text-xl text-gray-600">{userData.telefono}</p>
            </div>
            <div className="mb-4">
              <h1 className="text-xl md:text-2xl font-medium text-gray-800">País:</h1>
              <p className="text-lg md:text-xl text-gray-600">{userData.pais}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiPerfil;