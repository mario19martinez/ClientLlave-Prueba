import { Link } from "react-router-dom";
import { RiArticleLine, RiBookOpenLine, RiLiveLine, RiCheckboxLine } from "react-icons/ri";

export default function EscritorioEditor() {
  return (
    <div className="flex flex-col items-center gap-8 py-5 px-56">
      <Link to="/Editor/Cursos" className="card-link">
        <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8 shadow-md w-96">
          <RiBookOpenLine className="text-6xl text-blue-500 mr-8" />
          <div>
            <h2 className="text-2xl font-semibold">Cursos</h2>
            <p className="text-base text-gray-600">
              Gestiona las clases de los cursos.
            </p>
          </div>
        </div>
      </Link>
      <Link to="/Editor/Blogs" className="card-link">
        <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8 shadow-md w-96">
          <RiArticleLine className="text-6xl text-green-500 mr-8" />
          <div>
            <h2 className="text-2xl font-semibold">Blogs</h2>
            <p className="text-base text-gray-600">
              Escribe y edita los blogs fácilmente.
            </p>
          </div>
        </div>
      </Link>
      <Link to="/Editor/Transmision" className="card-link">
        <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8 shadow-md w-96">
          <RiLiveLine className="text-6xl text-red-500 mr-8" />
          <div>
            <h2 className="text-2xl font-semibold">Transmisión</h2>
            <p className="text-base text-gray-600">
              Administra las transmisiones en vivo.
            </p>
          </div>
        </div>
      </Link>
      <Link to="/Editor/Asistencia" className="card-link">
        <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8 shadow-md w-96">
          <RiCheckboxLine className="text-6xl text-purple-500 mr-8" />
          <div>
            <h2 className="text-2xl font-semibold">Asistencias a Clases</h2>
            <p className="text-base text-gray-600">
              Registra la asistencia de los estudiantes en las clases.
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}