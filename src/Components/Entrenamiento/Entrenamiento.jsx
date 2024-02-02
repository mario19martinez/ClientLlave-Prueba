import { useState, useEffect } from "react";
import Card from "../Card/Card";
import axios from "axios";

function Entrenamiento() {
  const [cursos, setCursos] = useState([]);
  const [currentPage] = useState(1);
  const cursosPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/cursos?page=${currentPage}&perPage=${cursosPerPage}`
        );
        setCursos(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage]);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cursos.length > 0 ? (
          cursos.map((curso) => (
            <Card
              key={curso.id}
              name={curso.name}
              image={curso.image}
              id={curso.id}
              duracion={curso.duracion}
              nivel={curso.nivel}
              costo={curso.costo}
              fechaInicio={curso.fechaInicio}
              fechaFinalizacion={curso.fechaFinalizacion}
            />
          ))
        ) : (
          <div className="text-center mt-8">
            <h1 className="text-xl font-semibold">Cargando ...</h1>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Entrenamiento;