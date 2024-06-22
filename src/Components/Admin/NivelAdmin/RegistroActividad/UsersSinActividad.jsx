import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function UsersSinActividad() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersSinActividad = async () => {
      try {
        const response = await axios.get("/usuarios-sin-actividad");
        setUsuarios(response.data.usuariosNoVistos);
        console.log("response:", response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        console.log("Hubo un error al cargar la informacion:", error);
        setLoading(false);
      }
    };
    fetchUsersSinActividad();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-solid rounded-full spinner"></div>
          <div className="text-xl font-semibold mt-4">Cargando...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600 text-xl font-semibold">Error: {error}</div>
      </div>
    );
  }

  if (usuarios.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4 text-gray-800">
          Usuarios Sin Actividad
        </h1>
        <p className="text-gray-700">No hay usuarios sin actividad.</p>
      </div>
    );
  }

  return (
    <div className="translate-x-40 translate-y-10">
        <button
          onClick={goBack}
          className="flex items-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300 mb-4"
        >
          <KeyboardBackspaceIcon fontSize="large" className="mr-2" />
          Volver
        </button>
      <h1 className="text-xl font-bold mb-4 text-gray-800 translate-x-2">
        Usuarios Sin Actividad
      </h1>
      <table className="min-w-full bg-white rounded-lg border-separate border-spacing-2">
        <thead className="bg-blue-200 border-b border-gray-300">
          <tr className="bg-blue-100 text-gray-700 uppercase text-xs leading-normal">
            <th className="py-3 px-6 text-left">Nombre</th>
            <th className="py-3 px-6 text-left">Apellido</th>
            <th className="py-3 px-6 text-left">Grupos</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-mono divide-y divide-gray-200">
          {usuarios.map((usuario) => (
            <tr
              key={usuario.sub}
              className="border-b border-gray-200 hover:bg-gray-100 bg-slate-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {usuario.name}
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {usuario.last_name}
              </td>
              <td className="py-3 px-6 text-left">
                <ul className="list-disc pl-4">
                  {usuario.grupos.map((grupo) => (
                    <li key={grupo.grupoId}>{grupo.grupoName}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersSinActividad;
