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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Historial de Usuarios</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">User Sub</th>
            <th className="py-2 px-4 border-b">Curso Id</th>
            <th className="py-2 px-4 border-b">Grupo Id</th>
            <th className="py-2 px-4 border-b">Certificado Id</th>
            <th className="py-2 px-4 border-b">Action Type</th>
            <th className="py-2 px-4 border-b">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.userSub}</td>
              <td className="py-2 px-4 border-b">{item.cursoId}</td>
              <td className="py-2 px-4 border-b">{item.grupoId}</td>
              <td className="py-2 px-4 border-b">{item.certificadoId}</td>
              <td className="py-2 px-4 border-b">{item.actionType}</td>
              <td className="py-2 px-4 border-b">
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
