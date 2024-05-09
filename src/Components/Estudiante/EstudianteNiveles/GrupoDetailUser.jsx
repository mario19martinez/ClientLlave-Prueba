import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function GrupoDetailUser() {
  const [grupo, setGrupo] = useState(null);
  const [modulos, setModulos] = useState([]);

  const { grupoId } = useParams();

  useEffect(() => {
    const fetchGrupoDetail = async () => {
      try {
        const response = await axios.get(`/grupo/${grupoId}/detalles`);
        setGrupo(response.data.grupo);
        setModulos(response.data.modulos);
      } catch (error) {
        console.error(
          "Error al obtnener los detalles del grupo y los modulos:",
          error
        );
      }
    };

    fetchGrupoDetail();
  }, [grupoId]);

  if (!grupo) {
    return <div className="text-center mt-4">Cargando...</div>;
  }

  return (
    <div className="absolute translate-x-56 translate-y-10 mx-auto p-4 w-3/4">
      <h2 className="text-2xl text-gray-800 font-bold mb-2">{grupo.name}</h2>
      <p className="text-gray-700 mb-4">{grupo.descripcion}</p>
      <h3 className="text-xl text-gray-800 font-semibold mb-2">Modulos:</h3>
      <ul>
        {modulos.map((modulo) => (
          <Link to={`/grupo/${grupoId}/modulo/${modulo.id}/detalles`} key={modulo.id}>
          <li className="mb-4 bg-gray-100 border-b-4 border-blue-500 rounded-xl h-auto p-2 w-11/12 hover:bg-gray-200 transition-transform ease-in-out duration-300 hover:translate-y-2">
            <h4 className=" pl-2 text-lg text-gray-800 font-semibold p-0">{modulo.titulo}</h4>
            <p className="text-gray-700 pl-2">{modulo.descripcion.length > 100 ? `${modulo.descripcion.substring(0, 100)}...` : modulo.descripcion}</p>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default GrupoDetailUser;
