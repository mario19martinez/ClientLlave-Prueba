import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UsersGrupo from "../UserGrupo/UsersGrupo";

function GrupoDetail() {
  const [grupo, setGrupo] = useState(null);
  const [error, setError] = useState(null);
  const { id, grupoId } = useParams();

  useEffect(() => {
    const fetchGrupo = async () => {
      try {
        if (!id || !grupoId) {
          setError('ID de nivel o grupo no encontrados');
          return;
        }
        const response = await axios.get(`/niveles/${id}/grupos/${grupoId}`);
        setGrupo(response.data);
      } catch (error) {
        setError(error.response.data.error);
        console.error("Ocurrio un error:", error);
      }
    };
    fetchGrupo();
  }, [id, grupoId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!grupo) {
    return <p>Cargando...</p>;
  }

  if (id === undefined) {
    return <p>Error: ID de nivel no encontrado</p>;
  }

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">Detalle del Grupo</h2>
      <p className="mb-4">
        <strong>Nombre:</strong> {grupo.name}
      </p>
      <p className="mb-4">
        <strong>Descripción:</strong> {grupo.descripcion}
      </p>
      <UsersGrupo nivelId={grupo.nivelId} grupoId={grupoId} />
    </div>
  );
}

export default GrupoDetail;
