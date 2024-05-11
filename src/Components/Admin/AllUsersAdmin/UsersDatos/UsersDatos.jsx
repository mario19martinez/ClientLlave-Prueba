import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UsersDatos() {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/datos");
        setusers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUserDetail = (id) => {
    navigate(`/dato/${id}`)
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al obtener los usuarios: {error}</p>
  }

  return (
    <div className="absolute top-0 w-3/4 p-5 mt-28 right-36 ml-96 translate-x-20">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Datos</h1>
      <div className="overflow-hidden border border-gray-300 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-200 border-b border-gray-300">
          <tr className="text-xs text-gray-700 uppercase">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Apellido</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">WhatsApp</th>
            <th className="py-3 px-6 text-left">Pais</th>
            <th className="py-3 px-6 text-left">Acción</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-mono divide-y divide-gray-200">
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-3 px-6 text-center">
                No hay usuarios para mostrar.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
                <td className="py-3 px-6 text-left">{user.last_name}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.whatsApp}</td>
                <td className="py-3 px-6 text-left">{user.pais}</td>
                <td className="py-3 px-6 text-left">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleUserDetail(user.id)}
                    >
                      Ver Detalles
                    </button>
                  </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default UsersDatos;
