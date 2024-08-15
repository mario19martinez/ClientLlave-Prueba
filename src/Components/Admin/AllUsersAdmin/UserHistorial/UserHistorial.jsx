import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

function UserHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("/user-history");
        setHistory(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading)
    return (
      <div>
        <p>Loading...</p>
        <CircularProgress />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="absolute top-0 right-36 mt-28 w-4/5 ml-96 p-4 translate-x-24">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Historial de Usuarios</h1>
      <table className="min-w-full bg-white  rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">User Sub</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Curso Id</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Grupo Id</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Certificado Id</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Timestamp</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {history.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.userSub}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.cursoId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.grupoId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.certificadoId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.actionType}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                {new Date(item.timestamp).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserHistory;
