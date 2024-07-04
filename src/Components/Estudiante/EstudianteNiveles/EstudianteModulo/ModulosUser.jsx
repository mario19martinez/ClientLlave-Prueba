import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../../../Redux/features/Users/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ModulosUser() {
  const [modulos, setModulos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const storedEmail = localStorage.getItem('email')

  useEffect(() => {
    if (storedEmail) {
        dispatch(getUserData(storedEmail));
    }
  }, [dispatch, storedEmail]);

  useEffect(() => {
    if (userData?.sub) {
      const fetchModulos = async () => {
        try {
          const response = await axios.get(`/user/${userData.sub}/modulos`);
          setModulos(response.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchModulos();
    }
  }, [userData]);

  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      );
  }

  if (error) {
    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl text-red-600">Error: {error}</div>
        </div>
      );
  }

  return (
    <div className="p-8 mt-6 ml-6 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Modulos del Usuario</h1>
      <ul className="space-y-4 mt-6">
        {modulos.map((modulo) => (
          <Link to={`/modulo/${modulo.id}`} key={modulo.id} className="block p-6 bg-white rounded-lg shadow-lg border-b-4 border-r-4 border-gray-400 hover:border-gray-500">
            <div className="max-w-full">
              <h2 className="text-xl font-semibold mb-2 text-gray-700">{modulo.titulo}</h2>
              <p className="text-gray-700">{modulo.descripcion}</p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default ModulosUser;
