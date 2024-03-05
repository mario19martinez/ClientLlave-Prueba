import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ModuloAdmin from "../ModuloAdmin/ModuloAdmin";

function NivelDetailAdmin() {
  const [nivel, setNivel] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();
  console.log("id:", id);

  useEffect(() => {
    const fetchNivelDetail = async () => {
      try {
        const response = await axios.get(`/nivel/${id}`);
        setNivel(response.data);
        setLoading(false);
        console.log("response:", response.data);
      } catch (error) {
        console.error("Error al obtener el detail del Nivel:", error);
        setError("Se produjo un error al cargar el detalle de este Nivel.");
        setLoading(false);
      }
    };
    fetchNivelDetail();
  }, [id]);

  const handleDeleteNivel = async () => {
    try {
      const confirmar = window.confirm(
        "¿Estas seguro de querer eliminar este nivel?, no se podra recuperar."
      );
      if (confirmar) {
        await axios.delete(`/nivel/${id}`);
        navigate.push("/niveles");
      }
    } catch (error) {
      console.error("Error al elimianr el nivel:", error);
      alert("Error al eliminar el nivel. Por favor, intentalo de nuevo.");
    }
  };

  return (
    <div className="absolute top-0 right-36 mt-28 ml-96 p-4 w-3/5 h-auto -translate-x-20">
      <div className="max-w-xl mx-auto p-8 bg-white shadow rounded-md ">
        
        {loading && <div className="text-center">Cargando...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {nivel && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {nivel.name}
            </h2>
            <div className="mb-4">
              <img
                src={nivel.image}
                alt="Imagen del nivel"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <p className="text-lg mb-2 text-gray-900">
              <strong>Duración:</strong> {nivel.duracion}
            </p>
            <p className="text-lg mb-2 text-gray-900">
              <strong>Descripción:</strong> {nivel.description}
            </p>
            <p className="text-lg mb-2 text-gray-900">
              <strong>Costo:</strong> ${nivel.costo}
            </p>
            <button
              onClick={handleDeleteNivel}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            >
              <DeleteIcon />
            </button>
            {/* <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              Comprar
            </button> */}
          </div>
        )}
      </div>
      <div>
        <h2>Modulos Del Nivel</h2>
        <ModuloAdmin nivelId={id} />
      </div>
    </div>
  );
}

export default NivelDetailAdmin;
