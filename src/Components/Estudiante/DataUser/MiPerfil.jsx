import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../Redux/features/Users/usersSlice";
import CircularProgress from '@mui/material/CircularProgress';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function MiPerfil() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem("email");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (storedEmail) {
        setLoading(true);
        try {
          await dispatch(getUserData(storedEmail)).unwrap();
        } catch (err) {
          setError(err.message || 'Error al cargar los datos');
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchData();
  }, [dispatch, storedEmail]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-600 mt-4 font-semibold">Cargando Perfil...</p>
          <CircularProgress />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500 mt-4 font-semibold">Error: {error}</p>
          <p className="text-red-500 mt-4 font-semibold">Oops! Algo salió mal. Vuelve a intentarlo en un momento.</p>
          <p className="text-red-500 mt-4 font-semibold">
          <SentimentVeryDissatisfiedIcon fontSize="large" />
          </p>
        </div>
      </div>
    );
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