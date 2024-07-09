import { Link } from "react-router-dom";
import { RiArticleLine, RiBookOpenLine, RiLiveLine, RiCheckboxLine } from "react-icons/ri";

export default function EscritorioEditor() {
  return (
    <div className="grid grid-cols-2 gap-4 py-10 px-10">
      <Link to="/Editor/Cursos" className="card-link transform transition-transform hover:scale-105">
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-8 shadow-lg hover:shadow-xl min-h-[250px]">
          <RiBookOpenLine className="text-7xl text-blue-500 mb-4" />
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Cursos</h2>
            <p className="text-lg text-gray-600">
              Gestiona las clases de los cursos.
            </p>
          </div>
        </div>
      </Link>
      <Link to="/Editor/Blogs" className="card-link transform transition-transform hover:scale-105">
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-8 shadow-lg hover:shadow-xl min-h-[250px]">
          <RiArticleLine className="text-7xl text-green-500 mb-4" />
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Blogs</h2>
            <p className="text-lg text-gray-600">
              Escribe y edita los blogs fácilmente.
            </p>
          </div>
        </div>
      </Link>
      <Link to="/Editor/Transmision" className="card-link transform transition-transform hover:scale-105">
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-8 shadow-lg hover:shadow-xl min-h-[250px]">
          <RiLiveLine className="text-7xl text-red-500 mb-4" />
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Transmisión</h2>
            <p className="text-lg text-gray-600">
              Administra las transmisiones en vivo.
            </p>
          </div>
        </div>
      </Link>
      <Link to="/Editor/SelectAsistencia" className="card-link transform transition-transform hover:scale-105">
        <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-8 shadow-lg hover:shadow-xl min-h-[250px]">
          <RiCheckboxLine className="text-7xl text-purple-500 mb-4" />
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Asistencias</h2>
            <p className="text-lg text-gray-600">
              Registra la asistencia de los estudiantes en las clases.
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}