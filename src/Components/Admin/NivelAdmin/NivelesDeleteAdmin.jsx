import { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

function NivelesDeleteAdmin() {
  const [deletedNiveles, setDeletedNiveles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeletedNiveles = async () => {
      try {
        const response = await axios.get("/niveles/delete");
        setDeletedNiveles(response.data);
        setLoading(false);
      } catch (error) {
        console.log("error al traer los Niveles:", error);
        setError("Error al obtener los niveles eliminados.");
        setLoading(false);
      }
    };
    fetchDeletedNiveles();
  }, []);

  const handleDeletePermanent = async (nivelId) => {
    try {
      const confirmar = window.confirm(
        "¿Estás seguro de querer eliminar permanentemente este nivel? Esta acción no se puede deshacer."
      );
      if (confirmar) {
        await axios.delete(`/deletenivel/${nivelId}`);
        const newDeletedNiveles = deletedNiveles.filter(
          (nivel) => nivel.id !== nivelId
        );
        setDeletedNiveles(newDeletedNiveles);
      }
    } catch (error) {
      console.error("Error al eliminar el nivel de forma permanente:", error);
      alert("Error al eliminar el nivel. Por favor, inténtalo de nuevo.");
    }
  };

  const handleRestore = async (nivelId) => {
    try {
      console.log(`/nivel/restore/${nivelId}`);
      await axios.put(`/nivel/restore/${nivelId}`)
      const restoredNivel = deletedNiveles.filter(
        (nivel) => nivel.id !== nivelId
      )
      setDeletedNiveles(restoredNivel);
    } catch (error) {
      console.error('Error al restaurar el nivel:', error);
      alert('Error al restaurar el nivel. Por favor, intentalo de nuevo.');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-xl font-semibold text-gray-900">
          Cargando...
        </span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // if (deletedNiveles.length === 0) {
  //   return (
  //     <div className="text-center mt-20">
  //       <p className="text-xl font-semibold text-gray-700">No hay niveles eliminados.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="absolute top-0 right-36 mt-28 ml-96 p-4 w-1/2 h-auto -translate-x-40">
      <h1 className="text-2xl font-bold mb-8 text-gray-700">
        Niveles Eliminados
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-blue-500">
          <thead>
            <tr className="bg-blue-500">
              <th className="px-6 py-3 text-left text-base font-medium text-white uppercase tracking-wider">
                Nombre del Nivel
              </th>
              <th className="px-6 py-3 text-left text-base font-medium text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {deletedNiveles.map((nivel) => (
              <tr key={nivel.id} className="border-b border-blue-500">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-xl font-medium text-gray-900">
                    {nivel.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  <button
                    onClick={() => handleRestore(nivel.id)}
                    className="w-12 text-green-500 hover:text-white border-2 border-green-500 hover:border-white hover:bg-green-500 font-semibold py-2 px-0 rounded-md mr-2 transition duration-300"
                  >
                    <RestoreFromTrashIcon fontSize="large" />
                  </button>
                  <button
                    onClick={() => handleDeletePermanent(nivel.id)}
                    className="w-12 text-red-500 hover:text-white border-2 border-red-500 hover:border-white hover:bg-red-500 font-semibold py-2 px-0 rounded-md transition duration-300"
                  >
                    <DeleteIcon fontSize="large" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NivelesDeleteAdmin;
