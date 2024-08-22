import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";

function CursosEliminados() {
  const [cursosEliminados, setCursosEliminados] = useState([]);
  const [noCursosEliminados, setNoCursosEliminados] = useState(false);
  const navigate = useNavigate();

  const handleEliminarCurso = async (id, eliminarTotalmente = true) => {
    const confirmacion = window.confirm(
      `¿Estas seguro de que deseas ${
        eliminarTotalmente
          ? "eliminar este curso, Esta Accion no se puede Deshacer."
          : "restaurar este curso"
      }? `
    );
    if (confirmacion) {
      try {
        const endpoint = eliminarTotalmente
          ? `/curso/${id}`
          : `/cursos/delete/${id}`;
        await axios.delete(endpoint);
        // Despues de eliminar o restaurar el curso, actualiza la lista de cursos eliminados
        const updatedCursos = cursosEliminados.filter(
          (curso) => curso.id !== id
        );
        setCursosEliminados(updatedCursos);
        alert(
          `Curso ${
            eliminarTotalmente ? "eliminado" : "restaurado"
          } exitosamente.`
        );
      } catch (error) {
        console.error("Error al eliminar el curso:", error);
      }
    }
  };

  useEffect(() => {
    // Realizar una solicitud para obtener los cursos eliminados logicamente
    axios
      .get("/cursosD")
      .then((response) => {
        setCursosEliminados(response.data);
        if (response.data.length === 0) {
          setNoCursosEliminados(true);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los cursos eliminados:", error);
      });
  }, []);

  return (
    <div className="absolute translate-x-96 translate-y-10 w-2/3">
      <button
        className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-0 px-4 rounded mb-4 -translate-y-4"
        onClick={() => navigate("/admin/cursos")}
      >
        <KeyboardBackspaceIcon fontSize="large" />
      </button>
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Cursos Eliminados
      </h2>
      {noCursosEliminados ? (
        <p className="text-gray-700">No hay cursos eliminados.</p>
      ) : (
        <ul>
          {cursosEliminados.map((curso) => (
            <li
              key={curso.id}
              className="mb-2 py-2 px-4 rounded border-2 border-gray-400 w-2/3 flex items-center justify-between"
            >
              <span className="font-gabarito text-xl text-gray-700">
                {curso.name}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEliminarCurso(curso.id)}
                  className="bg-red-600 hover:bg-red-900 text-white font-gabarito py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  <DeleteIcon />
                  Eliminar
                </button>
                <button
                  onClick={() => handleEliminarCurso(curso.id, false)}
                  className="bg-green-600 hover:bg-green-900 text-white font-gabarito py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  <RestoreIcon /> Restaurar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CursosEliminados;
