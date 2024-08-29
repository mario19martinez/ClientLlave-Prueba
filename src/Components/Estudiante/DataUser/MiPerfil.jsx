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
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-lg  w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
      <div className="relative">
        <div className="flex justify-center items-center">
          <img
            src={userData.image || "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"}
            alt="Imagen de perfil"
            className="rounded-full h-24 w-24 sm:h-32 sm:-w-32 md:h-48 md:w-48 border-4 border-white shadow-lg"
          />
        </div>
        <div className="text-center mt-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">{userData.name} {userData.last_name}</h1>
          <p className="text-gray-500">{userData.email}</p>
        </div>
      

      <div className="mt-8 flex flex-col gap-6">
          <h2 className="text-lg font-medium text-gray-700 items-center justify-center flex">Información Personal</h2>
          <div className="mt-4 space-y-4 sm:space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Nombre:</span>
              <span className="text-gray-700 font-semibold">{userData.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Apellidos:</span>
              <span className="text-gray-700 font-semibold">{userData.last_name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Email:</span>
              <span className="text-gray-700 font-semibold">{userData.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Número de Teléfono:</span>
              <span className="text-gray-700 font-semibold">{userData.telefono}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">País:</span>
              <span className="text-gray-700 font-semibold">{userData.pais}</span>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default MiPerfil;